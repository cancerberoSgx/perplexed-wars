import { IUnitTypeBehavior, IBehavior, IPlayerBehavior, IStateModifierAfterAddUnit, IStateModifierBeforeAddUnitSuccess, BuildConditionResultMissing, IGameBehavior, IStateModifierBehavior, IStateModifier, BuildConditionResult } from '../../state/behavior-interfaces'
import { war2ImplementationInitialState, War2PlayerCustom, RESOURCE_ID,createMainBases, createBoxes } from './war2State'
import { Events, afterAddUnit, AfterUnitSelectionEvent, AfterAddUnitEvent, BeforeAddUnitSuccessEvent, BeforeGameStartsEvent, AfterUnitDieEvent } from '../../state/IGameFramework'
import { IState, IPlayer, IUnitBox, IBox } from '../../state/state-interfaces'
import { SimpleIa1 } from '../../ia/simpleIa1'
import { Game } from '../../state/game'
import { IA } from '../../ia/ia-interfaces'
import { StateAccessHelper } from '../../state/access/StateAccessHelper'
import { isDevelopment } from '../../util/util'
import { lumbermillLUmberPlus, mineGoldPlus } from './war2Units'
import { State } from '../../state/state'
import { Behavior } from '../../state/behavior'

/** build all the behavior (state modifiers) if war2 impl */
export function war2ImplementationBehavior(): IBehavior {
  return {
    unitTypes: getUnitBehaviors(),
    players: getPlayerBehaviors(),
    gameBehaviors: getGameBehaviors(),
    boardBehavior: getBoardBehavior(),
  }
}


function getBoardBehavior() {
  return {
    createMainBases,
    createBoxes,
  }
}




function initialGamePrompt(state:IState) {
  if (isDevelopment) {
    return 
  }
  const human = state.players.find(p => !p.isAI)
  human.name = prompt('Name for your player?')
  const answer = confirm('Want to play with humans ?')
  if (!answer) {
    const ia = State.getHelper().iaPlayer(state)
    const iaOriginalUnits = ia.unitTypes
    ia.unitTypes = human.unitTypes
    human.unitTypes = iaOriginalUnits
  }
}
let gameBehaviors:IGameBehavior[]
function getGameBehaviors(): IGameBehavior[] {
  if (gameBehaviors) {
    return gameBehaviors
  }
  const initialState = war2ImplementationInitialState()
  gameBehaviors = []
  gameBehaviors.push({
    stateModifiers: [
      { 
        eventName: Events.EVENT_BEFORE_GAME_STARTS, modifier: (e:BeforeGameStartsEvent) => {
          initialGamePrompt(e.state)        
          e.ready()
        } },
    ],
    id: initialState.game.id,
  })
  return gameBehaviors
}




let playerBehaviors 
function getPlayerBehaviors() {
  if (playerBehaviors) {
    return playerBehaviors
  }

  playerBehaviors = war2ImplementationInitialState().players.map<IPlayerBehavior>(p => ({
    id: p.id,
    stateModifiers: [],
    ia: p.isAI ? new SimpleIa1() : undefined,
  }))

  playerBehaviors.forEach(playerBehavior => {
    
    const checkEnoughMoney: IStateModifierBeforeAddUnitSuccess = {
      eventName: Events.EVENT_BEFORE_ADD_UNIT_SUCCESS,
      modifier: (event: BeforeAddUnitSuccessEvent) => {
        if (event.player.playerId !== playerBehavior.id) {
          return
        }
        if (event.box.units.length > 0) { // se don't allow two units in the same place. units cannot enter buildings in war2 (in war2 yes)
          event.cancelCallback('There is already a unit there') 
        }
        const unitType = State.getHelper().unitType(event.state, event.action.unitId)
        const player = State.getHelper().player(event.state, playerBehavior.id)
        const unitBehavior = State.getHelper().unitBehavior(Behavior.get(), unitType.id)
        const canBuild = unitBehavior.buildCondition(player)
        if (!canBuild.canBuild) {
          event.cancelCallback(canBuild.whyNot)
        }
      },
    }
    const librateFoodWhenUniDieModifier:IStateModifier = {
      eventName: Events.EVENT_AFTER_UNIT_DIE,
      modifier: (event: AfterUnitDieEvent) => {
        if (event.attacked.playerId !== playerBehavior.id) {
          return
        }
        const unitType = event.attacked.type
        const cost = unitType.custom && (unitType.custom as War2PlayerCustom).cost
        const resource = State.getHelper().playerResource(event.state, event.attacked.playerId, RESOURCE_ID.food)
        resource.value += ((cost || []).find(c => c.resourceId === RESOURCE_ID.food) || {}as any).value || 0

      },
    }

    const chargeNewUnitModifier: IStateModifierAfterAddUnit = {
      eventName: Events.EVENT_AFTER_ADD_UNIT,
      modifier: (event: AfterAddUnitEvent) => {
        if (event.player.playerId !== playerBehavior.id) {
          return
        }
        const resourceCost = event.newUnit.type.custom && (event.newUnit.type.custom as War2PlayerCustom).cost
        if (!resourceCost) { return }
        resourceCost.forEach(cost => {
          const playerResource = State.getHelper().playerResource(event.state, event.player.playerId, cost.resourceId)
          if (playerResource && playerResource.value) {
            playerResource.value -= cost.value
          }
        })
      },
    }

    const mineAndLumberMillResourceAdjust: IStateModifierAfterAddUnit = {
      eventName: Events.EVENT_AFTER_ADD_UNIT,
      modifier: (event: AfterAddUnitEvent) => {
        if (event.player.playerId !== playerBehavior.id) {
          return
        }
        if (['humanLumbermill', 'orcLumbermill', 'humanGoldMine', 'orcGoldMine'].indexOf(event.newUnit.type.id) === -1) {
          return
        }
        const resourceMap = {
          humanLumbermill: { resourceId: RESOURCE_ID.lumber, plus: lumbermillLUmberPlus },
          orcLumbermill: { resourceId: RESOURCE_ID.lumber,plus: lumbermillLUmberPlus },
          humanGoldMine: { resourceId: RESOURCE_ID.gold, plus: mineGoldPlus },
          orcGoldMine: { resourceId: RESOURCE_ID.gold, plus: mineGoldPlus },
        }
        const resource:{ resourceId: string, plus: number } = resourceMap[event.newUnit.type.id]
        State.getHelper().playerResource(event.state, event.player.playerId, resource.resourceId).defaultValuePerTurn += resource.plus
      },
    }

    playerBehavior.stateModifiers.push(checkEnoughMoney, librateFoodWhenUniDieModifier, chargeNewUnitModifier, mineAndLumberMillResourceAdjust)
  })
  return playerBehaviors
}





let unitBehaviors: IUnitTypeBehavior[]

function getUnitBehaviors() {
  if (unitBehaviors) {
    return unitBehaviors
  }
  unitBehaviors = []

  war2ImplementationInitialState().unitsTypes.forEach(unitBehavior => {

    const utb: IUnitTypeBehavior = {
      id: unitBehavior.id,

      unitShouldMoveThisTurn: (unitBox: IUnitBox) => true,

      unitShouldAttackThisTurn: (unitBox: IUnitBox) => true,
      
      unitManualMove: () => false, // all units move automatically 

      unitCanBeCreatedHere: (playerId: string, box: IBox) => {
        return box.units.length === 0 && 
          !State.getHelper().unitType(State.get(), unitBehavior.id).isNotAddableToBoard && 
          !!State.getHelper().getAvailablePlacesFor(State.get(), playerId).find(p => p.x === box.x && p.y === box.y)
      },

      unitCanMoveHere: (unitBox: IUnitBox) => {
        return unitBox.box.units.length === 0
      },

      buildCondition: (player: IPlayer) => {
        if (unitBehavior.isBase) {
          return { canBuild: false, whyNot: `Only one base allowed in this game` }
        }  
        // do I have sufficient resources ?
        const unitType = State.getHelper().unitType(State.get(), unitBehavior.id)
        const resourceCost = unitType.custom && (unitType.custom as War2PlayerCustom).cost 
        const resourceMissing:BuildConditionResultMissing[] = []
        const notEnough = resourceCost.find((cost) => {
          const playerResource = State.getHelper().playerResource(State.get(), player.id, cost.resourceId)
          if (playerResource && playerResource.value < cost.value) {
            resourceMissing.push({ 
              resourceId: playerResource.id, 
              missing: cost.value - playerResource.value, 
            })
            return true
          }
          return false
        })
        return {
          canBuild: !notEnough, 
          whyNot: 'Not enough resources. ' + (resourceMissing.length ? ('Missing: ' + resourceMissing.map(rm => rm.missing + ' of ' + rm.resourceId)) : ''),  
        } 
      },

      stateModifiers: [
        {
          name: 'humanBlacksmithDamageUpgrade1Modifier',
          description: 'when unit humanBlacksmithDamageUpgrade1 is added, player\'s units in the board and player\'s unitTypes damage is increased by 2',
          eventName: Events.EVENT_AFTER_ADD_UNIT,
          modifier: (event: AfterAddUnitEvent) => {
            if (unitBehavior.id === event.newUnit.type.id && event.newUnit.type.id === 'humanBlacksmithDamageUpgrade1') {
              const playerWithThatUnitType = event.state.players.find(p => !!p.unitTypes.find(put => put === event.newUnit.type.id))
              const playerUnitTypes = playerWithThatUnitType.unitTypes.map(put => event.state.unitsTypes.find(ut => put === ut.id))
              playerUnitTypes.forEach(ut => {
                if (ut.properties.damage > 0) {
                  ut.properties.damage = ut.properties.damage +  2
                }
              })
            }
          },
        },
      ],
    }

    unitBehaviors.push(utb)
  })

  return unitBehaviors
}

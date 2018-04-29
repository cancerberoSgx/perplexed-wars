import { IUnitTypeBehavior, IBehavior, IPlayerBehavior, IStateModifierAfterAddUnit, IStateModifierBeforeAddUnitSuccess, BuildConditionResultMissing, IGameBehavior, IStateModifierBehavior, IStateModifier, BuildConditionResult } from '../../state/behavior-interfaces'
import { war2ImplementationInitialState, War2PlayerCustom, RESOURCE_ID, mineGoldPlus, lumbermillLUmberPlus, createMainBases, createBoxes } from './war2State'
import { Events, afterAddUnit, AfterUnitSelectionEvent, AfterAddUnitEvent, BeforeAddUnitSuccessEvent, BeforeGameStartsEvent, AfterUnitDieEvent } from '../../state/IGameFramework'
import { IState, IPlayer, IUnitBox } from '../../state/state-interfaces'
import { SimpleIa1 } from '../../ia/simpleIa1'
import { Game } from '../../state/game'
import { IA } from '../../ia/ia-interfaces'
import { StateAccessHelper } from '../../state/StateAccessHelper'
import { isDevelopment } from '../../util/util'

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
    const ia = state.players.find(p => p.isAI)
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
  // heads up! this variable is the initial state and obsolete - we only read unit types ids that we know doesn't change
  const initialState = war2ImplementationInitialState()
  playerBehaviors = initialState.players.map<IPlayerBehavior>(p => ({
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
        const unitType = event.state.unitsTypes.find(ut => ut.id === event.action.unitId)
        const player = event.state.players.find(p => p.id === playerBehavior.id)
        const unitBehavior =  getUnitBehaviors().find(ub => ub.id === unitType.id)
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
        const resource = event.state.players.find(p => p.id === event.attacked.playerId).resources.find(r => r.id === RESOURCE_ID.food)
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
        const player = event.state.players.find(p => p.id === event.player.playerId)
        resourceCost.forEach(cost => {
          const playerResource = player.resources.find(r => r.id === cost.resourceId)
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
        if (['humanLumbermill', 'orcLumbermill', 'goldMine'].indexOf(event.newUnit.type.id) === -1) {// TODO: lumbermill
          return
        }
        const resourceMap = {
          humanLumbermill: { resourceId: RESOURCE_ID.lumber, plus: lumbermillLUmberPlus },
          orcLumbermill: { resourceId: RESOURCE_ID.lumber,plus: lumbermillLUmberPlus },
          goldMine: { resourceId: RESOURCE_ID.gold, plus: mineGoldPlus },
        }
        const player = event.state.players.find(p => p.id === event.player.playerId)
        const resource:{ resourceId: string, plus: number } = resourceMap[event.newUnit.type.id]
        player.resources.find(r => r.id === resource.resourceId).defaultValuePerTurn += resource.plus
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
  // heads up! this variable is the initial state and obsolete - we only read unit types ids that we know doesn't change
  const state = war2ImplementationInitialState()

  unitBehaviors = []

  state.unitsTypes.forEach(unitBehavior => {

    const utb: IUnitTypeBehavior = {
      id: unitBehavior.id,
      unitShouldMoveThisTurn: (unitBox: IUnitBox) => true,
      unitShouldAttackThisTurn: (unitBox: IUnitBox) => true,
      unitCanMoveHere: (unitBox: IUnitBox) => {
        return unitBox.box.units.length === 0
      },
      buildCondition: (player: IPlayer) => {
        if (unitBehavior.isBase) {
          return { canBuild: false, whyNot: `Only one base allowed in this game` }
        }  
        // do I have sufficient resources ?
        const unitType = StateAccessHelper.get().unitType(unitBehavior.id)
        const resourceCost = unitType.custom && (unitType.custom as War2PlayerCustom).cost 
        const resourceMissing:BuildConditionResultMissing[] = []
        const notEnough = resourceCost.find((cost) => {
          const playerResource = player.resources.find(r => r.id === cost.resourceId)
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
        
      ],
    }

    unitBehaviors.push(utb)
  })

  return unitBehaviors
}

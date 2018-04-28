import { IState } from '../../state/state-interfaces'
import {  createBoxes, clone, isDevelopment } from '../../util/util'
import * as HumanTownHall from './assets/HumanTownhall.gif'
import * as goldIcon from './assets/gold.gif'
import * as foodIcon from './assets/food.png'
import * as lumberIcon from './assets/lumber.gif'
import * as humanFarm from './assets/HumanFarm.gif'
import * as orcFarm from './assets/OrcFarm.gif'
import * as humanTower1 from './assets/HumanTower1.gif'
import * as orcTower1 from './assets/OrcTower1.gif'
import * as goldMine from './assets/goldMine.gif'
import * as orcGreatHall from './assets/orcGreatHall.gif'
import * as humanBlacksmith from './assets/HumanBlacksmith.gif'
import * as orcBlacksmith from './assets/OrcBlacksmith.gif'
import * as humanLumbermill from './assets/HumanLumbermill.gif'
import * as orcLumbermill from './assets/orcLumbermill.gif'
import * as footman from './assets/footman.gif'
import * as footmanIcon from './assets/footmanIcon.gif'

import * as humanBlacksmithDamageUpgrade1 from './assets/humanBlacksmithDamageUpgrade1.png'




const n = 15
const m = 10
const goldDefaultValuePerTurn = 50
const foodDefaultValue = 4

export const mineGoldPlus = 20
export const lumbermillLUmberPlus = 1

export enum RESOURCE_ID { lumber = 'lumber', gold = 'gold', food = 'food' }
export interface War2UnitCost {
  resourceId: RESOURCE_ID,
  value: number
}
export interface War2PlayerCustom {
  cost: War2UnitCost[]
}

export function war2ImplementationInitialState(): IState {

  // resources are the same for both "races"
  const resources = [{
    id: RESOURCE_ID.gold,
    name: RESOURCE_ID.gold,
    defaultValuePerTurn: goldDefaultValuePerTurn,
    value: 1200,
    thisTurnValue: 0,
    icon: goldIcon,
  }, {
    id: RESOURCE_ID.lumber,
    name: RESOURCE_ID.lumber,
    defaultValuePerTurn: 2,
    value: 300,
    thisTurnValue: 0,
    icon: lumberIcon,
  },{
    id: RESOURCE_ID.food,
    name: RESOURCE_ID.food,
    defaultValuePerTurn: 0,
    value: 4,
    thisTurnValue: 0,
    icon: foodIcon,
  }]

  const state: IState = {
    game: {
      interval: 500,
      allowDiagonal: true,
      time: 0,
      realTime: !isDevelopment,
      winner: '',
      gameFinish: false,
      paused: false,
      showAIUnitsPanel: false,
      showAIResourcesPanel: true,
    },
    timestamp: Date.now(),

    // unit values were taking almost exactly as in https://wow.gamepedia.com/Warcraft_II_units#Footman_.2F_Grunt
    unitsTypes: [
      {
        name: 'Gold Mine',
        image: goldMine,
        icon: goldMine,
        id: 'goldMine',
        description: `Gives +${mineGoldPlus} gold per turn`,
        properties: {
          damage: 0,
          speed: 0,
          health: 400 * 1.2,
          range: 0,
          territoryRadius: 0,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 500 },
            { resourceId: RESOURCE_ID.food, value: 0 },
            { resourceId: RESOURCE_ID.lumber, value: 250 },
          ],
        },
      },
      {
        name: 'Town Hall',
        image: HumanTownHall,
        icon: HumanTownHall,
        id: 'human-base',
        description: `If killed you loose the game.`,
        isBase: true,
        properties: {
          damage: 0,
          speed: 0,
          health: 1200 * 1.2,
          range: 0,
          territoryRadius: 2,
        },
      },
      {
        name: 'Farm',
        image: humanFarm,
        icon: humanFarm,
        id: 'humanFarm',
        description: `Feeds ${foodDefaultValue} units `,
        properties: {
          damage: 0,
          speed: 0,
          health: 400 * 1.2,
          range: 0,
          territoryRadius: 1,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 500 },
            { resourceId: RESOURCE_ID.food, value: -4 },
            { resourceId: RESOURCE_ID.lumber, value: 250 },
          ],
        },
      },
      {
        name: 'Scout Tower',
        image: humanTower1,
        icon: humanTower1,
        id: 'humanTower1',
        description: 'Good defense structure. Upgrade in Sawmill',
        properties: {
          damage: 10,
          speed: 0,
          health: 100 * 1.2,
          range: 3,
          territoryRadius: 1,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 800 },
            { resourceId: RESOURCE_ID.food, value: 0 },
            { resourceId: RESOURCE_ID.lumber, value: 450 },
          ],
        },
      },
      {// TODO: icons upgrades from here: https://wow.gamepedia.com/Footman_(Warcraft_III)#Upgrades
        name: 'Blacksmith',
        image: humanBlacksmith,
        icon: humanBlacksmith,
        id: 'humanBlacksmith',
        description: `Infantry upgrades. `,
        properties: {
          damage: 0,
          speed: 0,
          health: 775 * 1.2,
          range: 0,
          territoryRadius: 1,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 800 },
            { resourceId: RESOURCE_ID.food, value: 0 },
            { resourceId: RESOURCE_ID.lumber, value: 450 },
          ],
        },
      },
      {// TODO: icons upgrades from here: https://wow.gamepedia.com/Footman_(Warcraft_III)#Upgrades
        name: 'Lumbermill',
        image: humanLumbermill,
        icon: humanLumbermill,
        id: 'humanLumbermill',
        description: `+${lumbermillLUmberPlus} lumber per turn. Structure upgrades`,
        properties: {
          damage: 0,
          speed: 0,
          health: 400 * 1.2,
          range: 0,
          territoryRadius: 0,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 500 },
            { resourceId: RESOURCE_ID.food, value: 0 },
            { resourceId: RESOURCE_ID.lumber, value: 250 },
          ],
        },
      },

      

      {
        name: 'Upgrade Unit Damage Level 1',
        image: humanBlacksmithDamageUpgrade1,
        icon: humanBlacksmithDamageUpgrade1,
        id: 'humanBlacksmithDamageUpgrade1',
        description: `+2 damage to all units`,
        childOf: ['humanBlacksmith'],
        properties: {
          damage: 0,
          speed: 0,
          health: 0, // meaning cannot be built in the board physically
          range: 0,
          territoryRadius: 0,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 800 },
            { resourceId: RESOURCE_ID.food, value: 0 },
            { resourceId: RESOURCE_ID.lumber, value: 0 },
          ],
        },
      },
      {
        name: 'Great Hall',
        image: orcGreatHall,
        icon: orcGreatHall,
        id: 'orc-base',
        isBase: true,
        description: `If killed you loose the game. `,
        properties: {
          damage: 0,
          speed: 0,
          health: 1200 * 1.2,
          range: 0,
          territoryRadius: 2,
        },
      },
      {
        name: 'Pig Farm',
        image: orcFarm,
        icon: orcFarm,
        id: 'orcFarm',
        description: `Feeds ${foodDefaultValue} units.`,
        properties: {
          damage: 0,
          speed: 0,
          health: 400 * 1.2,
          range: 0,
          territoryRadius: 0,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 500 },
            { resourceId: RESOURCE_ID.food, value: -4 },
            { resourceId: RESOURCE_ID.lumber, value: 250 },
          ],
        },
      },
      {// TODO: icons upgrades from here: https://wow.gamepedia.com/Footman_(Warcraft_III)#Upgrades
        name: 'Lumbermill',
        image: orcLumbermill,
        icon: orcLumbermill,
        id: 'orcLumbermill',
        description: `+${lumbermillLUmberPlus} lumber per turn. Upgrades for structures`,
        properties: {
          damage: 0,
          speed: 0,
          health: 400 * 1.2,
          range: 0,
          territoryRadius: 0,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 500 },
            { resourceId: RESOURCE_ID.food, value: 0 },
            { resourceId: RESOURCE_ID.lumber, value: 250 },
          ],
        },
      },
      {
        name: 'Blacksmith',
        image: orcBlacksmith,
        icon: orcBlacksmith,
        id: 'orcBlacksmith',
        description: `Infantry upgrades.`,
        properties: {
          damage: 0,
          speed: 0,
          health: 775 * 1.2,
          range: 0,
          territoryRadius: 1,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 500 },
            { resourceId: RESOURCE_ID.food, value: 0 },
            { resourceId: RESOURCE_ID.lumber, value: 250 },
          ],
        },
      },
      {
        name: 'Watch Tower',
        image: orcTower1,
        icon: orcTower1,
        id: 'orcTower1',
        description:`Good defense structure. Upgrade in Sawmill `,
        properties: {
          damage: 10,
          speed: 0,
          health: 100 * 1.2,
          range: 3,
          territoryRadius: 1,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 550 },
            { resourceId: RESOURCE_ID.food, value: 0 },
            { resourceId: RESOURCE_ID.lumber, value: 200 },
          ],
        },
      },

      {
        name: 'Footman',
        image: footman,
        icon: footmanIcon,
        id: 'footman',
        description: `Initial line of defense - hand-to-hand combat. `,
        properties: {
          damage: 9,
          speed: 1,
          health: 60,
          range: 1,
          territoryRadius: 0,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 600 },
            { resourceId: RESOURCE_ID.food, value: 1 },
          ],
        },
      },
      {
        name: 'Elven Archer',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/4/4d/ElfArcher.gif',
        icon: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/4/4f/Aface.gif?version=237897e7775651612b874e7d7ec5f7d8',
        id: 'elven-archer',
        isBase: false,
        description: `Initial ranged unit`, 
        properties: {
          damage: 9,
          speed: 1,
          health: 50,
          range: 3,
          territoryRadius: 0,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 500, food: 1 },
            { resourceId: RESOURCE_ID.lumber, value: 50 },
            { resourceId: RESOURCE_ID.food, value: 1 },
          ],
        },
      },
      {
        name: 'Grunt',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/c/cc/OrcGrunt.gif',
        icon: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/e/e0/Grunt.gif',
        id: 'grunt',
        isBase: false,
        description:`Initial line of defense - hand-to-hand combat. `,
        properties: {
          damage: 9,
          speed: 1,
          health: 60,
          range: 1,
          territoryRadius: 0,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 600 },
            { resourceId: RESOURCE_ID.food, value: 1 },
          ],
        },
      },
      {
        name: 'Troll Axethrower',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/7/75/TrollAxethwr.gif',
        icon: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/3/31/Axe.gif',
        id: 'troll',
        isBase: false,
        description: `Initial ranged unit`, 
        properties: {
          damage: 9,
          speed: 1,
          health: 50,
          range: 3,
          territoryRadius: 0,
        },
        custom: {
          cost: [
            { resourceId: RESOURCE_ID.gold, value: 500 },
            { resourceId: RESOURCE_ID.food, value: 1 },
            { resourceId: RESOURCE_ID.lumber, value: 50 },
          ],
        },
      },


    ],
    board: {
      n, m,
      boxes: [],
    },
    players: [
      {
        id: 'player1',
        name: 'Seba',
        isAI: false,
        color: 'blue',
        unitTypes: ['human-base', 'goldMine', 'humanFarm', 'humanLumbermill', 'humanBlacksmith', 'humanBlacksmithDamageUpgrade1', 'humanTower1', 'footman', 'elven-archer'],
        resources: clone(resources),
      },
      {
        id: 'data_simple_1',
        name: 'Data',
        color: 'red',
        isAI: true,
        unitTypes: ['orc-base', 'goldMine', 'orcFarm', 'orcLumbermill', 'orcTower1', 'humanBlacksmith', 'grunt', 'troll'],
        resources: clone(resources),
      },
    ],
  }

  buildExtraDescriptionProperties(state)
  createBoxes(state, n, m)

  return state
}

function buildExtraDescriptionProperties(state:IState) {
  const icons = {}
  icons[RESOURCE_ID.food] = foodIcon
  icons[RESOURCE_ID.gold] = goldIcon
  icons[RESOURCE_ID.lumber] = lumberIcon
  state.unitsTypes.forEach(ut => {
    ut.extraDescriptionProperties = []
    if ((ut.custom as War2PlayerCustom) && ((ut.custom as War2PlayerCustom).cost as War2UnitCost[])) {
      ((ut.custom as War2PlayerCustom).cost as War2UnitCost[]).forEach(cost => {
        ut.extraDescriptionProperties.push({ key: cost.resourceId, value: `<img src="${icons[cost.resourceId]}"/>${cost.value}` })
      })
    }
  })
}

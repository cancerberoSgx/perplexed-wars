
import * as humanBlacksmith from './assets/HumanBlacksmith.gif'
import * as humanFarm from './assets/HumanFarm.gif'
import * as humanLumbermill from './assets/HumanLumbermill.gif'
import * as humanTower1 from './assets/HumanTower1.gif'
import * as HumanTownHall from './assets/HumanTownhall.gif'
import * as orcBlacksmith from './assets/OrcBlacksmith.gif'
import * as orcFarm from './assets/OrcFarm.gif'
import * as orcTower1 from './assets/OrcTower1.gif'
import * as archer from './assets/archer.gif'
import * as archerIcon from './assets/archerIcon.gif'
import * as footman from './assets/footman.gif'
import * as footmanIcon from './assets/footmanIcon.gif'
import * as goldMine from './assets/goldMine.gif'
import * as grunt from './assets/grunt.gif'
import * as gruntIcon from './assets/gruntIcon.gif'
import * as humanBlacksmithDamageUpgrade1 from './assets/humanBlacksmithDamageUpgrade1.png'
import * as orcGreatHall from './assets/orcGreatHall.gif'
import * as orcLumbermill from './assets/orcLumbermill.gif'
import * as troll from './assets/troll.gif'
import * as trollIcon from './assets/trollIcon.gif'
import { RESOURCE_ID } from './war2State'
import { IUnitType } from 'state/state-interfaces'

const foodDefaultValue = 4

export const mineGoldPlus = 20
export const lumbermillLUmberPlus = 1

export function war2Units() : IUnitType[] {
  return [{
    name: 'Gold Mine',
    image: goldMine,
    icon: goldMine,
    id: 'humanGoldMine',
    description: `Gives +${mineGoldPlus} gold per turn`,
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
    name: 'Upgrade Unit Damage Level 1',
    image: humanBlacksmithDamageUpgrade1,
    icon: humanBlacksmithDamageUpgrade1,
    id: 'humanBlacksmithDamageUpgrade1',
    description: `+2 damage to all units`,
    isNotAddableToBoard: true,
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
    name: 'Gold Mine',
    image: goldMine,
    icon: goldMine,
    id: 'orcGoldMine',
    description: `Gives +${mineGoldPlus} gold per turn`,
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
        { resourceId: RESOURCE_ID.food, value: 0 },
        { resourceId: RESOURCE_ID.lumber, value: 250 },
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
    image: archer,
    icon: archerIcon,
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
    image: grunt,
    icon: gruntIcon,
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
    image: troll,
    icon: trollIcon,
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
  ]
}

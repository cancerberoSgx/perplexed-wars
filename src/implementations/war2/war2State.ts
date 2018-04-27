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


const n = 15
const m = 10
const goldDefaultValuePerTurn = 50
const foodDefaultValue = 4


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
    },
    timestamp: Date.now(),

    // unit values were taking almost exactly as in https://wow.gamepedia.com/Warcraft_II_units#Footman_.2F_Grunt
    unitsTypes: [
      {
        name: 'Town Hall',
        image: HumanTownHall,
        icon: HumanTownHall,
        id: 'human-base',
        description: `The Town Hall serves as a center for the community and commerce of the various towns and military outposts in Lordaeron. As the chief economic building in any settlement, these sites are equipped to process vital resources such as lumber and gold. The steady stream of peasants, who laboriously harvest and transport resources, makes for constant activity near the Town Hall. The training that Peasants require to assist in the growth of their community is also given here.`,
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
        name: 'Gold Mine',
        image: goldMine,
        icon: goldMine,
        id: 'goldMine',
        description: `Gives +${goldDefaultValuePerTurn} gold per turn. Mined from the rich earth of Azeroth and Lordaeron, this precious metal is commonly used in exchange for goods and services. As a rare substance that is always in short supply, Gold must be dug out from the rock and soil within established Gold Mines. Many of these Mines were abandoned when the Orc raids began and the workers fled for their very lives. Since the beginning of the War, these sites are frequently operated while under the protection of military forces`,
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
        name: 'Farm',
        image: humanFarm,
        icon: humanFarm,
        id: 'humanFarm',
        description: `Feeds ${foodDefaultValue} units. Farms are a vital part of the many communities in Lordaeron. Producing various grains and foodstuffs, Farms not only generate sustenance for peasants and workers, but for the armies as well. The overall amount of food produced from a town's Farms is vital to the number of new workers or soldiers that the community can accommodate. It is imperative that this production be monitored at all times, so that the population remains well fed and the town runs smoothly`,
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
      {
        name: 'Scout Tower',
        image: humanTower1,
        icon: humanTower1,
        id: 'humanTower1',
        description: 'Scout Towers are tall, sturdy structures constructed to guard the borders of many settlements. From these sites, the defenders of Lordaeron can spot enemy troops from high above, making it difficult for the Orcs to launch surprise attacks. Their presence in the wildlands assures the swift deployment of our armies to meet any Orc incursion. These Towers may be outfitted with either deadly bolts that can pierce targets on land, sea and air, or with great cannon that while powerful, cannot attack threats from above.',
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
        name: 'Great Hall',
        image: orcGreatHall,
        icon: orcGreatHall,
        id: 'orc-base',
        isBase: true,
        description: `This structure serves many purposes, such as being the gathering place and command center, for most Orcish settlements. Unfit for battle, the lowly Peons are trained here to perform the menial tasks of construction, repair and harvesting. This is also where vital raw materials are gathered to be processed and then distributed. The Great Hall is always a source of fevered activity as the laboring Peons work to please their overseers. When settlements achieve greater prosperity and require stronger defenses, the Great Hall can be reinforced to become a Stronghold`,
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
        description: `Feeds ${foodDefaultValue} units. Farms are a vital part of the many communities in Lordaeron. Producing various grains and foodstuffs, Farms not only generate sustenance for peasants and workers, but for the armies as well. The overall amount of food produced from a town's Farms is vital to the number of new workers or soldiers that the community can accommodate. It is imperative that this production be monitored at all times, so that the population remains well fed and the town runs smoothly`,
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
      {
        name: 'Watch Tower',
        image: orcTower1,
        icon: orcTower1,
        id: 'orcTower1',
        description:`Rising high above the treeline, Watch Towers resemble primitive huts laced with animal bones and giant tusks of every kind. These insubstantial - but highly useful - lookout posts are ideal for spotting the cowardly and deceitful Human forces from above, making them a desired part of any Orcish settlement's defenses. These emplacements may be upgraded to loose deadly projectiles upon any approaching enemies, or to rain explosive death down upon their foes on land and sea..`,
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
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/5/53/HumanFootman.gif',
        icon: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/9/9d/Foot.gif',
        id: 'footman',
        description: `Footmen are the initial line of defense against the Horde. Arrayed in hardened steel armor, they courageously wield broadsword and shield in hand-to-hand combat against their vile Orcish foes. The valorous Footmen are ever-prepared to heed the call to arms`,
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
        description: `Out of the mysterious forests of Quel'thalas come the Elven Archers to aid the Alliance in its darkest hour. Descendants of the elder race of Lordaeron, these sylvan woodsmen are unmatched in their use of the bow. Unencumbered by helm or heavy armor, Archers are keen of eye and fleet of foot. These Elves have long been embroiled in a bloody conflict with the hated Trolls of Lordaeron and are swift to let loose a rain of arrows upon any foe, including those that attack from the skies above`, 
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
        description: `Those Orcs who distinguish themselves enough in the arts of war to be trained as Grunts epitomize the merciless spirit of the Horde. Equipped with mighty axes and battle-worn armor, they are prepared to fight to the death. Devoted to the Horde and to their clans, the Grunt lusts for battle - wanting nothing more than to wade into the field of carnage and die a bloody death surrounded by the bodies of his fallen enemies`,
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
        description: `The Trolls of Lordaeron have suffered ages of attrition at the hands of the Humans, Dwarves, and Elves. The appearance of the Orcish Horde has given them the opportunity to ally themselves with kindred spirits with whom they can seek revenge upon their many enemies. More agile than the brutish Orcs, Trolls employ throwing axes - along with a cunning attack and retreat stratagem - to assail their foes. This combination of speed, range and the ability to bring down threats from above makes them a valuable addition to the Orcish Horde`,
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
        unitTypes: ['human-base', 'goldMine', 'humanFarm', 'humanTower1', 'footman', 'elven-archer'],
        resources: clone(resources),
      },
      {
        id: 'data_simple_1',
        name: 'Data',
        color: 'red',
        isAI: true,
        unitTypes: ['orc-base', 'goldMine', 'orcFarm', 'orcTower1', 'grunt', 'troll'],
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

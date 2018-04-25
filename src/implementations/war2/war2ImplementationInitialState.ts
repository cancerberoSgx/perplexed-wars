import { IState, IBox} from "../../state/state-interfaces";
import { State } from "../../state/state";
import { createBoxes, buildUIStatePlayerControls } from "../../util/util";
import * as HumanTownHall from './assets/HumanTownhall.gif'

export function war2ImplementationInitialState():IState {
  const n=15
  const m=10
  const state:IState = {
    game: {
      interval: 1000,
      allowDiagonal: true,
      time: 0,
      realTime: true,
      winner: '', 
      gameFinish: false,
      paused: false
    },
    timestamp: Date.now(),

    // unit values were taking almost exactly as in https://wow.gamepedia.com/Warcraft_II_units#Footman_.2F_Grunt
    unitsTypes: [
      {
        name: 'Town Hall',
        image: HumanTownHall,
        icon: HumanTownHall,
        id: 'human-base',
        isBase: true,
        properties: {
          damage: 18,
          speed:0,
          health: 1200,
          range: 2,
          territoryRadius: 2
        }
      },
      {
        name: 'Great Hall',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/e/e0/OrcTownhall.gif',
        icon: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/e/e0/OrcTownhall.gif',
        id: 'orc-base',
        isBase: true,
        properties: {
          damage: 18,
          speed:0,
          health: 1200,
          range: 2,
          territoryRadius: 2
        }
      },

      {
        name: 'Footman',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/5/53/HumanFootman.gif',
        icon: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/9/9d/Foot.gif',        
        id: 'footman',
        isBase: false,
        properties: {
          damage: 9,
          speed: 1,
          health: 60,
          range: 1,
          territoryRadius: 0
        }
      },
      {
        name: 'Elven Archer',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/4/4d/ElfArcher.gif', 
        icon: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/4/4f/Aface.gif?version=237897e7775651612b874e7d7ec5f7d8',
        id: 'elven-archer',
        isBase: false,
        properties: {
          damage: 9+6,
          speed: 1,
          health: 50,
          range: 4,
          territoryRadius: 0
        }
      },

      {
        name: 'Grunt',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/c/cc/OrcGrunt.gif',
        icon: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/e/e0/Grunt.gif',
        id: 'grunt',
        isBase: false,
        properties: {
          damage: 9,
          speed: 1,
          health: 60,
          range: 1,
          territoryRadius: 0
        }
      },
      {
        name: 'Troll Axethrower',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/7/75/TrollAxethwr.gif',
        icon: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/3/31/Axe.gif',
        id: 'troll',
        isBase: false,
        properties: {
          damage: 9+6,
          speed: 1,
          health: 50,
          range: 4,
          territoryRadius: 0
        }
      }


    ],
    board: {
      n, m, 
      boxes: []
    },
    players:[
      {
        id: 'player1',
        name: 'Seba',
        isAI: false,
        color: 'blue',
        unitTypes: ['human-base', 'footman', 'elven-archer'],
        resources: [
          {
            id: 'gold',
            name: 'gold',
            defaultValuePerTurn: 200,
            value: 1200,
            thisTurnValue: 0,
            icon: ''
          }
        ]
      }, 
      {
        id: 'player2',
        name: 'Data',
        color: 'red',
        isAI: true,
        unitTypes: ['orc-base', 'grunt', 'troll'],
        resources: [
          {
            id: 'gold',
            name: 'gold',
            defaultValuePerTurn: 200,
            value: 1200,
            thisTurnValue: 0,
            icon: ''
          }
        ]
      }
    ],
    uiState: {
      currentPlayer: 'player1',
      playerControls: [],
      unitSelection: [],
      unitAttacks: [],
      unitDeads: []
    }
  }

  createBoxes(state, n, m, 'human-base', 'orc-base')
  buildUIStatePlayerControls(state)

  return state
}

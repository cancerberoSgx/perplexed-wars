import { IState, IBox} from "../../state/interfaces";
import { clone } from "../../util/util";
import { State } from "../../state/state";
import { createBoxes, buildUIStatePlayerControls } from "../../state/initialState";
import * as HumanTownhall from './assets/HumanTownhall.png'

export function war2ImplementationInitialState():IState {
  const n=15
  const m=10
  const state:IState = {
    game: {
      interval: 4000,
      allowDiagonal: true,
      time: 0,
      realTime: false,
      winner: '', 
      gameFinish: false,
      paused: false
    },
    timestamp: Date.now(),
    unitsTypes: [
      {
        name: 'Town Hall',
        image: HumanTownhall,
        icon: HumanTownhall,
        id: 'human-base',
        isBase: true,
        properties: {
          damage: 2,
          speed:0,
          health: 10,
          range: 2,
          territoryRadius: 2
        },
      },
      {
        name: 'Great Hall',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/e/e0/OrcTownhall.gif',
        icon: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/e/e0/OrcTownhall.gif',
        id: 'orc-base',
        isBase: true,
        properties: {
          damage: 2,
          speed:0,
          health: 10,
          range: 3,
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
          damage: 1,
          speed: 1,
          health: 3,
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
          damage: 1,
          speed: 1,
          health: 2,
          range: 2,
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
          damage: 1,
          speed: 1,
          health: 3,
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
          damage: 1,
          speed: 1,
          health: 2,
          range: 2,
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
        name: 'seba',
        isAI: false,
        color: 'blue',
        unitTypes: ['human-base', 'footman', 'elven-archer'],
        resources: []
      }, 
      {
        id: 'player2',
        color: 'red',
        isAI: true,
        unitTypes: ['orc-base', 'grunt', 'troll'],
        resources: []
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

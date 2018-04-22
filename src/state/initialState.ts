import { IState, IBox} from "./interfaces";
import { clone } from "../util/util";
import { State } from "./state";

export function initialState():IState {
  const n=6
  const m=4
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
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/a/a5/HumanTownhall.gif',
        icon: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/a/a5/HumanTownhall.gif',
        id: 'human-base',
        isBase: true,
        properties: {
          damage: 2,
          speed:0,
          health: 10,
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
        icon: 'https://wow.gamepedia.com/File:Aface.gif',
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
        unitTypes: ['human-base', 'footman', 'elven-archer']
      }, 
      {
        id: 'player2',
        color: 'red',
        isAI: true,
        unitTypes: ['orc-base', 'grunt', 'troll']
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

  createBoxes(state, n, m)
  buildUIStatePlayerControls(state)
  return state
}

function buildUIStatePlayerControls(state:IState){
  state.players.forEach(p=>{
    const playerControl = {playerId: p.id, addUnitButtons: []}
    p.unitTypes.forEach(unitType=>{
      playerControl.addUnitButtons.push({unitTypeId: unitType, pressed: false})
    })
    state.uiState.playerControls.push(playerControl)
  })
}

function createBoxes(state:IState, n:number, m:number){
  const boxes = state.board.boxes = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const box:IBox = {
        x: i, 
        y: j, 
        terrain: 'grey', 
        units: [],
        id: `box-${i}-${j}`
      }
      // TODO: dont hardcode 'orc-base' and 'human-base' - search for it!
      if(i===0&&j===0) {
        box.units.push(State.newUnit(state, 'human-base', state.players[0].id))
      }
      if(i===n-1&&j===m-1) {
        box.units.push(State.newUnit(state, 'orc-base', state.players[1].id))  
      }
      boxes.push(box)
    }
  }
  return boxes
}
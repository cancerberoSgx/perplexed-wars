import { IState, IBox} from "./interfaces";

export function initialState():IState {
  const n=14
  const m=12
  const state = {
    timestamp: Date.now(),
    unitsTypes: [
      {
        name: 'Town Hall',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/a/a5/HumanTownhall.gif',
        id: 'human-base',
        properties: {
          damage: 2,
          speed:0,
          health: 10,
          range: 2,
          territoryRadius: 2
        }
      },
      {
        name: 'Footman',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/5/53/HumanFootman.gif',
        id: 'footman',
        properties: {
          damage: 1,
          speed: 1,
          health: 2,
          range: 1,
          territoryRadius: 2
        }
      },
      {
        name: 'archer',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/4/4d/ElfArcher.gif',
        id: 'archer',
        properties: {
          damage: 1,
          speed: 1,
          health: 2,
          range: 2,
          territoryRadius: 2
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
        unitTypes: ['human-base', 'footman', 'archer']
      }, 
      {
        id: 'player2',
        color: 'red',
        isAI: true,
        unitTypes: ['human-base', 'footman', 'archer']
      }
    ],
    uiState: {
      currentPlayer: 'player1',
      playerControls: [
        {
          playerId: 'player1', 
          addUnitButtons: [
            {
              unitTypeId: 'footman', 
              pressed: false
            }, 
            {
              unitTypeId: 'archer', 
              pressed: false
            }
          ]
        },
        {
          playerId: 'player2', 
          addUnitButtons: []
        }
      ]
    }
  }

  createBoxes(state, n, m)
  return state
}

function createBoxes(state:IState, n:number, m:number){
  const boxes = state.board.boxes = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const box:IBox = {
        x: i, y: j, 
        terrain: 'grey', 
        units: []
      }
      if(i===0&&j===0) {
        box.units.push({// TODO: dont hardcode the base and properties here !! search in player.unittypes!!!
          typeId: 'human-base', 
          playerId: 'player1',
          state: {
            damage: 2,
            speed:0,
            health: 10,
            range: 2,
            territoryRadius: 2
          }
        })
      }
      if(i===n-1&&j===m-1) {
        box.units.push({ // TODO: dont hardcode the base and properties here !! search in player.unittypes!!!
          typeId: 'human-base', 
          playerId: 'player2',
          state: {
            damage: 2,
            speed:0,
            health: 10,
            range: 2,
            territoryRadius: 2
          }
        })
      }
      boxes.push(box)
    }
  }
  return boxes
}
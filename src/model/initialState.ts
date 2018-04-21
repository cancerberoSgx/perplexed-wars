import { IState} from "./interfaces";

export function initialState():IState {
  const n=10
  const m=12;
  return {
    timestamp: Date.now(),
    unitsTypes: [
      {
        type: 'base',
        name: 'Town Hall',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/a/a5/HumanTownhall.gif',
        unitTypeId: 'human-base'
      },
      {
        type: 'unit',
        name: 'Footman',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/5/53/HumanFootman.gif',
        unitTypeId: 'footman'
      },
      {
        type: 'unit',
        name: 'archer',
        image: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/4/4d/ElfArcher.gif',
        unitTypeId: 'archer'
      }
    ],
    board: {
      n, m, 
      boxes: createBoxes( n, m)
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
          addUnitButtons: [{unitTypeId: 'footman', pressed: false}, {unitTypeId: 'archer', pressed: false}]
        },
        {
          playerId: 'player2', 
          addUnitButtons: []
        }
      ]
    }
  }
}

function createBoxes(n:number, m:number){
  const boxes = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      boxes.push({
        x: i, y: j, 
        terrain: 'grey', 
        units: i===0&&j===0 ? [{
            type: 'base', 
            playerId: 'player1'
          }] : i===n-1&&j===m-1 ? [{
            type: 'base', 
            playerId: 'player2'
          }] : []
      })
    }    
  }
  return boxes
}
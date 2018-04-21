import { IState} from "./interfaces";

export function initialState():IState {
  const n=10
  const m=12;
  return {
    timestamp: Date.now(),
    unitsTypes: [
      {
        type: 'base'
      }
    ],
    board: {
      n, m, 
      boxes: createBoxes( n, m)
    },
    players:[
      {id: 'player1'}, {id: 'player2'}
    ],
    uiState: {
      currentPlayer: 'player1',
      playerControls: [
        {playerId: 'player1',  addUnitButtonPressed: false},
        {playerId: 'player2', addUnitButtonPressed: false}
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
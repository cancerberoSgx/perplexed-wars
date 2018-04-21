import { IState } from "./interfaces";

export function initialState():IState {
  return {
    timestamp: Date.now(),
    unitsTypes: [
      {
        type: 'base'
      }
    ],
    board: {
      n: 4, m: 4, 
      boxes: [
      {
        x:0, 
        y:0, 
        terrain: 'green', 
        units: [{
          type: 'base', 
          playerId: 'player1'
        }]
      }, 
      {
        x: 1, y: 0, 
        terrain: 'grey', 
        units: []
      }, 
      {
        x: 2, y: 0, 
        terrain: 'grey', 
        units: []
      }, 
      {
        x: 3, y: 0, 
        terrain: 'grey', 
        units: []
      },
      {
        x: 0, y: 1, 
        terrain: 'grey', 
        units: []
      },
      {
        x: 1, y: 1, 
        terrain: 'grey', 
        units: []
      },
      {
        x: 2, y: 1, 
        terrain: 'grey', 
        units: []
      },
      {
        x: 3, y: 1, 
        terrain: 'grey', 
        units: []
      },

      {
        x: 0, y: 2, 
        terrain: 'grey', 
        units: []
      },
      {
        x: 1, y: 2, 
        terrain: 'grey', 
        units: []
      },
      {
        x: 2, y: 2, 
        terrain: 'grey', 
        units: []
      },
      {
        x: 3, y: 2, 
        terrain: 'grey', 
        units: []
      },

      {
        x: 0, y: 3, 
        terrain: 'grey', 
        units: []
      },
      {
        x: 1, y: 3, 
        terrain: 'grey', 
        units: []
      },
      {
        x: 2, y: 3, 
        terrain: 'grey', 
        units: []
      },
      {
        x:3, 
        y:3, 
        terrain: 'green', 
        units: [{
          type: 'base', 
          playerId: 'player2'
        }]
      },
    ]
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

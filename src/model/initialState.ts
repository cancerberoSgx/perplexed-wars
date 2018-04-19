import { IPlayerUIState, IState } from "./interfaces";


// const state: IState = initialState()

export function initialState():IState {
  return {
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
    ],
    getCurrentPlayerUIState():IPlayerUIState{
      return this.playerControls.find(c=>c.playerId===this.currentPlayer) || this.playerControls[0]
    }
  }


  }
}


// export const ACTION_ADD_UNIT = 'add-unit'
// export interface IAction {
//   type:string
// }
// export interface IAddUnitAction extends IAction {
//   // playerId: string
//   x: number
//   y : number,
//   unit: IUnit
// }

// this is the handler from real user action - it interacts with the state variable
// let state:IState
// export function addUnit():IAddUnitAction{
//   if (!state){
//     state = initialState()
//   }
//   return {
//       type:ACTION_ADD_UNIT,
//       x: 1,
//       y: 2, 
//       unit: {
//         type: 'tower',
//         playerId: 'player2'
//       }
//     }
// }
// export const addTodo = (text:string) => ({
//   id: nextTodoId++,
//   text,
//   type: 'ADD_TODO',
// })
​
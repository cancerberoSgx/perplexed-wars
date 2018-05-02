
import * as goldIcon from './assets/gold.gif'
import * as foodIcon from './assets/food.gif'
import * as lumberIcon from './assets/lumber.gif'
import { RESOURCE_ID, War2PlayerCustom, War2UnitCost } from './war2State'
import { IState, IResource } from '../../state/state-interfaces'

const goldDefaultValuePerTurn = 50
export function war2resources():IResource[] {
  return [{
    id: RESOURCE_ID.gold,
    name: RESOURCE_ID.gold,
    defaultValuePerTurn: goldDefaultValuePerTurn,
    value: 2000,
    thisTurnValue: 0,
    icon: goldIcon,
  }, {
    id: RESOURCE_ID.lumber,
    name: RESOURCE_ID.lumber,
    defaultValuePerTurn: 2,
    value: 400,
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
}


export function buildExtraDescriptionProperties(state:IState) {
  const icons = {}
  icons[RESOURCE_ID.food] = foodIcon
  icons[RESOURCE_ID.gold] = goldIcon
  icons[RESOURCE_ID.lumber] = lumberIcon
  state.unitsTypes.forEach(ut => {
    ut.extraDescriptionProperties = []
    const desc = { key: 'Cost', value: '' }
    ut.extraDescriptionProperties.push(desc)
    if ((ut.custom as War2PlayerCustom) && ((ut.custom as War2PlayerCustom).cost as War2UnitCost[])) {
      ((ut.custom as War2PlayerCustom).cost as War2UnitCost[]).forEach(cost => {
        desc.value += `<img src="${icons[cost.resourceId]}"/>${cost.value}`
      })
    }
  })
}


## how resources grow ? 
how implementors can declare this

Use cases: 

* gold increases +10 each turn
* a "bank" building increases gold production per turn 50%
* a "market" building increases +2 gold per turn
* an enemy  unit "mosketeer" killed will give 50 gold

an easy one: 

 * resources's values are only modified in the following moments: 
    * when the turn ends : we sum all events that give net gold that happended in the turn (like enemy unit kills, gold per turn, etc), , and then multiply it with possible factors (like bank before)
    * when user build/buy something. we cannot wait til the end of the turn - we must substract money in that exac moment when the unit/building is created. 


three different definitions

resourceModifiers: [
  {
    when: 'onUnitKill',
    modifier: (state, unitKill)
  }
]







## Resources, a first thought ----OLD 

 * if we design resources to be very generic, then we can kill several problems. For example, special buildings that allow us to train special units could be treated as resources. Technologies could be treated as resources. Unit upgrades could be treated as resources. Resources could be bougth with resources. resources could be obtained : as time pass, as a certain event happen,units can impact resource production ratio. Food (like houses or supply depots) could be also be treated as resources

interface IPlayer{
  resources: IResource[]
  units: IUnit[]
}

interface IResource extends IThing{
  value: number
  icon: string
  initialValue: number
}

interface IUnitType extends Ithing  { (or extends IResource ???)
  buildCondition: (player, state)=>player.resources.find(r=>r.name==='gold').value>50 && player=>player.resources.find(r=>r.name==='gold')

  endOfTurnModifiers: Array<(state)=>void>
}


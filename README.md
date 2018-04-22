real-time tower-defense-like game but where you decide if attack or defend. 

The idea is to provide with a good default experience - but also to *provide a framework to easily build similar games*


# TODO

* save as png icons of war2 like we did for src/implementations/war2/assets/HumanTownhall.png

* performance - check comments : TODO: make me faster

* gameLoop in general  is very unfair: we are moving/attacking all units of player1 first and then player2's - we should move units in the order they were created !!!

* reducers, we need to do this at the beggining : state = State.get()    -  for some reason state argument is not the last / updated one - that's why I need to reasign here . Investigate what I'm doing wrong with redux here

 * in moveResolver :  support unit.speed - if unit is fast then take path[speed] - if it si slow, dont move now, move in following turns

 * spells like meteors in kingdom rush

 * smooth transitions on move / death ? 

 * we always assume 2 players

* revert changes in tslint.json and tsconfig.json - for warnings and validation - no unused variables, etc so we validate those lints / errors / warnings

* click add unit button should sow visual feedback in boxes where the unit can be added (yellowish)

* // TODO: we assume unit action points are 1. a feature could be unit.state.actionPoints so it can move/attack several times per "turn"

* units upgrade into

* terrain ? 

* towers ? 

* sight ? fog of war ? each unit have a range sght property ? would be interesting not to know what the enemy is building / has

* playable in phones ? how to be agnostic in unit-sizes - we dont want implementers to be worry about particular sizes. 

* initial screen with intro and asking preferences . Implementors should be able to declare this info. ie: a intro story , IA level, settings, etc

* sound ? when unit attack / is attacked. When building is selected

* attack / attacked / move visual feedback should be providen by implementors. 

* unit building requirement : for being able to build a unit some condition must happen - not only gold. 


* resources : we should be resource - agnostic to be a framework. Don't say "gold". There could be N amount of resource types, all with custom names and icons. Custom buildings produce x amount of some resource.




## Resources, a first thought

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


}

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
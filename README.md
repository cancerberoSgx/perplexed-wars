real-time tower-defense-like game but where you decide if attack or defend. 


The idea is to provide with a good default experience - but also to provide a framework to easily build similar games 

TODO

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

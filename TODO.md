# ISSUES

* clicking add unit with control i cannot cancel if I regret - for untoggle i need to add a unit. implement: click on a active button deactivate it.

# TODO

* save as png icons of war2 like we did for src/implementations/war2/assets/HumanTownhall.png

* performance - check comments : TODO: make me faster

* gameLoop in general  is very unfair: we are moving/attacking all units of player1 first and then player2's - we should move units in the order they were created !!!

* reducers, we need to do this at the beggining : state = State.get()    -  for some reason state argument is not the last / updated one - that's why I need to reasign here . Investigate what I'm doing wrong with redux here

 * moveResolver: if there is no path, we should still try to move the unit. Issue. if I block the two base - no unit moves no matter that all lthe board is free

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

* attack / attacked / move visual feedback should be providen by implementors. Investigated LineCss - check LineCss.ts file and commented code in App.tsx

* unit building requirement : for being able to build a unit some condition must happen - not only gold. 


* resources : we should be resource - agnostic to be a framework. Don't say "gold". There could be N amount of resource types, all with custom names and icons. Custom buildings produce x amount of some resource.


 * we could make unitTypes more agnostic, like resources. currently e are hardcoding this:  damage: 9,     speed: 1,       health: 60,        range: 1,     territoryRadius: 0 we could make user-defined those... 
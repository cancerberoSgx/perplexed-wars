Framework to build tower-defense-like games but where you decide if attack or defend. 

**Work in progress**

# Current implementation reference (WIP)

Based on WarCraft 2

https://cancerberosgx.github.io/perplexed-wars/build/

[The code](https://github.com/cancerberoSgx/perplexed-wars/tree/master/src/implementations/war2)


# Project home

[https://github.com/cancerberoSgx/perplexed-wars](https://github.com/cancerberoSgx/perplexed-wars)


# Features

 * WIP
 * units move automatically, user decides what to build
 * Can choose to build towers for economy or units to attack enemy base
 * The default implementation is based on Warcraft 2 but definition of units, resources, buildings, etc are configurable. 
 * implementors responsible of defining units, resources, 
 * supports real-time or turn based and more settings live


# Run

```sh
npm install
npm run start # developer mode
npm run build # build production
npm test # run tests
npm run doc # geerate api docs
```

# API docs

https://cancerberosgx.github.io/perplexed-wars/docs/

Implementors must provide:

an implementation of this for the state (units, resources, etc): https://cancerberosgx.github.io/perplexed-wars/docs/interfaces/istate.html

* an implementation of this for the behavior: modifications of the state, rules, etc: https://cancerberosgx.github.io/perplexed-wars/docs/interfaces/igameframework.html
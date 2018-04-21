import { createStore, Store } from 'redux';
import { allReducers } from './allReducers';

export const store:Store = createStore(allReducers)
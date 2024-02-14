import { createStore } from 'redux';
import reducer from './selectedUser';

const store = createStore(reducer);

export default store;

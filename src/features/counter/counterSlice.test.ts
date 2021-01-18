import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { incrementAsync, returnSomethingAsync, returnSomethingPromise } from './counterSlice';
import { AppDispatch } from '../../app/store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('counter Slice test', () => {
  it('playing with thunks', async () => {
    const initialState = {};
    const store = mockStore(initialState);
    const dispatch = store.dispatch as AppDispatch;
    const a = dispatch(incrementAsync(1));
    console.log(a);

    const b = dispatch(returnSomethingPromise());
    console.log(b);

    const c = dispatch(returnSomethingAsync());
    console.log(c);
    const actions = store.getActions();
  })
  it('playing with async await', async () => {
    console.log('Sync 1');
    setTimeout(_ => console.log('async 2'), 0);
    Promise.resolve().then(_ => console.log('Promise 3'));
    console.log('sync 4');

  });

})

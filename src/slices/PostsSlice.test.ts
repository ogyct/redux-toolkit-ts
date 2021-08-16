import { addPost, fetchPosts} from './PostsSlice';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {Post} from "../common/common";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const post: Post = { id: 1, body: 'body', title: 'title' };

describe('Slice test', () => {
    it('Add action test', () => {
        const initialState = {};
        const store = mockStore(initialState);
        store.dispatch(addPost(post));
        const actions = store.getActions();
        const expectedPayload = { type: 'Posts/addPost', payload: post };
        expect(actions).toEqual([expectedPayload]);
    });
    it('Async fetch fulfilled test', () => {
        const store = mockStore({});
        store.dispatch(fetchPosts.fulfilled([post], ''));
        const expectedPayload = {
            type: 'Posts/fetchPosts/fulfilled',
            payload: [post],
        };
        const actions = store.getActions();

        expect(actions[0]).toMatchObject(expectedPayload);
    });

    it('Async fetch pending test', () => {
        const store = mockStore({});
        store.dispatch(fetchPosts.pending(''));
        const expectedPayload = {
            type: 'Posts/fetchPosts/pending',
            payload: undefined
        };
        const actions = store.getActions();

        expect(actions).toMatchObject([expectedPayload]);

    });
    // it('Async thunk test', async () => {
    //     const store = mockStore({});
    //     const dispatch = store.dispatch as ThunkDispatch<Post[], any, any>;
    //     const dispres = await dispatch(fetchPosts());
    //     const expectedAction1 = fetchPosts.pending('');
    //     const expectedAction2 = fetchPosts.fulfilled([post], '');
    //     const actions = store.getActions();
    //     console.log(actions);
    //
    //     // expect(actions).toMatchObject([expectedPayload]);
    // });
});

// @flow
import * as React from 'react';
import {useEffect} from 'react';
import {PostAddFrom} from "./PostAddFrom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import SinglePost from "./SinglePost";
import {fetchPosts, PostStatus} from "./PostsSlice";


export function Posts() {

    const dispatch = useDispatch();
    const postsSelection = useSelector((state: RootState) => state.posts.posts);
    const postsStatus = useSelector((state: RootState) => state.posts.status);
    useEffect(() => {
        if (postsStatus === PostStatus.IDLE) {
            console.log(postsStatus);
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch]);


    if (postsStatus === PostStatus.IDLE) {
        return <h1>Loading</h1>;
    }

    let posts = postsSelection.map(post => {
        return <SinglePost post={post} key={post.id}/>;
    })
    return (
        <div>
            <div className="mb-2"><PostAddFrom/></div>
            <div className="mb-2">{posts}</div>
        </div>
    );
};

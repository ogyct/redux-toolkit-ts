// @flow
import * as React from 'react';
import { useEffect } from 'react';
import { PostAddFrom } from "./PostAddFrom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import SinglePost from "./SinglePost";
import { fetchComments, fetchPosts, LoadingStatus, Post } from "./PostsSlice";
import { Spinner } from 'reactstrap';
import { spinner } from '../common/common';


export function Posts() {
    useEffect(() => console.log('mount'), []);
    const dispatch = useAppDispatch();
    const postsSelection = useSelector((state: RootState) => state.posts.posts);
    const postsStatus = useSelector((state: RootState) => state.posts.postsStatus);
    const commentsStatus = useSelector((state: RootState) => state.posts.commentsStatus);
    const commentsSelection = useSelector((state: RootState) => state.posts.comments);

    useEffect(() => {

        (async () => {
            if (postsStatus === LoadingStatus.IDLE) {
                const res = await dispatch(fetchPosts());
                const posts = res.payload as Post[];
                const res1 = await dispatch(fetchComments(posts[0].id));
                const comments = res1.payload as Comment[];
            }
        })();
    }, [postsStatus, dispatch]);



    let posts = postsSelection.map(post => {
        return <SinglePost post={post} key={post.id}/>;
    })
    return (
      <div>
          <div className="mb-2"><PostAddFrom/></div>
          <div className="mb-2">{(postsStatus === LoadingStatus.LOADING) ? spinner() : posts}</div>
      </div>
    );
}

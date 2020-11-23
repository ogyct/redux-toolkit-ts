// @flow
import * as React from 'react';
import {PostAddFrom} from "./PostAddFrom";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import SinglePost from "./SinglePost";

export function Posts() {

    const postsSelection = useSelector((state: RootState) => state.posts);
    const posts = postsSelection.map(post => {
        return <SinglePost post={post} key={post.id}/>;
    })
    return (
        <div>
            <div className="mb-2"><PostAddFrom/></div>
            <div className="mb-2">{posts}</div>
        </div>
    );
};

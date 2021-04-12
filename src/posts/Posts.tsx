// @flow
import * as React from "react";
import { PostAddFrom } from "./PostAddFrom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SinglePost from "./SinglePost";
import { LoadingStatus, postSelectors } from "../slices/PostsSlice";
import { spinner } from "../common/common";
import { Button } from "reactstrap";
import { useState } from "react";

export function Posts() {
  const postsStatus = useSelector(
    (state: RootState) => state.posts.postsStatus
  );
  const postsSelection = useSelector((state: RootState) =>
    postSelectors.selectAll(state)
  );
  const [creationMode, setCreationMode] = useState(false);

  let posts = postsSelection.map((post) => {
    return <SinglePost post={post} key={post.id} />;
  });
  return (
    <div>
      {!creationMode && (
        <>
          <Button onClick={() => setCreationMode(true)} color="primary">
            Create new post
          </Button>
        </>
      )}
      {creationMode && (
        <div className="mb-2">
          <PostAddFrom setCreationMode={setCreationMode} />
        </div>
      )}
      <div className="mb-2">
        {postsStatus === LoadingStatus.LOADING ? spinner() : posts}
      </div>
    </div>
  );
}

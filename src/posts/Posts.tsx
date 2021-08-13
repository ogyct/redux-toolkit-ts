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
import {useGetPostsByUserIdQuery} from "../slices/PostsApi";

export function Posts() {

  const {data, error, isLoading} = useGetPostsByUserIdQuery(1);
  const [creationMode, setCreationMode] = useState(false);

  let posts = data?.map((post) => {
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
        {isLoading ? spinner() : posts}
      </div>
    </div>
  );
}

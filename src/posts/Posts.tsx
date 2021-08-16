// @flow
import * as React from "react";
import { useState } from "react";
import { PostAddFrom } from "./PostAddFrom";
import SinglePost from "./SinglePost";
import { spinner } from "../common/common";
import { Button } from "reactstrap";
import { useGetPostsQuery } from "../slices/PostsApi";

export function Posts() {
  const { data, error, isLoading } = useGetPostsQuery();
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
      <div className="mb-2">{isLoading ? spinner() : posts}</div>
    </div>
  );
}

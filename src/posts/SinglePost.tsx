import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useDeletePostMutation } from "../slices/PostsApi";
import {Post} from "../common/common";

interface SinglePostProps {
  post: Post;
}

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [currentPost, setCurrentPost] = useState<Post>(post);
  const history = useHistory();
  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  return (
    <Card className="border-0 m-2" body color="light">
      <CardBody>
        <CardText tag={"h5"}>{currentPost.title}</CardText>
        <CardText tag={"p"}>{currentPost.body}</CardText>
        <Button
          onClick={async () => await deletePost(post.id).unwrap()}
          color="danger"
        >
          Delete{" "}
        </Button>{" "}
        <Button
          onClick={() => {
            history.push(`post/${post.id}`);
          }}
        >
          Edit post
        </Button>
      </CardBody>
    </Card>
  );
};

export default SinglePost;

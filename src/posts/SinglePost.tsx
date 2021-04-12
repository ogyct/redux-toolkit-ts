import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { useDispatch } from "react-redux";
import { deletePost, Post } from "../slices/PostsSlice";
import { useHistory } from "react-router-dom";

interface SinglePostProps {
  post: Post;
}

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  const [currentPost, setCurrentPost] = useState<Post>(post);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentPost(post);
  }, [post]);

  return (
    <Card className='border-0 m-2' body color="light">
      <CardBody>
        <CardText tag={"h5"}>{currentPost.title}</CardText>
        <CardText tag={"p"}>{currentPost.body}</CardText>
        <Button onClick={() => dispatch(deletePost(post.id))} color="danger">
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

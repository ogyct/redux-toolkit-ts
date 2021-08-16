import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, CardText, CardTitle, Input,} from "reactstrap";
import {useParams} from "react-router-dom";
import Comments from "./Comments";
import {useGetPostQuery, useUpdatePostMutation} from "../slices/PostsApi";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {data: currentPost, isLoading} = useGetPostQuery(id);
  const [updatePost, {isLoading: isUpdating}] = useUpdatePostMutation();


  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setTitle(currentPost?.title || "");
    setBody(currentPost?.body || "");
  }, [currentPost]);

  const viewContent = () => (
    <CardBody>
      <CardTitle tag="h5">{currentPost?.title}</CardTitle>
      <CardText>{currentPost?.body}</CardText>
      <Button color="primary" onClick={() => setEditMode(true)}>
        Edit
      </Button>
    </CardBody>
  );

  const editContent = () => (
    <CardBody>
      <Input
        className="m-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      >
        {currentPost?.title}
      </Input>
      <Input
        className="m-2"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      >
        {currentPost?.body}
      </Input>
      <Button
        className="m-2"
        color="primary"
        onClick={async () => {
          currentPost && await updatePost({...currentPost, title, body}).unwrap()
          setEditMode(false);
        }}
      >
        Save
      </Button>
      <Button
        className="m-2"
        color="dark"
        onClick={() => {
          setEditMode(false);
          setTitle(currentPost?.title!);
          setBody(currentPost?.body!);
        }}
      >
        Cancel
      </Button>
    </CardBody>
  );

  return (
    <div>
      <Card className="bg-white mb-4 text-left">
        <CardHeader>Post {id}</CardHeader>
        {!editMode ? viewContent() : editContent()}
      </Card>
      <Comments />
    </div>
  );
};

export default PostDetail;

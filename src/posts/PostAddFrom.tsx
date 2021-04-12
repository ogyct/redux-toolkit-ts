// @flow
import * as React from "react";
import { Dispatch, FC, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useDispatch } from "react-redux";
import { addPost, Post } from "../slices/PostsSlice";

interface PostAddFromProps {
  setCreationMode: Dispatch<React.SetStateAction<boolean>>;
}

export const PostAddFrom: FC<PostAddFromProps> = ({ setCreationMode }) => {
  const dispatch = useDispatch();
  const emptyPost: Post = { id: 0, title: "", body: "" };
  const [post, modifyPost] = useState<Post>(emptyPost);

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Enter title"
            value={post.title}
            onChange={(e) =>
              modifyPost((prevState) => {
                return { ...prevState, title: e.target.value };
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="text">Text</Label>
          <Input
            type="text"
            name="text"
            placeholder="Enter text"
            value={post.body}
            onChange={(e) =>
              modifyPost((prevState) => {
                return { ...prevState, body: e.target.value };
              })
            }
          />
        </FormGroup>
        <Button
          onClick={() => {
            dispatch(addPost(post));
            setCreationMode(false);
            modifyPost(() => emptyPost);
          }}
          color="primary"
        >
          Add post
        </Button> {' '}
        <Button onClick={() => setCreationMode(false)} color="dark">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

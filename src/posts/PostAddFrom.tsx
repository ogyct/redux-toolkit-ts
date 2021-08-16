// @flow
import * as React from "react";
import { Dispatch, FC, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useAddPostMutation } from "../slices/PostsApi";
import { Post } from "../common/common";

interface PostAddFromProps {
  setCreationMode: Dispatch<React.SetStateAction<boolean>>;
}

export const PostAddFrom: FC<PostAddFromProps> = ({ setCreationMode }) => {
  const emptyPost: Post = { id: "", title: "", body: "" };
  const [addPost] = useAddPostMutation();
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
            addPost(post);
            setCreationMode(false);
            modifyPost(() => emptyPost);
          }}
          color="primary"
        >
          Add post
        </Button>{" "}
        <Button onClick={() => setCreationMode(false)} color="dark">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

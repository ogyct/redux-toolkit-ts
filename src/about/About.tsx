import React, { useRef, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { fetchPost, LoadingStatus, Post } from '../posts/PostsSlice';
import { useAppDispatch } from '../app/store';
import { spinner } from '../common/common';

const About = () => {

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<Post>();
  const [status, setStatus] = useState(LoadingStatus.IDLE);

  //fetching posts without redux store and thunk actions.
  const onButtonClick = async () => {
    setStatus(LoadingStatus.LOADING);
    setPost(await fetchPost(1));
    setStatus(LoadingStatus.READY);
  }


  const renderCard = () => {
    return <>
      <CardBody>
        <CardTitle tag="h5">{post?.id}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{post?.title}</CardSubtitle>
        <CardText>{post?.body}</CardText>
      </CardBody>
    </>
  }

  return (
    <div>
      <Card className="d-flex align-items-center p-2">
        {(status === LoadingStatus.LOADING) ? spinner() : renderCard()}
        <Button className="col-2" onClick={onButtonClick}>Fetch</Button>
      </Card>
      <input ref={inputRef} type="text"/>
      <button onClick={_ => inputRef.current?.focus()}>Test Ref</button>
    </div>
  );
};

export default About;

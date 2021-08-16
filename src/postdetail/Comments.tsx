/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { commentsSelector, fetchPostComments } from "../slices/CommentsSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { spinner } from "../common/common";

const Comments = () => {
  const { id } = useParams<{ id: string }>();
  const comments = useSelector((state: RootState) =>
    commentsSelector.selectAll(state).filter((value) => value.postId === +id)
  );
  const dispatch = useAppDispatch();
  const commentsLoadingStatus = useSelector(
    (state: RootState) => state.comments.loadingStatus
  );

  useEffect(() => {
    dispatch(fetchPostComments(id));
  }, []);

  const renderComments = () =>
    comments.map((value) => (
      <Card body className="text-left m-2 border-0" color="light">
        <CardBody>
          <CardTitle tag="h6">{value.name}</CardTitle>
          <CardSubtitle>{value.email}</CardSubtitle>
          <CardText>{value.body}</CardText>
        </CardBody>
      </Card>
    ));

  return (
    <div>
      <h4 className="">
      </h4>
      {renderComments()}
    </div>
  );
};

export default Comments;

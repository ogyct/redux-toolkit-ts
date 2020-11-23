import React, {useState} from 'react';
import {deletePost, Post, updatePost} from "./PostsSlice";
import {Button, Card, CardBody, CardText, Input} from "reactstrap";
import {useDispatch} from "react-redux";

interface SinglePostProps {
    post: Post,
}


const SinglePost: React.FC<SinglePostProps> = ({post}) => {
    const [editMode, setEditMode] = useState(false);
    const [currentPost, setCurrentPost] = useState<Post>(post);
    const dispatch = useDispatch();
    const TextEditField = (editMode: boolean, currentPost: Post) => {
        if (editMode) {
            return (
                <>
                    <Input value={currentPost.title}
                           onChange={e => {
                               setCurrentPost(prevState => {
                                   return {...prevState, title: e.target.value}
                               })
                           }}
                    />
                    <Input value={currentPost.text}
                           onChange={e => {
                               setCurrentPost(prevState => {
                                   return {...prevState, text: e.target.value}
                               })
                           }}
                    />
                </>
            )
        } else {
            return (
                <>
                    <CardText tag={"h5"}>{currentPost.title}</CardText>
                    <CardText tag={"p"}>{currentPost.text}</CardText>
                </>
            );
        }
    };
    const editButtonText = editMode ? 'Save' : 'Edit';
    const editButtonColor = editMode ? 'success' : 'info';
    return (
        <Card body outline color="secondary">
            <CardBody>
                {TextEditField(editMode, currentPost)}
                <Button onClick={() => dispatch(deletePost(post.id))} color="danger">Delete{' '}</Button>
                <Button onClick={() => {
                    if (editMode) {
                        dispatch(updatePost(currentPost));
                    }
                    setEditMode(prevState => !prevState);

                }}
                        color={editButtonColor}>{editButtonText} post</Button>
            </CardBody>
        </Card>
    );
};


export default SinglePost;

import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft, faSync } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../store";

const ControlsComponent = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const reload = () => {
    // dispatch(fetchPosts());
  };

  return (
    <div>
      <Button onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faLongArrowAltLeft} size="1x" />
      </Button>{" "}
      <Button onClick={() => reload()} className="">
        <FontAwesomeIcon icon={faSync} size="1x" />
      </Button>
      <br />
    </div>
  );
};

export default ControlsComponent;

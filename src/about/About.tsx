import React from "react";
import { Badge } from "reactstrap";

const About = () => {
  return (
    <div>
      <h1>React playground</h1>
      <p>Welcome to my react playground</p>
      <p>
        Built using
        <Badge>react</Badge>
        <Badge>typescript</Badge>
        <Badge>redux</Badge>
        <Badge>redux toolkit</Badge>
        <Badge>reactstrap</Badge>
      </p>
      <footer>Dmitry Avgustis 2021</footer>
    </div>
  );
};

export default About;

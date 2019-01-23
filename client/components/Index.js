import React, { Component } from "react";
import { Badge } from "react-bootstrap";

import { SampleList } from "./SampleList";

export class Index extends Component {
  constructor(props, context) {
    super(props, context);

    this.onLogIn = this.onLogIn.bind(this);
    this.logout = this.logout.bind(this);
    
    this.state = {
      samples: null
    };
  }

  render() {
    return (
    <>
      <SampleList title={"Нерешенные задачи"} samples={[]} />
      <SampleList title={"Мои задачи"} samples={[]} />
      <SampleList title={"Решенные задачи"} samples={[]} />
    </>
    );
  }
}

import React from "react";
import { storiesOf } from "@storybook/react";
import { Input, Row, Col } from "../src/components";

storiesOf("Input", module).add("基本用法", () => (
  <Row>
    <Col span={6}>
      <Input />
    </Col>
    <Col span={6} offset={2}>
      <Input prefix={"sss"} suffix="aaa" />
    </Col>
  </Row>
));

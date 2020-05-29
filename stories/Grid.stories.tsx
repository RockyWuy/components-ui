import React from "react";
import { storiesOf } from "@storybook/react";
import { Row, Col } from "../src/components/grid";

storiesOf("Row", module).add("基本用法", () => (
  <div>
    <Row gutter={16}>
      <Col span={6} offset={6}>
        <div style={{ background: "red" }}>a</div>
      </Col>
      <Col span={12}>
        <div style={{ background: "blue" }}>a</div>
      </Col>
    </Row>
  </div>
));

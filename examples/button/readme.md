<!--
 * @Author: rockyWu
 * @Date: 2020-05-24 21:41:12
 * @Description: 
 * @LastEditors: rockyWu
 * @LastEditTime: 2020-05-24 21:47:00
--> 
# Button 按钮

按钮的展示

## 引入组件

```jsx
import * as React from "react";
import { Button, Row, Col } from "cp-design";
```

## Demo 代码

```jsx
export default function ButtonDemo() {
  const onClick = () => {};
  return (
    <div>
      <Row style={{ marginBottom: "1rem" }}>
        <Col span={24}>
          <Button onClick={onClick}>default</Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col span={24}>
          <Button disabled>default disabled</Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col span={24}>
          <Button type="primary" onClick={onClick}>
            primary
          </Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col span={24}>
          <Button type="primary" onClick={onClick} disabled>
            primary disabled
          </Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col span={24}>
          <Button onClick={onClick} type="warning">
            warning
          </Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col span={24}>
          <Button onClick={onClick} type="warning" disabled>
            warning disabled
          </Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col span={24}>
          <Button onClick={onClick} loading>
            loading button
          </Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "1rem" }}>
        <Col span={24}>
          <Button>with icon</Button>
        </Col>
      </Row>
    </div>
  );
}
```

## Api

import * as React from "react";
import { ButtonProps } from "./interface";

const defaultProps: ButtonProps = {
  disabled: false,
  loading: false,
  size: "normal",
  prefixCls: "components-ui",
  type: "primary",
};

const Button: React.SFC<ButtonProps> = (props) => {

  return (
    <div>
      <div>name</div>
    </div>
  );
};

export default Button;

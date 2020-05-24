import React from "react";

type buttonType = "warning" | "primary" | "ghost";
type buttonSize = "large" | "normal" | "small";

export interface ButtonProps {
  type: buttonType; // button 的类型 默认 primary
  size: buttonSize; // button 的尺寸 默认 normal
  disabled: boolean; // 默认 false
  loading: boolean; // 默认 false
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  prefixCls: string; // 前缀
  className?: string; // 类名
  style?: object; // 内联样式
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

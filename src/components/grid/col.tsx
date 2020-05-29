import React, { useContext } from "react";
import ClassNames from "classnames";

import RowContext from "./rowContext";

// 栅格占位
type spanType = 0 | 6 | 8 | 12 | 16 | 18 | 24;

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 列属性
   */
  offset?: number; // 栅格左侧的间隔格数，间隔内不可以有栅格
  span?: spanType; // 列宽度，栅格占位数
}

const defaultProps: ColProps = {
  offset: 0,
};

const perfixCls = "c-ui-col";

const getClassNames = ({ span, offset }: ColProps) => {
  return ClassNames(perfixCls, {
    [`${perfixCls}-offset-${offset}`]: !!offset,
    [`${perfixCls}-${span}`]: !!span,
  });
};

const getStyle = ({ style }: ColProps) => {
  const { gutter } = useContext(RowContext);
  return {
    paddingLeft: (gutter as number) / 2,
    paddingRight: (gutter as number) / 2,
    ...style,
  };
};

const Col: React.FC<ColProps> = (props) => {
  const classStr = getClassNames(props);
  const style = getStyle(props);
  const { children } = props;

  return (
    <div className={classStr} style={style}>
      {children}
    </div>
  );
};

Col.defaultProps = defaultProps;

export default Col;

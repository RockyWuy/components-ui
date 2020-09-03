import React from 'react';
import ClassNames from 'classnames';

import RowContext from './rowContext';

// 垂直对齐方式
type alignType = 'top' | 'middle' | 'bottom';

// 水平对齐方式
type justifyType =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between';

// 子元素换行方式
type wrapType = 'wrap' | 'nowrap' | 'wrap-reverse';

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter: number;
  align: alignType;
  justify: justifyType;
  wrap?: wrapType;
}

const defaultProps: RowProps = {
  gutter: 0,
  align: 'top',
  justify: 'start',
};

const prefixCls = 'c-ui-row';

const getClassNames = ({ align, justify, wrap }: RowProps) => {
  return ClassNames(prefixCls, {
    [`${prefixCls}-${align}`]: !!align,
    [`${prefixCls}-${justify}`]: !!justify,

    [`${prefixCls}-nowrap`]: wrap === 'nowrap',
    [`${prefixCls}-wrap`]: wrap === 'wrap',
    [`${prefixCls}-wrap-reverse`]: wrap === 'wrap-reverse',
  });
};

const getStyle = ({ style, gutter }: RowProps) => {
  return {
    marginLeft: gutter / -2,
    marginRight: gutter / -2,
    ...style,
  };
};

// 解决ts 写了 defaultProps 使用仍然需要必填的问题
const Row: React.FC<RowProps> & { defaultProps: Partial<RowProps> } = (
  props
) => {
  const { children, gutter } = props;
  const style = getStyle(props);

  return (
    <RowContext.Provider value={{ gutter }}>
      <div className={getClassNames(props)} style={style}>
        {children}
      </div>
    </RowContext.Provider>
  );
};

Row.defaultProps = defaultProps;

export default Row;

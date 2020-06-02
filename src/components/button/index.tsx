import * as React from 'react';
import ClassNames from 'classnames';

type buttonType = 'warning' | 'primary' | 'ghost';
type buttonSize = 'large' | 'normal' | 'small';

export interface ButtonProps {
  type?: buttonType; // button 的类型 默认 primary
  size?: buttonSize; // button 的尺寸 默认 normal
  disabled?: boolean; // 默认 false
  loading?: boolean; // 默认 false
  prefixCls?: string; // 前缀
  className?: string; // 类名
  style?: object; // 内联样式
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const defaultProps: ButtonProps = {
  disabled: false,
  loading: false,
  size: 'normal',
  type: 'primary',
};

const getClassName = ({
  className,
  loading,
  disabled,
  type,
  size,
  prefixCls,
}: ButtonProps) => {
  return ClassNames(prefixCls, className, {
    [`${prefixCls}-primary`]: type === 'primary',
    [`${prefixCls}-warning`]: type === 'warning',
    [`${prefixCls}-ghost`]: type === 'ghost',

    [`${prefixCls}-small`]: size === 'small',
    [`${prefixCls}-normal`]: size === 'normal',
    [`${prefixCls}-large`]: size === 'large',

    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-diabled`]: disabled,
  });
};

function getPrefix(suffixCls: string, customizePrefixCls?: string) {
  if (customizePrefixCls) return customizePrefixCls;
  const mergePrefixCls = 'c-ui';
  return `${mergePrefixCls}-${suffixCls}`;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { style, disabled, prefixCls: customizePrefixCls, children } = props;
  const { onClick } = props;

  const prefixCls = getPrefix('btn', customizePrefixCls);

  return (
    <div>
      <a
        onClick={disabled ? undefined : onClick}
        className={getClassName({ ...props, prefixCls })}
        style={style}
      >
        {children}
      </a>
    </div>
  );
};

Button.defaultProps = defaultProps;

export default Button;

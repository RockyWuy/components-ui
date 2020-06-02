import React, { useRef, useEffect, useState, HTMLAttributes } from 'react';
import ClassNames from 'classnames';

const compose = (...fns: any) => fns.reduce((f: any, g: any) => (...args: any) => f(g(...args)));

const omit = (obj: any, arr: string[]) =>
  Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {} as any);

type InputType = 'text' | 'number' | 'password' | 'mobile' | 'bankCard';
type OmitProps = 'type' | 'prefix' | 'onChange' | 'value' | 'defaultValue';

// 对 omit 的具体用法可以查看 typescript 的官网关于 picker 和 exclude 的用法，就是集合的概念
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, OmitProps> {
  prefixCls?: string;
  type?: InputType; // input 框类型 默认 text
  value?: string; // 当前值
  defaultValue?: string; // 默认值
  prefix?: React.ReactNode; // 前缀
  suffix?: React.ReactNode; // 后缀
  //   addonBefore?: React.ReactNode | string; // 带标签的 input，设置前置标签
  //   addonAfter?: React.ReactNode | string; // 带标签的 input，设置后置标签
  disabled?: boolean; // 是否禁用输入框
  clear?: boolean; // clear 是否显示清除 默认 false
  getInputRef?: (ele: HTMLInputElement) => void; // 获取元素组件的 ref
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: (value: string) => void; // (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const defaultProps: InputProps = {
  prefixCls: 'c-ui-input',
  type: 'text',
  disabled: false,
  clear: false,
  onChange: () => {},
};

const normalizeValue = (value: string) => {
  if (typeof value == undefined || value === null) {
    return '';
  }
  return value;
};

const formatValue = (value: string, type?: InputType) => {
  let newValue = value;
  switch (type) {
    case 'bankCard':
      newValue = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
      break;
    case 'mobile':
      newValue = value.replace(/\D/g, '').substring(0, 11);
      //   const len = newValue.length;
      newValue = `${newValue.substr(0, 3)} ${newValue.substr(3)}`;
      break;
    case 'text':
    case 'password':
    default:
      break;
  }
  return newValue;
};

const parseValue = ({ type, value }: { type?: InputType; value: string }) => {
  const newValue = value;
  const inputValue = compose((v: string) => formatValue(v, type), normalizeValue)(newValue);
  return inputValue;
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>, { onChange, type }: InputProps) => {
  const value = e.target.value;
  const newValue = parseValue({ type, value });
  !!onChange && onChange(newValue);
};

const getClassName = (props: InputProps, focused: boolean) => {
  let { disabled, prefix, suffix, prefixCls, className } = props;
  return ClassNames(prefixCls, className, {
    [`${prefixCls}-affix-wrapper`]: !!prefix || !!suffix,
    [`${prefixCls}-affix-wrapper-focused`]: focused,
    [`${prefixCls}-disabled`]: disabled,
  });
};

const omitProps = (props: InputProps) => {
  const excludeProps = [
    'prefixCls',
    'onChange',
    'onBlur',
    'type',
    'prefix',
    'suffix',
    'style',
    'clear',
    'className',
    'error',
  ];
  return omit(props, excludeProps);
};

const Input: React.FC<InputProps> = (props) => {
  const _inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const { prefixCls, prefix, suffix, type, style } = props;
  const restProps = omitProps(props);
  useEffect(() => {
    if (props.getInputRef !== undefined && _inputRef.current !== null) {
      props.getInputRef(_inputRef.current);
    }
  }, []);

  const onFocus: React.FocusEventHandler<HTMLInputElement> = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const { onFocus } = props;
    !!onFocus && onFocus(e);
    // _inputRef.current?.focus(e);
    setFocused(true);
  };
  const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    _inputRef.current?.blur();
    setFocused(false);
  };

  return (
    <div className={getClassName(props, focused)}>
      {prefix && <span className={`${prefixCls}-prefix`}>{prefix}</span>}
      <input
        type={type}
        style={style}
        ref={_inputRef}
        onChange={(e) => handleChange(e, props)}
        onFocus={(e) => onFocus(e)}
        onBlur={(e) => onBlur(e)}
        {...restProps}
      />
      {suffix && <span className={`${prefixCls}-suffix`}>{suffix}</span>}
    </div>
  );
};

Input.defaultProps = defaultProps;

export default Input;

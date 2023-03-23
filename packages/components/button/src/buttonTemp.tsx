import React from 'react';
import classNames from 'classnames';
import Group from './button-group';
import { ConfigContext } from '../../config-provider';
import DisabledContext from '../../config-provider/DisabledContext';
import { isUnBorderedButtonType, spaceChildren } from './buttonHelpers';
// import useStyle from './style';

import type { ButtonHTMLType, ButtonShape, ButtonType } from './buttonHelpers';
import type { SizeType } from '../../config-provider/SizeContext'

export interface BaseButtonProps {
  type?: ButtonType;
  icon?: React.ReactNode;
  shape?: ButtonShape;
  size?: SizeType;
  disabled?: boolean;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

// 交叉类型 https://www.5axxw.com/wiki/content/jyzzbg
export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

type CompoundedComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLElement>
> & {
  Group: typeof Group;
  /** @internal */
  __ANT_BUTTON: boolean;
}

type Loading = number | boolean;

// ForwardRefRenderFunction https://juejin.cn/post/6968739546997456926
const InternalButton: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (props, ref) => {
  const {
    loading = false,
    prefixCls: customizePrefixCls,
    type = 'default',
    disabled: customDisabled,
    className,
    children,
    icon,
    // React识别不到DOM元素上的 htmlType 属性，这里我们把它从 rest 中挑出来
    htmlType = 'button',
    ...rest
  } = props;

  const { getPrefixCls, autoInsertSpaceInButton } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  const [innerLoading, setLoading] = React.useState<Loading>(!!loading);
  const buttonRef = (ref as any) || React.createRef<HTMLAnchorElement | HTMLButtonElement>();

  const isNeedInserted = () =>
    React.Children.count(children) === 1 && !icon && !isUnBorderedButtonType(type)

  // const [wrapSSR, hashId] = useStyle(prefixCls);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  }

  const autoInsertSpace = autoInsertSpaceInButton !== false;

  const classes = classNames(
    prefixCls,
    // hashId,
    {

    },
    // compactItemClassnames,
    className
  )

  const iconNode = 
    icon && !innerLoading ? (
      icon
    ) : (
      <div>loading</div>
    );
  
  const kids = 
    children || children === 0
      ? spaceChildren(children, isNeedInserted() && autoInsertSpace)
      : null;

  // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button 
  let buttonNode = (
    <button
      {...(rest as NativeButtonProps)}
      type={htmlType}
      className={classes}
      onClick={handleClick}
      disabled={mergedDisabled}
      ref={buttonRef}
    >
      {kids}
    </button>
  )

  return buttonNode;
}

const Button = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  InternalButton
) as CompoundedComponent;

export default Button;
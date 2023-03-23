import * as React from 'react';
import { AnchorButtonProps, NativeButtonProps } from './buttonTemp';

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (props) => {
  const {
    children
  } = props

  const kids = 
    children || children === 0
      ? children
      : null
  console.log(kids)
  let buttonNode = (
    <button>
      {kids}
    </button>
  );

  return buttonNode;
}

export default Button;
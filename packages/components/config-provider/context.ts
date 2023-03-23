import * as React from 'react';

export const defaultIconPrefixCls = 'designicon';

export interface ConfigConsumerProps {
  iconPrefixCls: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  autoInsertSpaceInButton?: boolean;
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `design-${suffixCls}` : 'design';
}

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  //
  getPrefixCls: defaultGetPrefixCls,
  iconPrefixCls: defaultIconPrefixCls
})
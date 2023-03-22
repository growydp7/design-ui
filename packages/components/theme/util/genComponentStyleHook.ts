import type { UseComponentStyleResult } from '../internal'
import type { ComponentTokenMap } from '../interface';

export type OverrideTokenWithoutDerivative = ComponentTokenMap;
export type OverrideComponent = keyof OverrideTokenWithoutDerivative;

export default function genComponentStyleHook<ComponentName extends OverrideComponent>(
  component: ComponentName
) {
  return (prefixCls: string): UseComponentStyleResult => {
    const [theme, token, hashId] = useToken();

    return [
      useStyleRegister(
        { theme, token, hashId, path: [component, prefixCls, iconPrefixCls] },
        () => {

        }
      )
    ]
  }
}
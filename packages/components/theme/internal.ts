import { genComponentStyleHook } from './util/genComponentStyleHook';

export {
  genComponentStyleHook
};

export function useToken(): [Theme<SeedToken, MapToken>, GlobalToken, string] {

}

export type UseComponentStyleResult = [(node: React.ReactNode) => React.ReactElement, string];
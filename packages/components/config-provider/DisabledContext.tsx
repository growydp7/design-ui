import * as React from 'react';

export type DisabledType = boolean | undefined;

const DisabledContext = React.createContext<DisabledType>(false);

export default DisabledContext;
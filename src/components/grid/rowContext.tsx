
import React, { createContext } from 'react';

export interface RowContextProps {
  gutter?: number;
}

const RowContext: React.Context<RowContextProps> = createContext({});

export default RowContext;
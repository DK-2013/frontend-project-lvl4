import { createContext } from 'react';

const AppContext = createContext({});

export const ContextProvider = AppContext.Provider;

export default AppContext;

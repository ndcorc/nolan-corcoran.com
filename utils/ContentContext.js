import {
  createContext,
  useContext,
} from 'react';

import { data } from './sitedata';

// console.log(data)
const Content = createContext({data});
const useContent = () => useContext(Content);


const ContentProvider = ({ children }) => {

  return (
    <Content.Provider value={data}>
      {children}
    </Content.Provider>)
}

export { ContentProvider, useContent };

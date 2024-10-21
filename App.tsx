import React from 'react';
import Appstack from './src/route/Appstack';
import {UseProvider} from './src/context/Context';
const App = () => {
  return (
    <UseProvider>
      <Appstack />
    </UseProvider>
  );
};

export default App;

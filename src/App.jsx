import React from 'react';

import './components/styles/main.scss';
import {Header} from "./components/Header";
import {Main} from "./components/Main";

function App()  {
    return (
      <div className="app">
          <Header />
          <Main />
      </div>
    );
}

export default App;

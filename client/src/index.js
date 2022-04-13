import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AllUsers from './store/AllUsers';
import UserStore from './store/UserStore';
import Mail from './store/Mial';

export const Context = createContext(null);

ReactDOM.render( 
    <Context.Provider value={{
        user: new UserStore(),
        allUsers: new AllUsers(),
        mail: new Mail()
    }}>
        <App />
    </Context.Provider>,    
  document.getElementById('root')
);


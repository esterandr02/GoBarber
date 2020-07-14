import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CreatGlobalStyle from './styles/global';

import Routes from './routes';

import AppProvider from './hooks';

const App: React.FC = () => (
    <Router>
        <AppProvider>
            <Routes />
        </AppProvider>

        <CreatGlobalStyle />
    </Router>
);

export default App;

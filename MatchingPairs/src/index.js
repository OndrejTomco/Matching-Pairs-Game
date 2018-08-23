import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import Switch from '../node_modules/react-router-dom/Switch';
import NotFound from './components/NotFound';
import SinglePlayerPage from './SinglePlayer/SinglePlayerPage';

const routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={App} exact={true} />
            <Route path="/singleplayer/:name" component={SinglePlayerPage} exact={true} />
            <Route path="/multiplayer" component={App} exact={true} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();

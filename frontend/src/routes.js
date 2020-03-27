import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Registro from './pages/Registro';
import Profile from './pages/Profile';
import NovoCaso from './pages/NovoCaso';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/registro" component={Registro} />

                <Route path="/profile" component={Profile} />

                <Route path="/caso/novo" component={NovoCaso} />
            </Switch>
        </BrowserRouter>
    );
}


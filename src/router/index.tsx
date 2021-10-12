import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "../component/LandingPage/index";
import ParkList from "../component/ParkList/ParkList";
import * as React from "react";
import News from "../component/News/News";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/list" component={ParkList}/>
                <Route exact path="/news" component={News}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;

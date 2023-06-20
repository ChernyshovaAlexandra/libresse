import React, { useEffect } from "react";
import IndexPage from "./IndexPage";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss"
import "./assets/scss/main.scss";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Smoke } from './pages/constants/smoke'

function App() {
    useEffect(() => {
        const smoke = new Smoke();
        smoke.update();
    }, [])
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/" exact>
                        <IndexPage page={'menu'} />
                    </Route>
                    <Route path="/rules">
                        <IndexPage page={'rules'} />
                    </Route>
                    <Route path="/rules_full">
                        <IndexPage page={'rules_full'} />
                    </Route>
                    <Route path="/prizes">
                        <IndexPage page={'prizes'} />
                    </Route>
                    <Route path="/presents">
                        <IndexPage page={'presents'} />
                    </Route>
                    <Route path="/registration">
                        <IndexPage page={'registration'} />
                    </Route>
                    <Route path="/game">
                        <IndexPage page={'game'} />
                    </Route>
                    <Route path="/winners">
                        <IndexPage page={'winners'} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


export default App;
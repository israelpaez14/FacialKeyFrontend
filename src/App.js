import './App.css';
import React from "react";
import LoginScreen from "./components/LoginScreen";
import {BrowserRouter as Router, Route} from "react-router-dom";
import RegisteredPeople from "./components/RegisteredPeople";
import Register from "./components/Register";
import Recognize from "./components/Recognize";

const App = () =>
    (
        <div>
            <Router>
                <Route path="/auth">
                    <LoginScreen/>

                </Route>

                <Route path="/list">
                    <RegisteredPeople/>
                </Route>

                <Route path="/recon">
                    <Register/>
                </Route>

                <Route path="/recognize">
                    <Recognize/>
                </Route>

            </Router>
        </div>


    );


export default App;
import './App.css';
import React from "react";
import LoginScreen from "./components/LoginScreen";
import {BrowserRouter as Router, Route} from "react-router-dom";
import RegisteredPeople from "./components/RegisteredPeople";

const App = () =>
    (

        <Router>


            <Route path="/auth">
                <LoginScreen/>

            </Route>

            <Route path="/list">

                <RegisteredPeople/>
            </Route>

        </Router>
    );


export default App;
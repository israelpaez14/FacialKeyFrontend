import React, {useState} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-spinners/HashLoader";
import {useHistory} from "react-router-dom";


function LoginScreen() {

    /*const get_set_cookies = function (headers) {
        console.log("El error esta aqui");
        const cookies = {}
        for (const [name, values] of headers) {
            if (name === 'set-cookie') {
                for (let cookie of values.split(';')) {
                    let cookie_copy = cookie.replace(" SameSite=Lax,", "");
                    const [key, value] = cookie_copy.split('=')
                    cookies[key] = value
                }
            }
        }
        return cookies;
    };*/
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [alertClass, setAlertClass] = useState('');
    const [loginResult, setLoginResult] = useState(null);
    const [showSearching, setShowSearching] = useState(false);

    const history = useHistory()

    const sendLoginData = () => {
        setShowSearching(true);
        fetch("/login/", {
            credentials: "include",
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": userName,
                "password": password,
            })
        }).then((response) => {
            if (response.status === 200) {
                setAlertClass("alert alert-success");
                setLoginResult("Login successful");
                history.push("/list");
            } else {
                setAlertClass("alert alert-danger");
                setLoginResult("Bad credentials");
            }

            setShowSearching(false);
            return response.json();
        }).catch(() => {
            setShowSearching(false);
            setAlertClass("alert alert-danger");
            setLoginResult("Network Error");
        })

    };

    return (
        <div>
            <div style={showSearching ? styles.loader : {display: "none"}}>
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={800}
                    width={800}
                    timeout={3000}
                    css={{position: "absolute", left: "50%", top: "40vh"}}
                />
            </div>
            <div style={styles.login}>
                <h3>Sign In</h3>

                <div>
                    <div className={alertClass} role="alert" style={{opacity: loginResult === null ? 0 : 1}}>
                        {loginResult}
                    </div>
                </div>


                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter your Username" onChange={(value) => {
                        setUserName(value.target.value);
                    }} value={userName}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                           onChange={(event) => {
                               setPassword(event.target.value);
                           }} onKeyUp={key => {
                        if (key.key === "Enter") {
                            sendLoginData();
                        }
                    }}
                           value={password}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={sendLoginData}>Login</button>
            </div>
        </div>

    );
}


const styles = {
    login: {
        backgroundColor: "white",
        width: "20%",
        height: "50vh",
        position: "absolute",
        top: "25vh"
    },

    loader: {
        position: "absolute",
        width: "100%",
        height: "100vh",
        backgroundColor: "gray",
        left: 0,
        top: 0,
        zIndex: 1,
        opacity: 0.6,


    }

};
export default LoginScreen;


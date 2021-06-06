import React, {useState} from 'react';


function LoginScreen() {


    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const sendLoginData = () => {
        console.log(`Entered username ${userName}`);
        console.log(`Entered password ${password}`);

        fetch("/login/", {
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
            return response.json()
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });


    };

    return (
        <div style={styles.login}>
            <h3>Sign In</h3>
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
                       }}
                       value={password}
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={sendLoginData}>Login</button>
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
    }
};
export default LoginScreen;


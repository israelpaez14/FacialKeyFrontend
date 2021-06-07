import {useEffect, useState} from "react";
import PersonIdentification from "./PersonIdentification";
import {useHistory} from "react-router-dom";
import Navbar from "./Navbar";

function RegisteredPeople() {
    const [data, setData] = useState([]);
    const history = useHistory();

    const getRegisteredPeople = () => {
        fetch("/api/people/", {
            method: "GET",
        }).then(response => {
            if (response.status === 403) {
                history.push("/auth");
            }
            return response;

        }).then(response => response.json()).then(json => {
            console.log(json);
            setData(json);
        });

    };

    useEffect(getRegisteredPeople, []);
    const items = data.map((entry, i) => {
        return <PersonIdentification name={entry.name} key={entry.id} image={entry.photo}/>
    });
    return (

        <div>
            <Navbar/>
            <div style={{margin:"1%"}}>
                <h1>This people is registered for the Facial recognition</h1>
                <div>
                    {items}
                </div>

                <button onClick={() => {
                    fetch("/logout/");
                }
                }>Logout
                </button>
            </div>

        </div>
    );


}


export default RegisteredPeople;

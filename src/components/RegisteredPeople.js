import {useEffect, useState} from "react";
import PersonIdentification from "./PersonIdentification";

function RegisteredPeople() {
    const [data, setData] = useState([]);


    const getRegisteredPeople = () => {
        fetch("/api/people/", {
            method: "GET",
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

            <h1>This people is registered for the Facial recognition</h1>
            <div>
                {items}
            </div>


        </div>);


}


export default RegisteredPeople;

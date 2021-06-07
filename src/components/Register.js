import Navbar from "./Navbar";
import React, {useState} from "react";
import Webcam from "react-webcam";
import Loader from "react-spinners/HashLoader";


function Register() {

    const videoConstraints = {
        facingMode: "user"
    };
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            return imageSrc;
        },
        [webcamRef]
    );

    const [seconds, setSeconds] = useState(10);
    const [name, setName] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [showSearching, setShowSearching] = useState(false);


    const sendImagesToApi = () => {
        setShowSearching(true);

        fetch("/register_person/", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "images": images,
                "name": name,
            })

        }).then((response) => {
            if (response.status === 200) {

                console.log("Registrado con exito")
            } else {

                console.log("Error al registrar")
            }

            setShowSearching(false);
            return response.json();
        }).catch(() => {
            setShowSearching(false);
            console.log("Network error");
        });


    };

    const images = [];
    const startRegistration = () => {
        setDisabled(true);
        let interva = setInterval(() => {
            setSeconds(seconds => {
                images.push(capture());
                if (seconds === 1) {
                    clearInterval(interva);
                    setDisabled(false);
                    sendImagesToApi();
                    return 10;
                }
                return seconds - 1;
            });
        }, 1000)
    };


    return (<div>

        <Navbar/>

        <div style={{margin: "2%"}}>

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
            <div className="row" style={{marginBottom: "4vh"}}>
                <div className="col-md-12">
                    <button className="btn btn-info btn-block">Start webcam</button>
                </div>

            </div>

            <div className="row">
                <div className="col-md-8">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}

                    />

                </div>
                <div className="col-md-3">
                    <input disabled={disabled} type="text" className="form-control" placeholder="Enter the person name"
                           onChange={(event) => {
                               setName(event.target.value);
                           }} value={name}/>

                    <button className="btn btn-warning" onClick={startRegistration}
                            disabled={disabled || name.length === 0}>Register
                    </button>
                    <h1 style={{display: seconds !== 0 && seconds !== 10 ? "block" : "none"}}>Don't Move, We're
                        registering your face</h1>
                    <h1 style={{display: seconds === 0 || seconds === 10 ? "none" : "block"}}>{seconds}</h1>
                </div>
            </div>
        </div>

    </div>)

}

const styles = {


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
export default Register;
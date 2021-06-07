import Navbar from "./Navbar";
import React, {useState} from "react";
import Webcam from "react-webcam";

function Recognize() {
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

    const [name, setName] = useState("");
    const [recognizing, setRecognizing] = useState(false);
    let interval = null;
    const startRecognition = () => {
        console.log("Starting INTERVAL");
        setRecognizing(true);
        interval = window.setInterval(() => {
            if (!recognizing) {
                clearInterval(interval);
            }
            fetch("/recognize_person/", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "image": capture(),
                })

            }).then((response) => {
                if (response.status === 200) {

                } else {
                    console.log("Error al registrar")
                }

                return response.json();
            }).then((json) => {
                console.log(json);
                setName(json.name);
            }).catch(() => {
                console.log("Network error");
            });


        }, 3000);
    }

    const stopRecognition = () => {
        setRecognizing(false);
        setName("");
    }

    return (
        <div>
            <Navbar/>

            <div style={{margin: "2%"}}>

                <div className="row" style={{marginBottom: "4vh"}}>
                    <div className="col-md-12">
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


                    <div className="col-md-4">

                        <button className="btn btn-info btn-block" onClick={startRecognition}
                                style={{display: recognizing ? "none" : "block"}}>Start Recognition
                        </button>
                        <button className="btn btn-danger btn-block" onClick={stopRecognition}
                                style={{display: recognizing ? "block" : "none"}}>Stop Recognition
                        </button>
                        <h1 style={{display: recognizing ? "block" : "none"}}>Recognizing</h1>
                        <h3 style={{
                            color: name !== "Unknown" ? "green" : "red",
                            display: recognizing && name !== "" ? "block" : "none"
                        }}>You
                            Are {name}!</h3>
                    </div>

                </div>
            </div>

        </div>);


}

export default Recognize;
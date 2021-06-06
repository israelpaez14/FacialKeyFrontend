function PersonIdentification(props) {
    return (
        <div className="row">
            <div className="card col-md-12">
                <h5 className="card-header">{props.name}</h5>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <img src={"data:image/jpeg;base64," + props.image} alt={props.name} className="card-img-top"
                         style={{width: "20%"}}/>
                </div>
            </div>
        </div>
    );
}

export default PersonIdentification;
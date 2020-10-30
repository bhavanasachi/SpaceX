const ProgramListItem = (props) => {
    return(
        <div className={props.className}>
            <div className="program-list-item">
                <img src={props.data.links.mission_patch_small} alt={props.data.mission_name} />
                <div>{props.data.mission_name} #{props.data.flight_number}</div>
                <div>Mission Ids:
                    <ul>
                        {props.data.mission_id.map((mission) => {
                            return <li>{mission}</li>;
                        })}
                    </ul>
                </div>
                <div>Launch Year: {props.data.launch_year}</div>
                <div>Successful Launch: {props.data.launch_success? "True" : "False"}</div>
                <div>Successful Landing: {props.data.launch_landing? "True" : "False"}</div>
            </div>
        </div>
        
    );
}

export default ProgramListItem;
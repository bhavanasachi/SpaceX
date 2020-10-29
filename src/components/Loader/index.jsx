import { Spinner } from 'react-bootstrap';

const Loader = (props) => {
    return(
        <Spinner animation="grow" style={props.style} />
    );
}

export default Loader;
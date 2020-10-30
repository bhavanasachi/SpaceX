import React from 'react';

const FilterButton = (props) => {
    return(
        <button className={props.className} onClick={props.onClick}>
            {props.title}
        </button>
    );
}

export default FilterButton;
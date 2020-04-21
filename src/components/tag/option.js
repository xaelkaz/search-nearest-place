import React, { useContext } from 'react'
import Checkbox from "../input/checkbox";
import { store } from "../../hooks/mapProvider";

const Option = props => {
    const { row } = props;
    const {
        handleClick,
        isSelected
    } = useContext(store);

    const isItemSelected = isSelected(row.activity_name);

    return <label>
        <Checkbox
            key={ row.id }
            name={ row.activity_name }
            checked={ isItemSelected }
            onChange={ event => handleClick(event, row.activity_name) }
        />
    </label>
}

export default Option

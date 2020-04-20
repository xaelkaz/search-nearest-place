import React, { useContext } from 'react'
import Checkbox from "../input/checkbox";
import { store } from "../../hooks/mapProvider";

const Option = props => {
    const { row } = props;
    const {
        handleClick,
        isSelected
    } = useContext(store);

    const isItemSelected = isSelected(row.client_db_ref);

    return <label>
        <Checkbox
            key={ row.id }
            name={ row.client_db_ref }
            checked={ isItemSelected }
            onChange={ event => handleClick(event, row.client_db_ref) }
        />
    </label>
}

export default Option

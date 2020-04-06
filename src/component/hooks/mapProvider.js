import React, { createContext, useEffect, useReducer, useState } from "react";
import clientJsonData from "../../data/client"

const initialState = {};
const store = createContext(initialState);
const { Provider, Consumer } = store;

const MapProvider = (props) => {

        const [ result, setResult ] = useState([]);

        async function fetchData(url) {
            return await JSON.parse(JSON.stringify(url));
        }

        useEffect(() => {
            fetchData(clientJsonData).then(result => {
                 setResult(result.details)
            });
        }, []);

        const [ state, dispatch ] = useReducer((state, action) => {
            switch (action.type) {
                case 'action description':
                    const newState = "HOLA";
                    return newState;
                default:
                    throw Error()
            }
        }, initialState);

        return (
            <Provider value={ { state, dispatch, result } }>{ props.children }</Provider>
        )
    }
;
export { store, MapProvider }

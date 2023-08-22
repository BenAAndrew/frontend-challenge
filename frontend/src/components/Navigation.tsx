import React from "react";
import "./Navigation.css";


function Navigation(props: { setIndex: Function, index: number, totalItems: number }) {
    const previousEnabled = props.index > 0;
    const nextEnabled = props.index < props.totalItems - 1;

    return (
        <>
            <button className="button" disabled={!previousEnabled} onClick={() => previousEnabled && props.setIndex(props.index - 1)}>←</button>
            <button className="button" disabled={!nextEnabled} onClick={() => nextEnabled && props.setIndex(props.index + 1)}>→</button>
        </>
    );
}

export default Navigation;

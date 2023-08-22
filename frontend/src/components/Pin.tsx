import React from "react";
import { ReactComponent as PinSVG } from "./pin.svg";
import { Tag } from "../types";

function Pin(props: {tag: Tag, onSelect: Function}) {
    return (
        <div onClick={() => props.onSelect(props.tag)}>
            <PinSVG fill="red" style={{ width: "20px", height: "20px" }} />
        </div>
    );
}

export default Pin;

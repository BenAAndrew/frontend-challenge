import React, { useEffect, useState } from "react";
import { Tag } from "../types";


function TagOverlay(props: { position: { x: number, y: number } | undefined, close: Function, onSubmit: Function, onDelete: Function, tag: Tag | undefined }) {
    const [comment, setComment] = useState("");

    useEffect(() => {
        if(props.tag){
            setComment(props.tag.comment);
        } else {
            setComment("");
        }
    }, [props.tag]);
    
    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setComment("");
        props.onSubmit(comment);
    }

    function handleClose() {
        setComment("");
        props.close();
    }

    return (
        props.position ?
            <div className="w-fit z-10" style={{position: "absolute", marginLeft: `${props.position.x}px`, marginTop: `${props.position.y}px`}}>
                <form className="bg-white shadow-md rounded px-4 py-4 mb-4 flex flex-col items-center" onSubmit={handleSubmit}>
                    <button onClick={() => handleClose()} className="z-20 ml-44 bg-gray-500 hover:bg-gray-700 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline ml-2">
                        x
                    </button>
                    <div className="mb-4">
                        <label className="-mt-5 block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                            Comment 
                        </label>
                        <input onChange={(e) => setComment(e.target.value)} value={comment} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" type="text" placeholder="Comment" required/>
                    </div>
                    <div className="flex items-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                        {props.tag && 
                            <button onClick={() => props.onDelete()} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
                                Delete
                            </button>
                        }
                    </div>
                </form>
            </div>
            : <></>
    );
}

export default TagOverlay;

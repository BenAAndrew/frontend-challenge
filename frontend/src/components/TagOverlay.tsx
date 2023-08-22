import React, { useState } from "react";
import { Tag } from "./ImageViewer";


function TagOverlay(props: { position: { x: number, y: number } | undefined, comment: string, setComment: Function, onSubmit: Function, onDelete: Function, tag: Tag | undefined }) {
    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        props.onSubmit(props.comment);
    }

    return (
        props.position ?
            <div className="w-fit z-10" style={{position: "absolute", marginLeft: `${props.position.x}px`, marginTop: `${props.position.y}px`}}>
                <form className="bg-white shadow-md rounded px-4 py-4 mb-4 flex flex-col items-center" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                            Comment 
                        </label>
                        <input onChange={(e) => props.setComment(e.target.value)} value={props.comment} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" type="text" placeholder="Comment" required/>
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

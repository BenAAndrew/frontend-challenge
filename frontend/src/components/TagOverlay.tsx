import React, { useState } from "react";


function TagOverlay(props: { position: { x: number, y: number } | undefined, onSubmit: Function }) {
    const [comment, setComment] = useState("");

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        props.onSubmit(comment);
    }

    return (
        props.position ?
            <div className="w-fit z-10" style={{position: "absolute", marginLeft: `${props.position.x}px`, marginTop: `${props.position.y}px`}}>
                <form className="bg-white shadow-md rounded px-4 py-4 mb-4 flex flex-col items-center" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                            Comment 
                        </label>
                        <input onChange={(e) => setComment(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" type="text" placeholder="Comment" required/>
                    </div>
                    <div className="flex items-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            : <></>
    );
}

export default TagOverlay;

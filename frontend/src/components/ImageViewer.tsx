import React, { useRef, useState } from "react";
import { TransformWrapper, TransformComponent, KeepScale } from "react-zoom-pan-pinch";
import { ReactComponent as Pin } from "./pin.svg";
import TagOverlay from "./TagOverlay";
import EventHandler from "./EventHandler";


function ActionButton(props: { action: Function; children: string }) {
    return <button onClick={() => props.action()} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 mx-2.5 rounded">{props.children}</button>
}


type Tag = {
    x: number;
    y: number;
    comment: string;
};


function ImageViewer(props: { src: string }) {
    const imageRef = useRef(null);
    const [lastClick, setLastClick] = useState<{ x: number, y: number } | undefined>();
    const [tagPosition, setTagPosition] = useState<{ x: number, y: number } | undefined>();
    const [tagOverlay, setTagOverlay] = useState<{ x: number, y: number } | undefined>();
    const [tags, setTags] = useState<Tag[]>([]);

    const clickHandler = (event: React.MouseEvent) => {
        if (imageRef.current) {
            const { offsetLeft, offsetTop } = imageRef.current;
            const x = event.clientX - offsetLeft;
            const y = event.clientY - offsetTop;
            if (lastClick && lastClick.x === x && lastClick.y === y) {
                console.log(x, y)
                setTagOverlay({ x: event.clientX, y: event.clientY });
                setTagPosition({ x, y });
            }
            setLastClick({ x, y });
        }
    }

    const addTag = (comment: string) => {
        const tag: Tag = {
            x: tagPosition!.x,
            y: tagPosition!.y,
            comment
        };
        setTags([...tags, tag]);
    }

    return (
        <TransformWrapper doubleClick={{ disabled: true }}>
            {({ zoomIn, zoomOut, resetTransform, centerView, ...rest }) => (
                <div>
                    <TagOverlay position={tagOverlay} onSubmit={(comment: string) => addTag(comment)} />
                    <TransformComponent wrapperStyle={{
                        width: "100%",
                        height: "50%",
                        maxWidth: "100%",
                        maxHeight: "calc(100vh - 100px)",
                    }}>
                        <div onClick={(e) => clickHandler(e)}>
                            <EventHandler onChange={() => setTagOverlay(undefined)} />
                            <img ref={imageRef} src={props.src} alt="image to caption" className="mx-auto w-3/5" />
                            {tags.map(({ x, y, comment }, i) => (
                                <div
                                    key={i}
                                    style={{
                                        position: "absolute",
                                        top: `calc(-20px + ${y}px)`,
                                        left: `calc(270px + ${x}px)`,
                                        zIndex: 2,
                                    }}
                                >
                                    <KeepScale>
                                        <Pin fill="red" style={{ width: "20px", height: "20px" }} />
                                    </KeepScale>
                                </div>
                            ))}
                        </div>
                    </TransformComponent>
                    <br />
                    <div className="tools">
                        <ActionButton action={zoomIn}>Zoom In +</ActionButton>
                        <ActionButton action={zoomOut}>Zoom Out -</ActionButton>
                        <ActionButton action={resetTransform}>Reset Zoom</ActionButton>
                        <ActionButton action={centerView}>Center</ActionButton>
                    </div>
                </div>
            )}
        </TransformWrapper>
    );
}

export default ImageViewer;

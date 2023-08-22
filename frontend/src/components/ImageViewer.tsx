import React from "react";
import "./ImageViewer.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


function ImageViewer(props: { src: string }) {
    return (
        <TransformWrapper>
            {({ zoomIn, zoomOut, resetTransform, centerView, ...rest }) => (
                <>
                    <TransformComponent>
                        <img src={props.src} alt="test"/>
                    </TransformComponent>
                    <br/>
                    <div className="tools">
                        <button onClick={() => zoomIn()} className="controlBtn">Zoom In +</button>
                        <button onClick={() => zoomOut()} className="controlBtn">Zoom Out -</button>
                        <button onClick={() => resetTransform()} className="controlBtn">Reset Zoom</button>
                        <button onClick={() => centerView()} className="controlBtn">Center</button>
                    </div>
                </>
            )}
        </TransformWrapper>
    );
}

export default ImageViewer;

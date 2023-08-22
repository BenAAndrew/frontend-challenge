import React, { useEffect, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  KeepScale,
} from "react-zoom-pan-pinch";
import TagOverlay from "./TagOverlay";
import EventHandler from "./EventHandler";
import Pin from "./Pin";
import { Tag } from "../types";

function ActionButton(props: { action: Function; children: string }) {
  return (
    <button
      onClick={() => props.action()}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 mx-2.5 rounded"
    >
      {props.children}
    </button>
  );
}

function ImageViewer(props: {
  src: string;
  tags: Tag[];
  addTag: Function;
  deleteTag: Function;
}) {
  const imageRef = useRef(null);
  const [lastClick, setLastClick] = useState<
    { x: number; y: number } | undefined
  >();
  const [tagPosition, setTagPosition] = useState<
    { x: number; y: number } | undefined
  >();
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>();
  const [imageSize, setImageSize] = useState<
    | { offsetLeft: number; offsetTop: number; width: number; height: number }
    | undefined
  >();

  const handleResize = () => {
    const { offsetLeft, offsetTop, width, height } = imageRef.current!;
    setImageSize({ offsetLeft, offsetTop, width, height });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  const clickHandler = (event: React.MouseEvent) => {
    if (imageRef.current) {
      const x = event.clientX;
      const y = event.clientY;
      if (lastClick && lastClick.x === x && lastClick.y === y) {
        setSelectedTag(undefined);
        setTagPosition({ x, y });
      }
      setLastClick({ x, y });
    }
  };

  const getTagAbsolutePosition = (tag: Tag) => {
    const x = Math.round(tag.x * imageSize!.width + imageSize!.offsetLeft);
    const y = Math.round(tag.y * imageSize!.height + imageSize!.offsetTop);
    return { x, y };
  };

  const addTag = (comment: string) => {
    const { offsetLeft, offsetTop, width, height } = imageRef.current!;
    const x = (tagPosition!.x - offsetLeft) / width;
    const y = (tagPosition!.y - offsetTop) / height;
    const tag: Tag = { x, y, comment };
    props.addTag(tag);
    setTagPosition(undefined);
  };

  const deleteTag = () => {
    props.deleteTag(selectedTag);
    setSelectedTag(undefined);
    setTagPosition(undefined);
  };

  const selectTag = (tag: Tag) => {
    const { x, y } = getTagAbsolutePosition(tag);
    setSelectedTag(tag);
    setTagPosition({ x, y });
  };

  return (
    <TransformWrapper doubleClick={{ disabled: true }}>
      {({ zoomIn, zoomOut, resetTransform, centerView, ...rest }) => (
        <div>
          <TagOverlay
            position={tagPosition}
            close={() => setTagPosition(undefined)}
            onSubmit={(comment: string) => addTag(comment)}
            tag={selectedTag}
            onDelete={() => deleteTag()}
          />
          <TransformComponent
            wrapperStyle={{
              width: "100%",
              height: "50%",
              maxWidth: "100%",
              maxHeight: "calc(100vh - 100px)",
            }}
          >
            <div onClick={(e) => clickHandler(e)}>
              <EventHandler onChange={() => setTagPosition(undefined)} />
              <img
                ref={imageRef}
                src={props.src}
                onLoad={() => handleResize()}
                alt="image to caption"
                className="mx-auto w-3/5"
              />
              {props.tags.map((tag, i) => {
                const { x, y } = getTagAbsolutePosition(tag);
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: `calc(-20px + ${y}px)`,
                      left: `calc(-8px + ${x}px)`,
                      zIndex: 2,
                    }}
                  >
                    <KeepScale>
                      <Pin tag={tag} onSelect={selectTag} />
                    </KeepScale>
                  </div>
                );
              })}
              Double click on the image to add a tag
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

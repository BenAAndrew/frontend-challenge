import React, { useState } from "react";
import { useTransformEffect } from "react-zoom-pan-pinch";
import { isEqual } from "lodash";

function EventHandler(props: { onChange: Function }) {
  const [previousState, setPreviousState] = useState({});

  useTransformEffect(({ state: { scale, positionX, positionY }, instance }) => {
    if (!isEqual({ scale, positionX, positionY }, previousState)) {
      setPreviousState({ scale, positionX, positionY });
      props.onChange();
    }
  });

  return <></>;
}

export default EventHandler;

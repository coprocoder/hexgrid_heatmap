import React, { useRef, useState } from "react";
import "./index.scss";

// Resizable Component
const ResizableBox = ({ children, width, height, posX, posY }) => {
  const node = useRef();
  const resizerSize = { width: 5, height: 5 };
  const [boxWidth, setBoxWidth] = useState(width);
  const [boxHeight, setBoxHeight] = useState(height);

  const resizing = ({ x, y }) => {
    x &&
      setBoxWidth(x - posX - node.current.offsetLeft + resizerSize.width / 2);
    y &&
      setBoxHeight(y - posY - node.current.offsetTop + resizerSize.height / 2);
  };

  const style = {
    height: boxHeight,
    width: boxWidth,
  };
  return (
    <div ref={node} className="resizable" style={style}>
      {children}
      <ResizerVertical
        fResizing={resizing}
        resizerWidth={boxWidth}
        resizerHeight={resizerSize.height}
      />
      <ResizerHorizontal
        fResizing={resizing}
        resizerWidth={resizerSize.width}
        resizerHeight={boxHeight}
      />
      <ResizerBox
        fResizing={resizing}
        resizerWidth={resizerSize.width}
        resizerHeight={resizerSize.height}
      />
    </div>
  );
};

const ResizerVertical = ({ fResizing, resizerWidth, resizerHeight }) => {
  const onMouseDown = (e) => {
    console.log("onMouseDown");
    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("mouseup", onMouseUp, false);
  };

  const onMouseMove = (e) => {
    fResizing({ y: e.clientY });
  };

  const onMouseUp = (e) => {
    window.removeEventListener("mousemove", onMouseMove, false);
    window.removeEventListener("mouseup", onMouseUp, false);
  };

  const style = {
    width: resizerWidth,
    height: resizerHeight,
  };
  return (
    <div className="resizerY" style={style} onMouseDown={onMouseDown}></div>
  );
};

const ResizerHorizontal = ({ fResizing, resizerWidth, resizerHeight }) => {
  const onMouseDown = (e) => {
    console.log("onMouseDown");
    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("mouseup", onMouseUp, false);
  };

  const onMouseMove = (e) => {
    fResizing({ x: e.clientX });
  };

  const onMouseUp = (e) => {
    console.log("onMouseUp");
    window.removeEventListener("mousemove", onMouseMove, false);
    window.removeEventListener("mouseup", onMouseUp, false);
  };

  let style = {
    width: resizerWidth,
    height: resizerHeight,
  };

  return (
    <div className="resizerX" style={style} onMouseDown={onMouseDown}></div>
  );
};

const ResizerBox = ({ fResizing, resizerWidth, resizerHeight }) => {
  const onMouseDown = (e) => {
    console.log("onMouseDown");
    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("mouseup", onMouseUp, false);
  };

  const onMouseMove = (e) => {
    fResizing({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = (e) => {
    console.log("onMouseUp");
    window.removeEventListener("mousemove", onMouseMove, false);
    window.removeEventListener("mouseup", onMouseUp, false);
  };

  const style = {
    width: resizerWidth,
    height: resizerHeight,
  };
  return (
    <div className="resizer" style={style} onMouseDown={onMouseDown}></div>
  );
};

export default ResizableBox;

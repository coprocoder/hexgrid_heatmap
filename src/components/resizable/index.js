import React, { useRef, useState } from "react";
import "./index.scss";

// Resizable Component
const ResizableBox = ({ children, posX, posY }) => {
  const node = useRef();
  const resizerSize = { width: 15, height: 15 };
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  const resizing = ({ x, y }) => {
    x && setWidth(x - posX - node.current.offsetLeft + resizerSize.width / 2);
    y && setHeight(y - posY - node.current.offsetTop + resizerSize.height / 2);
  };

  const style = {
    height: height,
    width: width,
  };
  return (
    <div ref={node} className="resizable" style={style}>
      {children}
      <ResizerVertical
        fResizing={resizing}
        resizerWidth={width}
        resizerHeight={resizerSize.height}
      />
      <ResizerHorizontal
        fResizing={resizing}
        resizerWidth={resizerSize.width}
        resizerHeight={height}
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
    console.log({ e });
    fResizing({ y: e.clientY });
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
    console.log({ e });
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

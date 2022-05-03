import React, { useState } from "react";
import Draggable from "react-draggable"; // Both at the same time

import ResizableBox from "../components/resizable";

import "./index.scss";

const NavigationMenu = () => {
  const defaultX = 50;
  const defaultY = 50;
  const [posX, setPosX] = useState(defaultX);
  const [posY, setPosY] = useState(defaultY);

  const menuOverlayWidth = window.screen.width * 0.8 - defaultX;
  const menuOverlayHeight = window.screen.height * 0.8 - defaultY;

  return (
    <Draggable
      handle=".menuHeader"
      defaultPosition={{ x: defaultX, y: defaultY }}
      scale={1}
      onStop={(event, element) => {
        setPosX(element.lastX);
        setPosY(element.lastY);
      }}
    >
      <div className="menuOverlay" style={{ position: "absolute" }}>
        <ResizableBox
          width={menuOverlayWidth > 300 ? 300 : menuOverlayWidth}
          height={menuOverlayHeight > 400 ? 400 : menuOverlayHeight}
          posX={posX}
          posY={posY}
        >
          <Menu />
        </ResizableBox>
      </div>
    </Draggable>
  );
};
export default NavigationMenu;

const Menu = () => {
  const getFormSelector = () => {
    const options = ["test1", "test2", "test3"];
    return (
      <div className="formSelector">
        Name:
        <select>
          {options.map((x) => (
            <option>{x}</option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="menuWrapper">
      <div className="menuHeader">Меню</div>
      <div
        className="menuBody"
        onClick={() => {
          console.log("drag click");
        }}
      >
        <form className="form">
          {getFormSelector()}
          {getFormSelector()}
          {getFormSelector()}
          {getFormSelector()}
          {getFormSelector()}
          {getFormSelector()}
          {getFormSelector()}
          {getFormSelector()}
          {getFormSelector()}
          {getFormSelector()}
          {getFormSelector()}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import Draggable from "react-draggable"; // Both at the same time

import ResizableBox from "../components/resizable";
import urls from "../urls.json";
import { map } from "../map";

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
          {options.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
      </div>
    );
  };

  const getGeoJSON = async (form) => {
    console.log({ form });
    let url = urls.heatmap;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        property_one: 1,
        property_two: 2,
      }),
    };
    let response = await fetch(url, options);
    let hexGridGeoJSON = await response.json();
    return hexGridGeoJSON;
  };

  const updateHexGrid = async (e, form) => {
    e.preventDefault();
    const gridJSON = await getGeoJSON(form);
    map.getSource("hexgridSource").setData(gridJSON);
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
        <form className="form" onSubmit={updateHexGrid}>
          {getFormSelector()}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

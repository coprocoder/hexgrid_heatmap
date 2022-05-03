import React, { useState } from "react";
import Draggable from "react-draggable"; // Both at the same time
import ResizableBox from "../components/resizable";

import "./index.scss";

const NavigationMenu = () => {
  const defaultX = 50;
  const defaultY = 50;
  const [posX, setPosX] = useState(defaultX);
  const [posY, setPosY] = useState(defaultY);

  return (
    <Draggable
      handle=".menuHeader"
      defaultPosition={{ x: defaultX, y: defaultY }}
      scale={1}
      onStop={(event, element) => {
        console.log("drag stop event", event);
        console.log("drag stop element", element);
        setPosX(element.lastX);
        setPosY(element.lastY);
      }}
    >
      <div className="menuWrapper" style={{ position: "absolute" }}>
        <ResizableBox posX={posX} posY={posY}>
          <div className="menuHeader">Drag from here</div>
          <Menu />
        </ResizableBox>
      </div>
    </Draggable>
  );
};
export default NavigationMenu;

const Menu = () => {
  return (
    <div
      className="menuBody"
      onClick={() => {
        console.log("drag click");
      }}
    >
      <form className="form">
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <label>
          {" "}
          Name: <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

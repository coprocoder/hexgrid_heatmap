import React, { useEffect, useState } from "react";
import Draggable from "react-draggable"; // Both at the same time

import ResizableBox from "../components/resizable";
import urls from "../urls.json";
import { map } from "../map";

import Selector from "./selector";
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
      bounds={".map-container"}
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
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSetelctedCat] = useState(null);
  const [selectedSubCat, setSetelctedSubCat] = useState(null);
  const [isWait, setWait] = useState();

  useEffect(() => {
    updateCategories();
  }, []);

  const updateCategories = async () => {
    const url = urls.categories;
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({}),
    };
    let response = await fetch(url, options);
    const categories = await response.json();
    console.log({ categories });
    setCategories(categories);
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
        cat: selectedCat.label,
        subCat: selectedSubCat.label,
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

  const getSubcategory = () => {
    let subCat = [];
    if (selectedCat) {
      const curCatData = categories.filter(
        (x) => x.category == selectedCat.label
      )[0];
      const curSubcatData = curCatData.subcategories;
      if (curSubcatData) subCat = curSubcatData.map((x) => x.subcategory);
    }
    return subCat;
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
          <Selector
            id="cat"
            placeholder={"Выберите категорию"}
            options={categories && categories.map((x) => x.category)}
            selected={selectedCat}
            onSelect={(cat) => {
              console.log({ cat });
              setSetelctedCat(cat);
              setSetelctedSubCat(null);
            }}
          />
          <Selector
            id="subcat"
            isDisabled={!selectedCat}
            placeholder={"Выберите подкатегорию"}
            options={getSubcategory()}
            selected={selectedSubCat}
            onSelect={(subCat) => {
              console.log({ subCat });
              setSetelctedSubCat(subCat);
            }}
          />
          <input type="submit" value="Отправить" id="formActionBtn" />
        </form>
      </div>
    </div>
  );
};

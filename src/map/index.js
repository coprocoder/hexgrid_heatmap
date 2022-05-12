import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import "./map.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoibnpheWNldiIsImEiOiJjazhudXZnaGMwMmIzM2RvM2N3MDl2dmNwIn0.cNCktRFle2xX3PsaB-l0MQ";

export var map;

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  const addLayerHexGrid = () => {
    map.addSource("hexgridSource", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });
    map.addLayer({
      id: "hexgridLayer",
      type: "fill",
      source: "hexgridSource",
      paint: {
        "fill-color": {
          property: "value",
          stops: [
            [0, "green"],
            [0.5, "yellow"],
            [1, "red"],
          ],
        },
        "fill-outline-color": "#3bb2d0",
        "fill-opacity": 0.3,
      },
    });
  };

  const mapPopupHandler = () => {
    let areaPopup = null;
    map.on("mousemove", "hexgridLayer", (e) => {
      map.getCanvas().style.cursor = "pointer";
      const value = e.features[0].properties.value.toFixed(2);
      if (!!areaPopup) areaPopup.remove();
      areaPopup = new mapboxgl.Popup({
        closeOnClick: false,
        closeButton: false,
      })
        .setLngLat(e.lngLat)
        .setHTML(value)
        .addTo(map);
    });
    map.on("mouseleave", "hexgridLayer", (e) => {
      map.getCanvas().style.cursor = "";
      if (!!areaPopup) areaPopup.remove();
    });
  };

  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [92.862572, 56.010563],
      zoom: 12,
      maxPitch: 0,
      dragRotate: false,
      preserveDrawingBuffer: true,
      maxZoom: 16,
      minZoom: 10,
      maxBounds: [
        [92.013069, 55.723443],
        [93.919682, 56.573527],
      ],
    });

    map.on("load", function () {
      addLayerHexGrid();
      mapPopupHandler();

      map.addControl(
        new mapboxgl.NavigationControl({
          showCompass: true,
          showZoom: true,
        }),
        "bottom-right"
      );
    });

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapComponent;

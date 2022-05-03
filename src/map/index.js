import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import "./map.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoibnpheWNldiIsImEiOiJjazhudXZnaGMwMmIzM2RvM2N3MDl2dmNwIn0.cNCktRFle2xX3PsaB-l0MQ";

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/mapbox/streets-v11",
      center: [92.852572, 56.010563], // starting position [lng, lat]

      zoom: 12, // starting zoom
      maxPitch: 0,
      dragRotate: false,
      preserveDrawingBuffer: true,
      maxZoom: 22,
      maxBounds: [
        [92.013069, 55.623443],
        [93.919682, 56.673527],
      ],
    });

    map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
      }),
      "bottom-right"
    );
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapComponent;

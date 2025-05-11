// @ts-nocheck

"use client";

import {
  GoogleMap as GoolgeMapComponent,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { Loader, Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "250px",
};

interface Position {
  lng: number;
  lat: number;
}

interface GoogleMapProps {
  onMarkerPositionChange: (position: Position) => void;
  defaultMarkerPostion?: Position | null;
  className?: any;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  onMarkerPositionChange,
  defaultMarkerPostion,
  className,
}) => {
  const t = useTranslations("");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDRymdCLWxCwLHFnwv36iieKAMjiwk8sdc",
    // googleMapsApiKey: 'AIzaSyBGrfzw_Qd0p8vzu4ySc5aAZRalrH1EgEY',
    libraries: ["places"],
  });

  // const [map, setMap] = useState(/** @type google.maps.Map */ null);
  const [markerPosition, setMarkerPosition] = useState(defaultMarkerPostion);
  const searchInputRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (defaultMarkerPostion) {
      setMarkerPosition(defaultMarkerPostion);
    }
  }, [defaultMarkerPostion]);
  const getPlaceCoordinates = () => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: searchInputRef.current.value },
      function (results, status) {
        if (status === "OK") {
          const location = results[0].geometry.location;
          const newPosition = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setMarkerPosition(newPosition);
          onMarkerPositionChange(newPosition);
        } else {
          // alert('Geocode was not successful for the following reason: ' + status);
        }
      }
    );
  };

  if (!isLoaded) {
    return <Skeleton className="h-full"></Skeleton>;
  }

  return (
    <div className={`w-full h-full relative z-0  ${className}`}>
      <div className="relative w-full h-full min-h-[250px]">
        <div className="absolute top-12 xs:top-0 right-0 z-[2] rounded-xl m-3 flex gap-4 items-center">
          <Autocomplete
            onPlaceChanged={getPlaceCoordinates}
            className=" w-full "
          >
            <Input
              placeholder={t("search_location")}
              className="border bg-white md:min-w-[300px]"
              ref={searchInputRef}
            />
          </Autocomplete>
        </div>
        <GoolgeMapComponent
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: false,
          }}
          mapContainerStyle={containerStyle}
          zoom={14}
          center={markerPosition}
          onClick={(e) => {
            const newPosition = {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            };
            setMarkerPosition(newPosition);
            onMarkerPositionChange(newPosition);
          }}
          onLoad={(map) => {}}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <Marker
            onClick={() =>
              router.push(
                `https://maps.google.com/?q=${markerPosition.lat},${markerPosition.lng}`
              )
            }
            draggable
            onDragEnd={(e) => {
              const newPosition = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              };
              setMarkerPosition(newPosition);
              onMarkerPositionChange(newPosition);
            }}
            position={markerPosition}
          />
        </GoolgeMapComponent>
      </div>
    </div>
  );
};

export default GoogleMap;

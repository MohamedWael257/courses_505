import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import GoogleMap from "./GoogleMap";

import { MapPinOff } from "lucide-react";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

interface GoogleMapFormFieldProps {
  latitude?: number;
  longitude?: number;
}

const GoogleMapFormField = ({
  latitude,
  longitude,
}: GoogleMapFormFieldProps) => {
  const t = useTranslations("Index");
  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();

  const [loadingUserPosition, setLoadingUserPosition] = useState(false);
  const formValues = getValues();
  const [error, setError] = useState("");
  const lat = watch("lat");
  const lng = watch("lng");
  useEffect(() => {
    if (longitude && latitude) {
      setValue("lat", latitude);
      setValue("lng", longitude);
    }
  }, [longitude, latitude]);
  const handleGetUserLocation = () => {
    setLoadingUserPosition(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Successfully got the location
            const { latitude: lat, longitude: lng } = position.coords;
            setValue("lat", lat);
            setValue("lng", lng);
            setLoadingUserPosition(false);
          },
          (error) => {
            // cairo location
            setValue("lat", 30.0444196);
            setValue("lng", 31.2357116);
            // Handle errors
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setError("User denied the request for geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
              default:
                setError("An unknown error occurred.");
            }
            setLoadingUserPosition(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (!longitude && !latitude) {
      handleGetUserLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longitude, latitude]);
  return (
    <div>
      <div className="h-96 rounded-2xl overflow-hidden bg-[#F5F5F5]">
        {lat && lng ? (
          <GoogleMap
            defaultMarkerPostion={
              formValues.lat && formValues.lng
                ? {
                    lat: Number(formValues.lat),
                    lng: Number(formValues.lng),
                  }
                : null
            }
            onMarkerPositionChange={(position) => {
              setValue("lng", position.lng);
              setValue("lat", position.lat);
            }}
          />
        ) : (
          <div className="w-full h-full grid place-content-center gap-5 p-8">
            <MapPinOff size={150} className="mx-auto" />
            <p className="text-center">
              {t(
                "In order to add a new address, you must activate the location selection"
              )}
            </p>
            {error && <p className="text-error">{error}</p>}
            <Button
              className="rounded-full pb-1"
              type="button"
              //@ts-ignore
              loading={loadingUserPosition}
              onClick={handleGetUserLocation}
            >
              {t("Set location")}
            </Button>
          </div>
        )}
      </div>
      {(errors.lat || errors.lng) && (
        <p className="text-error">{t("this_field_is_required")}</p>
      )}
    </div>
  );
};

export default GoogleMapFormField;

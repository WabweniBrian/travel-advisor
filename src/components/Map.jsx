import { Box, Paper, Rating, Typography, useMediaQuery } from "@mui/material";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { BiMapPin } from "react-icons/bi";

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
}) => {
  const isDesktop = useMediaQuery("(min-width: 600px");

  return (
    <Box sx={{ height: { xs: "100vh", md: "100%" }, width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <Box
            sx={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              "&:hover": { zIndex: 2 },
            }}
            lat={Number(place?.latitude)}
            lng={Number(place?.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <BiMapPin color="red" size={30} />
            ) : (
              <Paper
                elevation={3}
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100px",
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  {place?.name}
                </Typography>
                <img
                  src={
                    place?.photo?.images?.large?.url ||
                    "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place?.name}
                  style={{ cursor: "pointer" }}
                />
                <Rating size="small" value={Number(place?.rating)} readOnly />
              </Paper>
            )}
          </Box>
        ))}
      </GoogleMapReact>
    </Box>
  );
};

export default Map;

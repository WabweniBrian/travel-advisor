import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Box, InputBase, Toolbar, Typography } from "@mui/material";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";

const Header = ({ setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChange = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
    console.log(lat, lng);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#404bb0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ display: { xs: "none", sm: "block" } }}>
          Travel Advisor
        </Typography>
        <Box display="flex" alignItems="center" gap={6}>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChange}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                background: "rgba(255, 255, 255, 0.2)",
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: 10,
                }}
              >
                <BiSearchAlt2 color="inherit" style={{ opacity: "0.6" }} />
              </Box>
              <InputBase
                placeholder="Search.."
                sx={{
                  px: 5,
                  py: "5px",
                  width: "100%",
                  color: "inherit",
                }}
              />
            </Box>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

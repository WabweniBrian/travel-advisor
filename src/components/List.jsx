/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
} from "@mui/material";
import { createRef, useState } from "react";
import PlaceDetails from "./PlaceDetails";
import { useEffect } from "react";

const List = ({
  places,
  childClicked,
  type,
  setType,
  rating,
  setRating,
  isLoading,
}) => {
  const [elfRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elfRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  return (
    <Box sx={{ padding: "25px" }}>
      <Typography variant="h4">
        Restaurants, Hostels & Attractions around you
      </Typography>
      {isLoading ? (
        <Box
          sx={{
            height: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <>
          <FormControl
            variant="standard"
            sx={{
              margin: 3,
              minWidth: 120,
              marginBottom: "30px",
            }}
          >
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            sx={{
              margin: 3,
              minWidth: 120,
              marginBottom: "30px",
            }}
          >
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid
            container
            spacing={3}
            sx={{
              height: "75vh",
              overflow: "auto",
            }}
          >
            {places?.map((place, i) => (
              <Grid ref={elfRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elfRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default List;

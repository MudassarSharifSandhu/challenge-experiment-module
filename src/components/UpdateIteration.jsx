import React from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  styled,
} from "@mui/material";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "gray",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "gray",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    "&::placeholder": {
      color: "gray",
      opacity: 1,
    },
  },
});

const CustomButton = styled(Button)(({ theme, active }) => ({
  borderColor: active ? "green" : "gray",
  color: active ? "green" : "gray",
  "&:hover": {
    borderColor: active ? "green" : "gray",
  },
  "&.MuiButton-outlined": {
    borderColor: active ? "green" : "gray",
  },
  "&.MuiButton-contained": {
    backgroundColor: active ? "green" : theme.palette.primary.main,
    color: active ? "gray" : "gray",
  },
}));

const UpdateIteration = ({
  updateIterationData,
  activeIteration,
  setActiveIteration,
  removeIteration,
  handleDoneClick,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          backgroundColor: "#1a1a1a",
          margin: "10px 6px",
          padding: "10px 20px",
          borderRadius: "6px",
        }}
      >
        <Box sx={{ mt: "15px" }}>
          <Typography>EM-{updateIterationData.id}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "start",
            gap: "10px",
          }}
        >
          <CssTextField
            fullWidth
            value={activeIteration}
            placeholder="Iteration Title"
            onChange={(e) => {
              e.target.value.length <= 35 && setActiveIteration(e.target.value);
            }}
          />
          <Box sx={{ gap: "10px", display: "flex" }}>
            <CustomButton
              variant="outlined"
              active={activeIteration.length >= 0 && activeIteration.length <= 10}
              onClick={() => {}}
            >
              SHORT
            </CustomButton>
            <CustomButton
              variant="outlined"
              active={activeIteration.length >= 11 && activeIteration.length <= 20}
              onClick={() => {}}
            >
              MEDIUM LENGTH
            </CustomButton>
          </Box>
          <CustomButton
            variant="outlined"
            active={activeIteration.length >= 21 && activeIteration.length <= 35}
            onClick={() => {}}
          >
            VERY VERY VERY LONG (UP TO 35 CHAR)
          </CustomButton>
          <Divider
            sx={{
              color: "#8080802d",
              my: "10px",
              borderColor: "#8080802d",
              borderWidth: "1px",
            }}
          />
          <Box sx={{ justifyContent: "end", display: "flex" }}>
            <Button
              variant="text"
              sx={{ color: "gray" }}
              onClick={() => removeIteration(updateIterationData.id)}
            >
              REMOVE
            </Button>
            <Button variant="text" sx={{ color: "white" }} onClick={handleDoneClick}>
              DONE
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdateIteration;

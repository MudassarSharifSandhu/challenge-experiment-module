import React from "react";
import {
  Button,
} from "@mui/material";

const AddExperimentCardButton = ({
  handleAddExperiment,
}) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#474747",
          alignSelf: "center",
          padding: "12px 18px",
          margin: "6px",
          fontSize: 20,
          fontWeight: 500,
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "black",
            color: "white",
          },
        }}
        onClick={() => {
          handleAddExperiment();
        }}
      >
        Add Experiment Module
      </Button>
    </>
  );
};

export default AddExperimentCardButton;

import React, { useState, useCallback } from "react";
import ExperimentCard from "../components/ExperimentCard";
import { Box } from "@mui/material";
import AddExperimentCardButton from "../components/AddExperimentButton";

export const ExperimentModule = () => {
  const [items, setItems] = useState([]);

  const toggleLock = useCallback((id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, is_locked: !item.is_locked } : item
      )
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const updateExpermint = useCallback(
    (id, experimentData, is_reset = false) => {
      setItems((prevItems) => [
        ...prevItems.map((item) =>
          item.id === id
            ? is_reset
              ? { ...experimentData, iterations: [] }
              : experimentData
            : item
        ),
      ]);
    },
    []
  );

  const handleAddExperiment = () => {
    const newExperiment = {
      id: items.length + 1,
      title: "Experiment Module",
      is_locked: false,
      iterations: [],
    };
    setItems((prevItems) => [...prevItems, newExperiment]);
  };

  return (
    <Box
    data-testid="experiment-module" 
      sx={{
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <AddExperimentCardButton
        handleAddExperiment={handleAddExperiment}
      />
      {items.map((item) => (
        <ExperimentCard
          key={item.id}
          item={item}
          toggleLock={toggleLock}
          removeItem={removeItem}
          updateExpermint={updateExpermint}
        />
      ))}
    </Box>
  );
};

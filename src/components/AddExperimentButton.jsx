import React from 'react'
import { Button } from '@mui/material'

const AddExperimentCardButton = ({ handleAddExperiment }) => {
  return (
    <Button
      variant='contained'
      sx={{
        backgroundColor: '#474747',
        alignSelf: 'center',
        padding: '12px 18px',
        margin: '10px 0px',
        color: 'white',
        borderRadius: '12px',
        '&:hover': {
          backgroundColor: '#303030'
        }
      }}
      onClick={handleAddExperiment}
    >
      Add Experiment Module
    </Button>
  )
}

export default AddExperimentCardButton

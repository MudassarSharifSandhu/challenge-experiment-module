import React from 'react'
import { Box, Button } from '@mui/material'

const ExperimentMenu = ({
  item,
  toggleLock,
  handleReset,
  setAddIteration,
  addIteration,
  addNewIteration
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 5,
          justifyContent: 'end'
        }}
      >
        {addIteration
          ? (
            <Box>
              <Button
                sx={{
                  color: '#b8b6b6',
                  width: '70px'
                }}
                variant='text'
                onClick={() => {
                  setAddIteration(false)
                }}
              >
                CANCEL
              </Button>
              <Button
                sx={{ color: 'white' }}
                variant='text'
                onClick={addNewIteration}
              >
                DONE
              </Button>
            </Box>
            )
          : (
            <>
              <Button
                role='button'
                sx={{
                  color: '#b8b6b6',
                  width: '70px'
                }}
                variant='text'
                onClick={() => toggleLock(item.id)}
              >
                {item.is_locked ? 'UNLOCK' : 'LOCK'}
              </Button>
              <Button
                role='button'
                sx={{ color: '#b8b6b6' }}
                variant='text'
                onClick={handleReset}
                disabled={item.is_locked}
              >
                RESET
              </Button>
              <Button
                role='button'
                onClick={() => {
                  setAddIteration(true)
                }}
                sx={{ color: 'white' }}
                variant='text'
                disabled={item.is_locked}
              >
                + ADD ITERATION
              </Button>
            </>
            )}
      </Box>
    </>
  )
}

export default ExperimentMenu

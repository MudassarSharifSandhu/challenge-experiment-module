import * as React from 'react'
import { Box, Typography } from '@mui/material'

export const IterationCard = React.memo(({ iteration, isNew = false, handleClickIteration, itemData }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#1a1a1a',
          height: 40,
          color: isNew ? '#757575' : 'white',
          margin: '10px 6px',
          padding: '0 20px',
          borderRadius: '6px',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: !isNew && !itemData.is_locked ? 'pointer' : 'default'
        }}
        onClick={() => {
          !isNew && !itemData.is_locked && handleClickIteration(iteration)
        }}
      >
        <Box sx={{
          display: 'flex',
          gap: '25px'
        }}
        >
          <Typography sx={{ color: 'gray' }}>
            EM-{iteration.id}
          </Typography>
          <Typography>
            {iteration.title}
          </Typography>
        </Box>
        {!isNew && (
          <Box sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}
          >
            <Typography sx={{ color: 'gray' }}>
              Selection
            </Typography>
            <Box
              style={{
                backgroundColor: '#02cf02',
                width: '10px',
                height: '10px',
                borderRadius: '50%'
              }}
            />
          </Box>
        )}
      </Box>
    </>
  )
})

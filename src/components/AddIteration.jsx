import React from 'react'
import { Box, TextField, Typography, styled } from '@mui/material'

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'gray'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent'
    },
    '&:hover fieldset': {
      borderColor: 'transparent'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent'
    }
  },
  '& .MuiInputBase-root': {
    color: 'white',
    fontSize: 20
  },
  '& .MuiInputBase-input': {
    '&::placeholder': {
      color: 'gray',
      opacity: 1
    }
  }
})

const AddIteration = ({
  isNew = false,
  iteration,
  newIteration,
  setNewIteration,
  handleGenerate
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#1a1a1a',
          color: isNew ? '#757575' : 'white',
          margin: '10px 6px',
          borderRadius: '6px',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        <Typography sx={{
          color: 'gray',
          width: '60px',
          ml: '20px',
          fontSize: 20
        }}
        >
          EM-{iteration.id}
        </Typography>

        <CssTextField
          fullWidth
          placeholder='Adding Iteration...'
          variant='outlined'
          autoComplete='off'
          value={newIteration}
          onChange={(e) => {
            setNewIteration(e.target.value)
          }}
          inputProps={{ maxLength: 35 }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#1a1a1a',
          color: isNew ? '#757575' : 'white',
          margin: '10px 6px',
          borderRadius: '6px',
          gap: '10px',
          minHeight: 40
        }}
      >
        <Typography
          sx={{
            color: 'gray',
            display: 'block',
            width: '88%',
            textAlign: 'start',
            padding: '10px 20px',
            fontWeight: 500,
            fontSize: 20
          }}
        >
          To Add new iteration, start typing a prompt or{' '}
          <Box
            component='span'
            sx={{
              color: 'inherit',
              fontWeight: 'inherit',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={() => {
              handleGenerate(iteration)
            }}
          >
            generate
          </Box>{' '}
          one.
        </Typography>
      </Box>
    </>
  )
}

export default AddIteration

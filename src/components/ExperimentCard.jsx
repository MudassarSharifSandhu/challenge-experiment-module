import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { IterationCard } from './IterationCard'
import { BsUnlockFill } from 'react-icons/bs'
import { IoLockClosed } from 'react-icons/io5'
import { Typography } from '@mui/material'
import ExperimentMenu from './ExperimentMenu'
import UpdateIteration from './UpdateIteration'
import AddIteration from './AddIteration'

export default function ExperimentCard ({
  item,
  toggleLock,
  updateExperiment
}) {
  const [checked, setChecked] = useState(false)
  const [newIteration, setNewIteration] = useState('')
  const [addIteration, setAddIteration] = useState(false)
  const [updateIterationData, setUpdateIterationData] = useState({})
  const [activeIterationId, setActiveIterationId] = useState(null)
  const [activeIteration, setActiveIteration] = useState(
    updateIterationData?.title
  )

  const handleReset = () => {
    updateExperiment(item.id, { ...item, iterations: [] })
  }

  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  const getNextId = (currentItem) => {
    if (currentItem.iterations.length > 0) {
      return currentItem.iterations[currentItem.iterations.length - 1]?.id + 1
    }
    return 1
  }

  const addNewIteration = () => {
    updateExperiment(item.id, {
      ...item,
      iterations: [
        ...item.iterations,
        {
          id: getNextId(item),
          title: newIteration
        }
      ]
    })
    setNewIteration('')
    setAddIteration(false)
  }

  const handleGenerate = (iteration) => {
    const generatedTitle = `Adding Iteration ${iteration.id}`
    updateExperiment(item.id, {
      ...item,
      iterations: [
        ...item.iterations,
        {
          id: getNextId(item),
          title: generatedTitle
        }
      ]
    })
    setNewIteration('')
    setAddIteration(false)
  }

  const handleClickIteration = (clickedIteration) => {
    if (item.is_locked) return
    setAddIteration(false)
    setActiveIterationId(clickedIteration.id)
    setUpdateIterationData(clickedIteration)
    setActiveIteration(clickedIteration.title)
  }

  const updateIterationTitle = (id, newTitle) => {
    const updatedIterations = item.iterations.map((iteration) =>
      iteration.id === id ? { ...iteration, title: newTitle } : iteration
    )
    updateExperiment(item.id, { ...item, iterations: updatedIterations })
    setUpdateIterationData({})
    setActiveIterationId(null)
  }

  const removeIteration = (id) => {
    const updatedIterations = item.iterations.filter(
      (iteration) => iteration.id !== id
    )
    updateExperiment(item.id, { ...item, iterations: updatedIterations })
    setUpdateIterationData({})
    setActiveIterationId(null)
  }

  const handleDoneClick = (e) => {
    e.preventDefault()
    updateIterationTitle(updateIterationData.id, activeIteration)
    setActiveIterationId(null)
  }

  return (
    <Box
      sx={{
        color: 'white',
        width: '500px',
        alignSelf: 'center',
        margin: '6px',
        backgroundColor: '#474747',
        borderRadius: '12px'
      }}
    >
      <Collapse in={checked} collapsedSize={85}>
        <Box
          sx={{
            color: 'white',
            padding: '20px'
          }}
        >
          <Box
            onClick={handleChange}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              margin: '0px 5px 15px',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 50,
              color:
                item.is_locked || item.iterations.length === 0
                  ? '#6e6e6e'
                  : 'white'
            }}
          >
            <Typography sx={{ fontSize: 25, fontWeight: 500 }}>
              {item.title}
            </Typography>
            <Box>
              {item.iterations.length === 0
                ? (
                    ''
                  )
                : item.is_locked
                  ? (
                    <IoLockClosed style={{}} size={22} />
                    )
                  : (
                    <BsUnlockFill size={22} />
                    )}
            </Box>
          </Box>
          <Box>
            <Box>
              {item?.iterations.map((iteration) => (
                <React.Fragment key={iteration.id}>
                  {activeIterationId !== iteration.id && (
                    <IterationCard
                      iteration={iteration}
                      handleClickIteration={handleClickIteration}
                      itemData={item}
                    />
                  )}
                  {activeIterationId === iteration.id && (
                    <UpdateIteration
                      updateIterationData={updateIterationData}
                      activeIteration={activeIteration}
                      setActiveIteration={setActiveIteration}
                      updateIterationTitle={updateIterationTitle}
                      removeIteration={removeIteration}
                      handleDoneClick={handleDoneClick}
                    />
                  )}
                </React.Fragment>
              ))}
              {addIteration && (
                <AddIteration
                  newIteration={newIteration}
                  setNewIteration={setNewIteration}
                  handleGenerate={handleGenerate}
                  iteration={{
                    title: 'Adding Iteration...',
                    id: getNextId(item)
                  }}
                />
              )}
              {!addIteration && item.iterations.length === 0 && (
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '10px 6px',
                    fontSize: 20,
                    fontWeight: 500
                  }}
                >
                  There is no iteration
                </Typography>
              )}
            </Box>
            <ExperimentMenu
              item={item}
              toggleLock={toggleLock}
              handleReset={handleReset}
              setAddIteration={setAddIteration}
              addIteration={addIteration}
              addNewIteration={addNewIteration}
            />
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

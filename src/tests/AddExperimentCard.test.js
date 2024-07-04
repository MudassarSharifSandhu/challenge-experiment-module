// eslint-disable-next-line no-redeclare
/* global test, expect */

import React from 'react'
import { render, screen } from '@testing-library/react'
import AddExperimentCardButton from '../components/AddExperimentButton'

test('renders add experiment module button', () => {
  render(<AddExperimentCardButton />)
  const addButton = screen.getByRole('button', { name: /Add Experiment Module/i })
  expect(addButton).toBeInTheDocument()
})

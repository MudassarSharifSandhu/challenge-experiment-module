// eslint-disable-next-line no-redeclare
/* global test, expect */

import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders add experiment module Component', () => {
  render(<App />)
  const buttonElement = screen.getByText(/Add Experiment Module/i)
  expect(buttonElement).toBeInTheDocument()
})

// src/tests/ExperimentModule.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExperimentModule } from '../pages/ExperimentModule';
import ExperimentCard from '../components/ExperimentCard';

const renderExperimentCard = (item, updateExpermint, toggleLock) => {
  render(<ExperimentCard item={item} updateExpermint={updateExpermint} toggleLock={toggleLock} />);
};

const mockItem = {
  id: 1,
  title: 'Experiment Title',
  iterations: [
    { id: 1, title: 'Iteration 1' },
    { id: 2, title: 'Iteration 2' }
  ],
  is_locked: false,
};

test('renders experiment modules', () => {
  render(<ExperimentModule />);
  const experimentModule = screen.getByTestId('experiment-module');
  expect(experimentModule).toBeInTheDocument();
});

test('adds a new experiment', () => {
  render(<ExperimentModule />);
  const addButton = screen.getByRole('button', { name: /Add Experiment Module/i });
  
  fireEvent.click(addButton);
  
  const newExperimentCard = screen.getByText('Experiment Module');
  expect(newExperimentCard).toBeInTheDocument();
});

test('generates an iteration', () => {
  const updateExpermintMock = jest.fn();

  renderExperimentCard(mockItem, updateExpermintMock, () => {});

  const addIterationButton = screen.getByRole('button', { name: '+ ADD ITERATION' });
  fireEvent.click(addIterationButton);
  const generateLink = screen.getByText('generate');
  fireEvent.click(generateLink);

  expect(updateExpermintMock).toHaveBeenCalledWith(mockItem.id, {
    ...mockItem,
    iterations: [
      ...mockItem.iterations,
      {
        id: 3,
        title: 'Adding Iteration 3',
      },
    ],
  });
});

test('updates an iteration title', () => {
  const updateExpermintMock = jest.fn();

  renderExperimentCard(mockItem, updateExpermintMock, () => {});

  fireEvent.click(screen.getByText(mockItem.title));

  const iterationToUpdate = screen.getByText('Iteration 1');
  fireEvent.click(iterationToUpdate);

  const iterationTitleInput = screen.getByPlaceholderText('Iteration Title');
  fireEvent.change(iterationTitleInput, { target: { value: 'Updated Iteration 1 Title' } });

  fireEvent.click(screen.getByText('DONE'));

  expect(updateExpermintMock).toHaveBeenCalledWith(mockItem.id, {
    ...mockItem,
    iterations: [{ id: 1, title: 'Updated Iteration 1 Title' }, { id: 2, title: 'Iteration 2' }],
  });
});

test('locks an experiment iteration', () => {
  const toggleLockMock = jest.fn();

  renderExperimentCard(mockItem, () => {}, toggleLockMock);

  const lockButton = screen.getByRole('button', { name: /LOCK/i });
  fireEvent.click(lockButton);

  expect(toggleLockMock).toHaveBeenCalledWith(mockItem.id);
});

test('unlocks an experiment iteration', () => {
  const toggleLockMock = jest.fn();
  const lockedMockItem = { ...mockItem, is_locked: true };

  renderExperimentCard(lockedMockItem, () => {}, toggleLockMock);

  const unlockButton = screen.getByRole('button', { name: /UNLOCK/i });
  fireEvent.click(unlockButton);

  expect(toggleLockMock).toHaveBeenCalledWith(lockedMockItem.id);
});

test('resets an experiment', () => {
  const updateExpermintMock = jest.fn();

  renderExperimentCard(mockItem, updateExpermintMock, () => {});

  const resetButton = screen.getByRole('button', { name: /RESET/i });
  fireEvent.click(resetButton);

  expect(updateExpermintMock).toHaveBeenCalledWith(mockItem.id, {
    ...mockItem,
    iterations: [],
  });
});

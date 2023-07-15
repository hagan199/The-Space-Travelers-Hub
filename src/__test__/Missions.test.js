import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Missions from '../components/Missions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Missions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      missions: {
        missions: [],
        isLoading: false,
        error: undefined,
      },
    });
  });

  test('MISSIONS TEST 1: renders loading message when missions are loading', () => {
    store = mockStore({
      missions: {
        missions: [],
        isLoading: true,
        error: undefined,
      },
    });
    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
    expect(screen.getByText('Missions are loading...')).toBeInTheDocument();
  });

  test('MISSIONS TEST 2: renders error message when there is an error', () => {
    store = mockStore({
      missions: {
        missions: [],
        isLoading: false,
        error: 'Something went wrong',
      },
    });
    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
    expect(screen.getByText('Something went wrong...!')).toBeInTheDocument();
  });

  test('MISSIONS TEST 3: renders list of missions', () => {
    store = mockStore({
      missions: {
        missions: [
          { mission_id: '1', mission_name: 'Mission 1', description: 'Description' },
          { mission_id: '2', mission_name: 'Mission 2', description: 'Description' },
        ],
        isLoading: false,
        error: undefined,
      },
    });
    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
    expect(screen.getByText('Mission 1')).toBeInTheDocument();
    expect(screen.getByText('Mission 2')).toBeInTheDocument();
  });
});

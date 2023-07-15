import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Rockets from '../components/Rockets';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Rockets', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      rockets: {
        rockets: [],
        isLoading: false,
        error: undefined,
      },
    });
  });

  test('ROCKETS TEST 1: renders loading message when rockets are loading', () => {
    store = mockStore({
      rockets: {
        rockets: [],
        isLoading: true,
        error: undefined,
      },
    });
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );
    expect(screen.getByText('Rockets are loading...')).toBeInTheDocument();
  });

  test('ROCKETS TEST 2: renders error message when there is an error', () => {
    store = mockStore({
      rockets: {
        rockets: [],
        isLoading: false,
        error: 'Something went wrong',
      },
    });
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );
    expect(screen.getByText('Something went wrong...!')).toBeInTheDocument();
  });

  test('ROCKETS TEST 3: renders list of rockets', () => {
    store = mockStore({
      rockets: {
        rockets: [
          {
            id: '1', name: 'Falcon 1', description: 'Description', flickr_images: ['https://image.jpg'],
          },
          {
            id: '2', name: 'Falcon Heavy', description: 'Description', flickr_images: ['https://image.jpg'],
          },
        ],
        isLoading: false,
        error: undefined,
      },
    });
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );
    expect(screen.getByText('Falcon 1')).toBeInTheDocument();
    expect(screen.getByText('Falcon Heavy')).toBeInTheDocument();
  });
});

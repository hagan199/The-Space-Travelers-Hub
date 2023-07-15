import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RocketCard from '../components/RocketCard';

const mockStore = configureStore([]);

describe('RocketCard', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  const rocket = {
    id: '1',
    name: 'Falcon 1',
    description: 'Description',
    flickr_images: ['https://image.jpg'],
  };

  test('ROCKETCARD TEST 1: renders rocket information', () => {
    render(
      <Provider store={store}>
        <RocketCard rocket={rocket} />
      </Provider>,
    );
    expect(screen.getByText('Falcon 1')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  test('ROCKETCARD TEST 2: renders "Reserved" message when rocket is reserved', () => {
    render(
      <Provider store={store}>
        <RocketCard rocket={{ ...rocket, reserved: true }} />
      </Provider>,
    );
    expect(screen.getByText('Reserved')).toBeInTheDocument();
  });

  test('ROCKETCARD TEST 3: renders "Reserve Rocket" button when rocket is not reserved', () => {
    render(
      <Provider store={store}>
        <RocketCard rocket={rocket} />
      </Provider>,
    );
    expect(screen.getByText('Reserve Rocket')).toBeInTheDocument();
  });

  test('ROCKETCARD TEST 4: renders "Cancel Reservation" button when rocket is reserved', () => {
    render(
      <Provider store={store}>
        <RocketCard rocket={{ ...rocket, reserved: true }} />
      </Provider>,
    );
    expect(screen.getByText('Cancel Reservation')).toBeInTheDocument();
  });
});

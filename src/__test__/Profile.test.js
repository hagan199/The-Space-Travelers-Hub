import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Profile from '../components/Profile';

const mockStore = configureStore([]);

describe('Profile', () => {
  test('PROFILE TEST 1: renders My Missions and My Rockets headings', () => {
    const store = mockStore({
      rockets: { rockets: [] },
      missions: { missions: [] },
    });

    render(
      <Provider store={store}>
        <Profile />
      </Provider>,
    );

    const missionsHeadingElement = screen.getByText(/My Missions/i);
    expect(missionsHeadingElement).toBeInTheDocument();

    const rocketsHeadingElement = screen.getByText(/My Rockets/i);
    expect(rocketsHeadingElement).toBeInTheDocument();
  });

  test('PROFILE TEST 2: displays the correct number of reserved missions and rockets', () => {
    const store = mockStore({
      rockets: {
        rockets: [
          { id: 1, name: 'Rocket 1', reserved: true },
          { id: 2, name: 'Rocket 2', reserved: false },
          { id: 3, name: 'Rocket 3', reserved: true },
        ],
      },
      missions: {
        missions: [
          { mission_id: 1, mission_name: 'Mission 1', reserved: true },
          { mission_id: 2, mission_name: 'Mission 2', reserved: false },
          { mission_id: 3, mission_name: 'Mission 3', reserved: true },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Profile />
      </Provider>,
    );

    const missionsAndRocketListElements = screen.getAllByRole('listitem');
    expect(missionsAndRocketListElements).toHaveLength(4);
  });

  test('PROFILE TEST 3: displays the correct mission and rocket names', () => {
    const store = mockStore({
      rockets: {
        rockets: [
          { id: 1, name: 'Rocket 1', reserved: true },
          { id: 2, name: 'Rocket 2', reserved: false },
          { id: 3, name: 'Rocket 3', reserved: true },
        ],
      },
      missions: {
        missions: [
          { mission_id: 1, mission_name: 'Mission 1', reserved: true },
          { mission_id: 2, mission_name: 'Mission 2', reserved: false },
          { mission_id: 3, mission_name: 'Mission 3', reserved: true },
        ],
      },
    });

    render(
      <Provider store={store}>
        <Profile />
      </Provider>,
    );

    const rocket1Element = screen.getByText(/Rocket 1/i);
    expect(rocket1Element).toBeInTheDocument();

    const rocket3Element = screen.getByText(/Rocket 3/i);
    expect(rocket3Element).toBeInTheDocument();

    const mission1Element = screen.getByText(/Mission 1/i);
    expect(mission1Element).toBeInTheDocument();

    const mission3Element = screen.getByText(/Mission 3/i);
    expect(mission3Element).toBeInTheDocument();
  });
});

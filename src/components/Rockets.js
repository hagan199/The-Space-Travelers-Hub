import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/features/rockets/rocketsSlice';
import RocketCard from './RocketCard';
import '../style/rockets.css';

function Rockets() {
  const { rockets, isLoading, error } = useSelector((storeState) => storeState.rockets);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch rockets only if the rockets array is empty
    if (rockets.length === 0) {
      dispatch(fetchRockets());
    }
  }, [rockets, dispatch]);

  if (isLoading) {
    // Render loading state if rockets are still loading
    return <div>Rockets are loading...</div>;
  }

  if (error) {
    // Render error message if there was an error fetching rockets
    return <div>Something went wrong....!</div>;
  }

  return (
    <div className="rockets-list">
      <ul>
        {rockets.map((rocket) => (
          <li key={rocket.id}>
            <RocketCard rocket={rocket} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rockets;

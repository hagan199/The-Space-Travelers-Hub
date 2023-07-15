import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions, reserveMission, leaveMission } from '../redux/features/missions/missionsSlice';
import '../style/missions.css';

function Missions() {
  const { missions, isLoading, error } = useSelector((storeState) => storeState.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (missions.length === 0) {
      dispatch(fetchMissions());
    }
  }, [missions, dispatch]);

  if (isLoading) { return (<div>Missions are loading...</div>); }
  if (error) { return (<div>Something went wrong...!</div>); }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">Mission</th>
            <th scope="col" className="wider">Description</th>
            <th scope="col">Status</th>
            <th scope="col" className="emt">.</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id}>
              <th scope="row">{mission.mission_name}</th>
              <td className="wider">{mission.description}</td>
              <td>
                {mission.reserved ? <span className="member yes">Active Member</span>
                  : <span className="member no">NOT A MEMBER</span>}
              </td>
              <td>
                {mission.reserved ? <button type="button" className="red" onClick={() => { dispatch(leaveMission(mission.mission_id)); }}>Leave Mission</button> : <button type="button" onClick={() => { dispatch(reserveMission(mission.mission_id)); }}>Join Mission</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Missions;

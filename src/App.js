import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Missions from './components/Missions';
import Rockets from './components/Rockets';
import Profile from './components/Profile';

function App() {
  return (
    <div className="parent-container">
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Rockets />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

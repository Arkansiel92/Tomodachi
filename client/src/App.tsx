import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import {socket, socketContext} from './context/socket';
import Room from './pages/Room';
import Invitation from './pages/Invitation';
import Jerk from './pages/Jerk';
import Agent from './pages/Agent';
import Wich from './pages/Wich';

function App() {

  if (navigator.userAgent.match(/mobile/i)) {
    window.orientation.toFixed();
  }

  return (
    <div>
      <socketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path=":id" element={<Room/>}/>
            <Route path=':id/AgentTrouble' element={<Agent/>}/>
            <Route path=':id/WichOfUs' element={<Wich/>}/>
            <Route path="invite/:id" element={<Invitation/>}/>
            <Route path="jerk" element={<Jerk/>}/>
          </Routes>
        </BrowserRouter>
      </socketContext.Provider>
    </div>
  )
}

export default App;

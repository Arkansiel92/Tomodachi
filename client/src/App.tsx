import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import {socket, socketContext} from './context/socket';
import Room from './pages/Room';
import Invitation from './pages/Invitation';
import Jerk from './pages/Jerk';
import Game from './pages/Game';

function App() {
  return (
    <div>
      <socketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path=":id" element={<Room/>}/>
            <Route path=':id/game' element={<Game/>}/>
            <Route path="invite/:id" element={<Invitation/>}/>
            <Route path="jerk" element={<Jerk/>}/>
          </Routes>
        </BrowserRouter>
      </socketContext.Provider>
    </div>
  )
}

export default App;

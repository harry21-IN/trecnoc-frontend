import React from 'react'
import {Routes,Route,useNavigate} from 'react-router-dom';
import Landing  from './components/Landing';
import Home from './components/Home';
import Explore from './components/Explore';
import EventDetailLanding from './components/EventDetailLanding';
import customAlert from './components/CustomAlert';

const App = () => {
    return (
        <Routes>
          <Route path="/landing" element={<Landing/>}/>
          <Route path="/event-detail/:eventId" element={<EventDetailLanding/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/*" element={<Home/>}/>
        </Routes>
    )
}
export default App
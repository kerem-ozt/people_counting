import React from 'react';
import { AppContainer } from './App.style';
import Navbar from './Navbar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Lutfenlutfen from './Lutfenlutfen';

const App = () => {
  return (
    <AppContainer>
      <Navbar />
      <div className='webcam_container'>
        <span className='webcam_title'>
          Webcam Goruntuleniyor...
          <CameraAltIcon />
        </span>
        <div className='webcam'>
          <Lutfenlutfen />
        </div>
        <div className='webcam_buttons'>
          <button className='run'>Algilayiciyi calistir</button>
          <button className='save_data'>Veri Kaydini Baslat</button>
        </div>
      </div>
    </AppContainer>
  );
};

export default App;

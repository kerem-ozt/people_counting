import React from 'react';
import { AppContainer } from './App.style';
import Navbar from './Navbar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Lutfenlutfen from './Lutfenlutfen';
import axios from 'axios';

const App = () => {
  
  const [runDetectorMessage, setRunDetectorMessage] = React.useState('');

  const runDetector = async () => {
    const token = sessionStorage.getItem('token');
    console.log(token);
    await axios.get('http://localhost:4000/counter/run', {
      headers: {
        token: `${token}`,
      },
      withCredentials: false,
    }).then((res) => {
      if (res.type) {
        setRunDetectorMessage('Detector is running');
      } else {
        setRunDetectorMessage('Detector is running');
      }
    });
  };

  const [saveDataMessage, setSaveDataMessage] = React.useState('');

  const runDetectorAndSaveData = async () => {
    await axios.get('http://localhost:4000/counter/runandsave').then((res) => {
      if (res.type) {
        setSaveDataMessage('Detector is running');
      }
      else {
        setSaveDataMessage('Detector is not running');
      }
    });
  };
  
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
          <button onClick={runDetector} className='run'>Algilayiciyi calistir</button>
          <button onClick={runDetectorAndSaveData} className='save_data'>Veri Kaydini Baslat</button>
        </div>
        <div>
          <p>
            {runDetectorMessage ? runDetectorMessage : ''}
            </p>
            <p>
            {saveDataMessage ? saveDataMessage : ''}
              </p> 
          </div>
      </div>
    </AppContainer>
  );
};

export default App;
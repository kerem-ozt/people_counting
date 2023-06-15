import React from 'react';
import { AppContainer } from './App.style';
import Navbar from './Navbar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Lutfenlutfen from './Lutfenlutfen';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

const App = () => {
  
  const [runDetectorMessage, setRunDetectorMessage] = React.useState('');

  const runDetector = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      alert('Algılayıcıyı kullanmak için giriş yapmanız gerekmektedir.');
      return;
    }

    await axios.get('http://localhost:4000/counter/run', {
      headers: {
        token: `${token}`,
      },
      withCredentials: false,
    }).then((res) => {
      if (res.data.type) {
        setRunDetectorMessage('Algılayıcı Çalışıyor');
      } else {
        setRunDetectorMessage('Algılayıcı Çalıştırılamıyor');
      }
    }).finally(() => {
      reloadPage();
    });
  };

  const [saveDataMessage, setSaveDataMessage] = React.useState('');

  const runDetectorAndSaveData = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      alert('Algılayıcıyı kullanmak için giriş yapmanız gerekmektedir.');
      return;
    }

    await axios.get('http://localhost:4000/counter/runandsave', {
      headers: {
        token: `${token}`,
      },
      withCredentials: false,
    }).then((res) => {
      if (res.data.type) {
        setSaveDataMessage('Algılayıcı Çalışıyor ve Veri Kaydediliyor');
      } else {
        setSaveDataMessage('Algılayıcı Çalıştırılamıyor');
      }
      }).finally(() => {
        reloadPage();
      });
  };

  const stopDetector = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      alert('Algılayıcıyı kullanmak için giriş yapmanız gerekmektedir.');
      return;
    }

    await axios.get('http://localhost:4000/counter/deletesession', {
      headers: {
        token: `${token}`,
      },
      withCredentials: false,
    }).then((res) => {
      if (res.data.type) {
        setRunDetectorMessage('Algılayıcı Durduruldu');
      } else {
        setRunDetectorMessage('Algılayıcı Durdurulamadı');
      }
    });
  };

  const reloadPage = () => {
    // delay 1000ms
    setTimeout(() => {
      window.location.reload(); // Reload the page
    }, 1000);
    // window.location.reload(); // Reload the page
  };
  
  return (
    <AppContainer>
      <Navbar />
      <div className='webcam_container'>
        <span className='webcam_title'>
          Webcam Görüntüleniyor...
          <CameraAltIcon />
        </span>
        <div className='webcam'>
          <Lutfenlutfen />
        </div>
        <div className='webcam_buttons'>
          <button onClick={runDetector} className='run'>Algılayıcıyı Çalıştır</button>
          <button onClick={runDetectorAndSaveData} className='save_data'>Veri Kaydını Başlat</button>
          <button onClick={stopDetector} className='save_data'>Durdur</button>
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

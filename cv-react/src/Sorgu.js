import React from 'react';
import Navbar from './Navbar';
import { SorguContainer } from './App.style';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { type } from 'os';

const Sorgu = () => {
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [data, setData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);

  const fetchData = async () => {
    const res = await axios
      .post('http://localhost:4000/counter/getAllWithParam', {
        date: date,
        time: time,
      })
      .then((res) => {
        setData(res.data.data);
        setAllData([]);
      });
  };

  const fetchAllData = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      alert('Sorgu yapmak için giriş yapmanız gerekmektedir.');
      return;
    }

    const res = await axios.post('http://localhost:4000/counter/getAllWithParam', {
      headers: {
        token: `${token}`,
      },
      withCredentials: false,
    }).then((res) => {
        var result = Object.keys(res.data.data).map((key) => [key, res.data.data[key]]);
        const jsonString = JSON.stringify(res.data.data, null, 2);
        setAllData(jsonString);
        setData([]);
      });
  };

  return (
    <SorguContainer>
      <Navbar />

      <div className='filter'>
        <input
          type='text'
          placeholder='Tarih'
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Saat'
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <button onClick={fetchData}>
          <SearchIcon />
        </button>
        <button onClick={fetchAllData} className='fetch_all'>Hepsini Getir</button>
      </div>
      <div className='content'>
      {data.map((item, index) => (
      <div className="card" key={index}>
        {item[0] && typeof item[0] === 'object' ? (
          <div className="bounding_box">
            <h3>Bounding Boxes:</h3>
            <p>x: {item[0].bounding[0]}</p>
            <p>y: {item[0].bounding[1]}</p>
            <p>width: {item[0].bounding[2]}</p>
            <p>height: {item[0].bounding[3]}</p>
            <br />
            <h3>ClassId:</h3>
            <p>{item[0].classId}</p>
            <br />
            <h3>Probability:</h3>
            <p>{item[0].probability}</p>
          </div>
        ) : (
          <h3>{item[0]}</h3>
        )}
        <br />
        {item[1] && <h3>{item[1]}</h3>}
      </div>
    ))}
    {allData && typeof allData !== 'w' && (
        <div className="card">
          <h1>Bütün Veriler</h1>
          <p>{allData}</p>
          {/* {Array.isArray(allData) && allData.map((item, index) => (
            <p key={index}>{item}</p>
          ))} */}
        </div>
      )}
      </div>
    </SorguContainer>
  );
};

export default Sorgu;
import React from 'react';
import Navbar from './Navbar';
import { SorguContainer } from './App.style';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const dummyData = {
  type: true,
  data: [
    {
      0: {
        bounding: {
          0: 11.385665893554688,
          1: 92.38800048828125,
          2: 388.6678009033203,
          3: 542.8994750976562,
        },
        classId: 0,
        probability: 0.6661915183067322,
      },
      1: 'detected people nums: 1',
    },
    {
      0: {
        bounding: {
          0: 8.926666259765625,
          1: 97.9910888671875,
          2: 381.62347412109375,
          3: 537.5987548828125,
        },
        classId: 0,
        probability: 0.5846643447875977,
      },
      1: 'detected people nums: 1',
    },
    {
      0: 'detected people nums: 0',
    },
    {
      0: 'detected people nums: 0',
    },
  ],
};
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
    const res = await axios
      .post('http://localhost:4000/counter/getAllWithParam')
      .then((res) => {
        const data = JSON.stringify(res.data.data);
        console.log(typeof(data));
        setAllData(data);
        setData([]);
      });
  };

  // console.log(allData);
  return (
    <SorguContainer>
      <Navbar />

      <div className='filter'>
        <input
          type='text'
          placeholder='Date'
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Time'
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <button onClick={fetchData}>
          <SearchIcon />
        </button>
        <button onClick={fetchAllData} className='fetch_all'>Fetch All</button>
      </div>
      <div className='content'>
      {data.map((item, index) => (
      <div className="card" key={index}>
        {item[0] && typeof item[0] === 'object' ? (
          <div className="bounding_box">
            <p>bounding box</p>
            <p>x: {item[0].bounding[0]}</p>
            <p>y: {item[0].bounding[1]}</p>
            <p>width: {item[0].bounding[2]}</p>
            <p>height: {item[0].bounding[3]}</p>
            <p>classId: {item[0].classId}</p>
            <p>probability: {item[0].probability}</p>
          </div>
        ) : (
          <p>{item[0]}</p>
        )}
        {item[1] && <p>{item[1]}</p>}
      </div>
    ))}
    <h1>All Data</h1>
    {allData && typeof allData === 'string' ? (
      <div className="card">
        <p>{allData}</p>
      </div>
    ) : (
      <p>yarrami ye</p>
    )}
        {/* {data.length === 0(<p>no data to show</p>)}
        {data.length !== 0 ? (
          <>
            {data.map((item, index) => {
              return (
                <div className='card' key={index}>
                  {item[0] && typeof item[0] === 'object' ? (
                    <div className='bounding_box'>
                      <p>bounding box</p>
                      <p>x: {item[0].bounding[0]}</p>
                      <p>y: {item[0].bounding[1]}</p>
                      <p>width: {item[0].bounding[2]}</p>
                      <p>height: {item[0].bounding[3]}</p>
                      <p>classId: {item[0].classId}</p>
                      <p>probability: {item[0].probability}</p>
                    </div>
                  ) : (
                    <p>{item[0]}</p>
                  )}
                  {item[1] && <p>{item[1]}</p>}
                </div>
              );
            })}
          </>
        ):null} */}
        {/* {dummyData.data.map((item, index) => {
          return (
            <div className='card' key={index}>
              {item[0] && typeof item[0] === 'object' ? (
                <div className='bounding_box'>
                  <p>bounding box</p>
                  <p>x: {item[0].bounding[0]}</p>
                  <p>y: {item[0].bounding[1]}</p>
                  <p>width: {item[0].bounding[2]}</p>
                  <p>height: {item[0].bounding[3]}</p>
                  <p>classId: {item[0].classId}</p>
                  <p>probability: {item[0].probability}</p>
                </div>
              ) : (
                <p>{item[0]}</p>
              )}
              {item[1] && <p>{item[1]}</p>}
            </div>
          );
        })} */}
      </div>
    </SorguContainer>
  );
};

export default Sorgu;
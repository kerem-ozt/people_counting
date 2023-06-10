import styled from '@emotion/styled';

export const AppContainer = styled.div`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
  }
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  height: 100%;
  gap: 2rem;
  .webcam_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* width: 100%; */
    /* height: 100%; */
    min-height: 70vh;
    padding: 2rem;
    gap: 2rem;

    .webcam_title {
      font-size: 1.2rem;
      font-weight: bold;
      color: black;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .webcam {
      /* width: 500px; */
      /* height: 500px; */
      border: 1px solid black;
      background-color: black;
      /* border: 1px solid red; */
      .webcams {
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        height: 100%;
     
        .webcam__video {
          // max-width: 10px;
          // max-height: 10px; 

          width: 100%;
        }
        // .inputImage {
        //   /* max-width: 100px; */
        //   max-height: 100px;
        //   width: 100%;
        // }
        .outputImage {
          /* max-width: 100px; */
          // max-height: 100px;
          width: 100%;
        }
      }
    }

    .webcam_buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      .run {
        padding: 1rem 2rem;
        border: 1px solid black;
        border-radius: 20px;
        background-color: #fff;
        cursor: pointer;
      }
      .save_data {
        padding: 1rem 2rem;
        border: 1px solid black;
        border-radius: 20px;
        background-color: #fff;
        cursor: pointer;
      }
    }
  }
`;

export const NavbarContainer = styled.div`
  /* height: 60px; */
  /* background-color: blue; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 3rem;
  box-shadow: 0px 0px 14px -8px rgba(0, 0, 0, 0.75);

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
  }

  div {
    display: flex;
    align-items: center;
    gap: 1rem;
    a {
      color: black;
      text-decoration: none;
      margin-left: 1rem;
      font-size: 1.2rem;
      font-weight: bold;
      padding: 1rem 2rem;
      border: 1px solid black;
      border-radius: 20px;
      cursor: pointer;
    }
  }
`;

export const SorguContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .filter {
    display: flex;
    width: 100%;
    /* background-color: red; */
    gap: 1rem;
    padding: 3rem;
    input {
      padding: 1rem;
      border: 1px solid black;
      border-radius: 20px;
      outline: none;

      ::placeholder {
        color: black;
        font-weight: bold;
      }
    }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    .fetch_all {
      padding: 1rem 2rem;
      border-radius: 20px;
      background-color: green;
      cursor: pointer;
      color: white;
    }

  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    height: 100%;
    width: 100%;

    .card {
      width: 90%;
      padding: 2rem;
      background-color: #fff;
      border-radius: 20px;
      box-shadow: 0px 0px 14px -8px rgba(0, 0, 0, 0.75);
    }
  }
  `;

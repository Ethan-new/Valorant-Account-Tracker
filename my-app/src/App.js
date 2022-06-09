import React from 'react';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Leaderboard from './components/Leaderboard';
import MatchHistory from "./components/matchHistory"
import NavBar from './components/NavBar';
import background from "./imgs/homeBackGround.jpg";


class App extends React.Component {
  render() {

    return (
      <div style={{        backgroundColor: 'black',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'repeat-y',
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${background}`
    }
      
      }>
      <Router>
        <NavBar></NavBar>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />

        <Routes>
          <Route path="/" element={<MatchHistory/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
        </Routes>
      </Router>

      </div>

    );

  }


}

export default App;

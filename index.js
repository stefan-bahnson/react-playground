import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import './sass/main.scss';

function fetchInitialPlayers(callback) {
  const PLAYERS = [
    {
      name: 'Lena Last',
      score: 35,
      id: 1,
      isActive: true
    },
    {
      name: 'Stefan Bahnson',
      score: 31,
      id: 2,
      isActive: true
    },
    {
      name: 'Bosee',
      score: 31,
      id: 3,
      isActive: false
    },
  ];
  setTimeout(() => callback(PLAYERS), 1500);
}

function fetchTitle(callback) {
  setTimeout(() => callback('Scoreboard'), 0);
}

/*
 *  Header
 */
const Header = ({ title }) => (
  <div className="header">
    <h1>{ title }</h1>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
};


/*
 *  Counter
 */
const Counter = ({ score }) => (
  <div className="counter">
    <button> -</button>
    <div className="counter-score">{ score }</div>
    <button> +</button>
  </div>
);

Counter.propTypes = {
  score: PropTypes.number.isRequired,
};


/*
 *  Player
 */
const Player = ({ name, score }) => (
  <div className="player">
    <div className="player-name">{ name }</div>
    <div className="player-score">{ score }</div>
  </div>
);

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};


const PlayerList = ({ title, players }) => (
  <div className="player-list">
    <h1>{ title }</h1>
    {
      players.map((player) =>
        <Player
          name={ player.name }
          score={ player.score }
          key={ player.id }
        />
      )
    }
  </div>
);

const LoadingIndicator = ({ message, isActive, children }) => (
  <div className="loading-indicator">
    {
      isActive &&
      <div className="spinner">{ message }</div>
    }
    { children }
  </div>
);

/*
 *  App
 */
class App extends Component {

  state = {
    players: [],
    title: '',
  }

  componentWillMount() {
    fetchInitialPlayers((players) => this.setState({ players: players }));
    fetchTitle((title) => this.setState({ title }))
  }

  render() {
    const { players, title } = this.state;
    console.log(players.length);

    return (
      <div className="score-board">
        <Header title={title}/>
        <div className="players">
          <LoadingIndicator message="loading" isActive={ !players.length }>
            {
              players.length ?
                <PlayerList
                  title="Active Players"
                  players={ players.filter((player) => player.isActive) }
                /> : null
            }
            {
              players.length ?
                <PlayerList
                  title="Inactive Players"
                  players={ players.filter((player) => !player.isActive) }
                /> : null
            }
          </LoadingIndicator>
        </div>
      </div>
    )
  }
}

/*
 *  Render React app
 */
render(
  <App />,
  document.getElementById('react-root')
);
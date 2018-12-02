import React from 'react';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import queryString from 'query-string';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function Profile ({ info }) {

  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player (props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>{props.score}</h3>
      <Profile info={props.profile}/>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}


class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }

  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    console.log(players)
    battle([
      players.playerOneName,
      players.playerTwoName,
    ]).then((results) => {
      if (results === null) {
        return this.setState(()=>{
          return {
            error: 'Looks like there was an error. Make sure both users exist on github.',
            loading: false,
          }
        });
      }

      this.setState(()=>{
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false,
        }
      })
    });
  }

  render(){
    const { error, winner, loser, loading } = this.state;

    if (loading === true) {
     return <Loading text='Loading your results🤓' />
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link className='button' to='/battle'>Reset </Link>
        </div>
      )
    }

    return (
      <div>
        {/*JSON.stringify(this.state,null,2)*/}
        <div className='row'>
          <Player
            label='Winner 🏆'
            score={winner.score}
            profile={winner.profile}
          />

            <Player
              label='Loser 💩'
              score={loser.score}
              profile={loser.profile}
            />
        </div>
      </div>
    )
  }
}

export default Results;

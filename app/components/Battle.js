import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    const value = e.target.value;
    this.setState(()=>{
      return {
        username: value,
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit} className='column'>
          <label className='header' htmlFor='username'>
            {this.props.label}
          </label>
          <input
           id='username'
           type='text'
           value={this.state.username}
           autoComplete='off'
           onChange={this.handleChange} />
        </form>
        <button
          className='button'
          type='submit'
          onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}


class Battle extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    console.log(id, username)
    this.setState(()=>{
      const newState = {};
      newState[`${id}Name`] = username;
      newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
      return newState;
    });
  }

  handleReset(id) {
    this.setState(()=>{
      const newState = {};
      newState[`${id}Name`] = '';
      newState[`${id}Image`] = null;
      return newState;
    })
  }

  render() {
    const match = this.props.match;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage} = this.state;

    return(
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}/>}

          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
            >
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerOne')}>
                  Reset
              </button>
            </PlayerPreview>}

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}/>}

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
            >
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerTwo')}>
                  Reset
              </button>
            </PlayerPreview>}
        </div>
        {playerOneImage !== null && playerTwoImage !== null &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
            battle!!!
          </Link>}
      </div>
    )
  }
}

export default Battle;

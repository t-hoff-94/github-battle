import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: 'Username',
  }

  state = {
    username: ''
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState(()=>{
      return {
        username: value,
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }

  render() {
    const { username } = this.state;
    const { label } = this.props;

    return(
      <div>
        <form onSubmit={this.handleSubmit} className='column'>
          <label className='header' htmlFor='username'>
            {label}
          </label>
          <input
           id='username'
           placeholder='github username'
           type='text'
           value={username}
           autoComplete='off'
           onChange={this.handleChange} />
         <button
           className='button'
           type='submit'
           disabled={!this.state.username}>
           Submit
         </button>
        </form>
      </div>
    )
  }
}


class Battle extends React.Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null,
  }

  handleSubmit = (id, username) => {
    this.setState(()=>{
      const newState = {};
      newState[`${id}Name`] = username;
      newState[`${id}Image`] = `https://github.com/${username}.png?size=200`;
      return newState;
    });
  }

  handleReset = (id) => {
    this.setState(()=>{
      const newState = {};
      newState[`${id}Name`] = '';
      newState[`${id}Image`] = null;
      return newState;
    })
  }

  render() {
    const { match } = this.props;
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
                onClick={()=> this.handleReset('playerOne')}>
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
                onClick={()=> this.handleReset('playerTwo')}>
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

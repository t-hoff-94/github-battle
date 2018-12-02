import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import { highlightLink } from '../utils/highlight';
import Loading from './Loading';

function SelectLanguage(props) {
  const languages = ['All', 'JavaScript', 'CSS', 'Ruby', 'Python', 'Java'];

  return(
    <ul className='languages'>
    {languages.map(lang => {
      return (
        <li
        className=''
        key={lang}
        onMouseEnter={highlightLink}
        onClick={props.onSelect.bind(null, lang)}
        style={lang === props.selectedLanguage ? {color: '#ffcc1a'}: null}>
          {lang}
        </li>
      )
    })}
    </ul>
  )
}


function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index)=> {
        return (
          <li className='popular-item' key={repo.name} >
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={`Avatar for ${repo.owner.login}`} />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
}



class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  componentWillUnmount() {
    document.querySelector('.highlight').remove();
  }

  updateLanguage (lang) {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null,
      }
    });

    fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => {
          return {
            repos: repos,
          }
        })
      });
  }

  render() {
    const { selectedLanguage } = this.state;
    return (
      <div>
        <SelectLanguage
        onSelect={this.updateLanguage}
        selectedLanguage={this.state.selectedLanguage}
        />

        {!this.state.repos
          ? <Loading text='loading your stuff' />
          : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

export default Popular;

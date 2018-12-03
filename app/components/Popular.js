import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import { highlightLink } from '../utils/highlight';
import Loading from './Loading';

function SelectLanguage(props) {
  const languages = ['All', 'JavaScript', 'CSS', 'Ruby', 'Python', 'Java'];
  const { onSelect, selectedLanguage } = props;
  return(
    <ul className='languages'>
    {languages.map(lang => {
      return (
        <li
        className=''
        key={lang}
        onMouseEnter={highlightLink}
        onClick={()=> onSelect(lang)}
        style={lang === selectedLanguage ? {color: '#ffcc1a'}: null}>
          {lang}
        </li>
      )
    })}
    </ul>
  )
}


function RepoGrid({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map(({ name, owner, html_url, stargazers_count }, index) => {
        return (
          <li className='popular-item' key={name} >
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={owner.avatar_url}
                  alt={`Avatar for ${owner.login}`} />
              </li>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{owner.login}</li>
              <li>{stargazers_count} stars</li>
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
  state = {
    selectedLanguage: 'All',
    repos: null,
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  componentWillUnmount() {
    if (document.querySelector('.highlight') !== null) {
      document.querySelector('.highlight').remove();
    }
  }

  updateLanguage = async (lang) => {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null,
      }
    });
    const repos = await fetchPopularRepos(lang);
    this.setState(() => ({repos: repos}));
  }

  render() {
    const { selectedLanguage, repos } = this.state;
    return (
      <div>
        <SelectLanguage
        onSelect={this.updateLanguage}
        selectedLanguage={selectedLanguage}
        />

        {!this.state.repos
          ? <Loading text='loading your stuff' />
          : <RepoGrid repos={repos} />}
      </div>
    )
  }
}

export default Popular;

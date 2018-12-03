const id = '';
const sec = '';
const params = `?client_id=${id}&client_secret=${sec}`;

async function getProfile (username) {
  const response = await fetch(`https://api.github.com/users/${username}${params}`);
  return response.json();
  console.log(response)
}

async function getRepos (username) {
  const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`);

  return response.json();
}

function getStarCount (repos) {
  return repos.reduce((count, repo) =>  count + repo.stargazers_count, 0);
}

function calculateScore (profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

async function getUserData (player) {
  const [ profile, repos ] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ]);

  return {
    profile: profile,
    score: calculateScore(profile, repos)
  }
}

function sortPlayers (players) {
  return players.sort((a,b) => b.score - a.score);
}


export async function battle (players) {
    const results = await Promise.all(players.map(getUserData))
    .catch(handleError);

    return results === null
      ? results
      : sortPlayers(results);
}

 export async function fetchPopularRepos (language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=star&order=desc&type=Repositories`);

  const response = await fetch(encodedURI)
    .catch(handleError);

  const repos = await response.json();

  return repos.items;
}

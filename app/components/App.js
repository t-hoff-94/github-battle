import React from 'react';
import Nav from './Nav';
import Home from './Home';
import Popular from './Popular';
import Battle from './Battle';
import Results from './Results';
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route
const Switch = ReactRouter.Switch;

class App extends React.Component {
  render(){
    return(
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route render={()=> <p> not found 💩 </p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

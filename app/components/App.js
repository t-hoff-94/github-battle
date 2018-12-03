import React from 'react';
import Nav from './Nav';
import Home from './Home';
import Popular from './Popular';
import Battle from './Battle';
import Results from './Results';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
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
      </BrowserRouter>
    )
  }
}

export default App;

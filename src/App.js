import React, {Component, Suspense} from 'react';
import './App.css';
import ChooseImages from './pages/ChooseImages';
import UploadImages from './pages/UploadImages';
import Finalize from './pages/Finalize';
import Show from './pages/Show';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import IndexExhibitions from './pages/IndexExhibitions';
import {Route} from "react-router-dom";
const preload = import('./pages/ChooseBackground')
const ChooseBackground = React.lazy(() => preload);


class App extends Component {

  render() {

    return (
      <div className="App">
        <Route exact path="/" component={Home}/> 
        <Route path="/login" component={Login}/> 
        <Route path="/signup" component={Signup}/> 

        
        <Route 
          redirectUrl='/login' 
          path="/background" 
          render={(props)=> 
            <Suspense fallback={<div>Loading...</div>}>
              <ChooseBackground {...props} />
              </Suspense>
          }
        />

        <ProtectedRoute 
          redirectUrl='/login' 
          path="/images" 
          component={ChooseImages}
        />

        <ProtectedRoute 
          redirectUrl='/login' 
          path="/upload" 
          component={UploadImages}
        />

        <ProtectedRoute 
          redirectUrl='/login' 
          path="/finalize/:id" 
          component={Finalize}
        />

        <ProtectedRoute 
          redirectUrl='/login' 
          path="/show/:id" 
          component={Show}
        />

        <ProtectedRoute 
          redirectUrl='/login' 
          path="/profile" 
          component={Profile}
        />


        <ProtectedRoute 
          redirectUrl='/login' 
          path="/favorites" 
          component={Favorites}
        />

        {/* enlever la protected route dans le backend
        <Route path="/show/:id" component={Show}/>  */}

        <Route path="/index" component={IndexExhibitions}/> 

      </div>
    );
  }

}

export default App;

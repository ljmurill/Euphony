import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { allSongs } from "./store/songs";

import { restoreUser } from './store/session';

import Home from './components/HomePage';
import CreateSong from './components/Songs/CreateSong';
import SpecificSongPage from './components/Songs/SongSpecificPage';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(restoreUser())
      await dispatch(allSongs())
      setIsLoaded(true)
    })();

  }, [dispatch])

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/api/songs/create">
            <CreateSong isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/api/songs/:songId">
              <SpecificSongPage isLoaded ={isLoaded}/>
          </Route>
          <Route>
            404 Page
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

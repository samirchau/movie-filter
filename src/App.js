import React from "react";
import MovieList  from './components/movies/MovieList'
import DesignLayout from './components/Layout'

function App() {
  return  <DesignLayout content = {<MovieList />} > </DesignLayout>;
}

export default App;

import React, { useState, useEffect } from "react";
import { Row, Pagination, Input, Spin } from "antd";
import MovieCard from "./MovieCard";
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import {
  getMovies,
  getMoviesSuccess,
  getMoviesFailure,
} from "./../slices/MoviesSlices";

const baseUrl = "https://www.omdbapi.com/?";
const { Search } = Input;

const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("spider");

  const dispatch = useDispatch();
  const  {movies: response} = useSelector(state => state);
  const newMovies = response?.movies?.Search;
  const totalMovies = response?.movies?.totalResults;
  const loader = response?.loading;

  const onSearch = (searchValue) => {
    setSearchText(searchValue); 
    console.log(searchValue, "value");
  };

  const fetchMovieList = (page, value) => {
    dispatch(getMovies()); 
   
    axios
      .get(`${baseUrl}s=${value}&apikey=95172b81&page=${page}`)
      .then((response) => {
       dispatch(getMoviesSuccess(response?.data)); 
      })
      .catch((error) => {
        console.log(error, "error");
        getMoviesFailure();
      })
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  console.log(searchText, "value outside");

  useEffect(() => {
    fetchMovieList(currentPage, searchText);
    console.log(searchText, "value");
  }, [currentPage, searchText]);

  return (
    <Spin spinning ={loader}> 
      <Row>
        <Pagination
          defaultCurrent={currentPage}
          total={totalMovies}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        <Search
          style={{ width: "400px", marginLeft: "200px" }}
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
        />
      </Row>

      <Row>
        {newMovies &&
          newMovies.length &&
          newMovies.map((movie) => (
            <div key={movie?.imdbID}>
              <MovieCard movie={movie} />
            </div>
          ))}
      </Row>
    </Spin>
  );
};

export default MovieList;

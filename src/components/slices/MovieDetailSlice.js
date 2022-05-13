import { createSlice } from '@reduxjs/toolkit'


export const initialState ={
    movieDetail: {},
    loading: false,
}

const movieDetailSlice = createSlice ({
    name: "movieDetail",
    initialState,
    reducers: {
        getMovieDetail: state => {
            state.loading = true
          },
          getMovieDetailSuccess: (state, { payload }) => {
              console.log(payload)
            state.movieDetail = payload
            state.loading = false
      
          },
          getMovieDetailFailure: state => {
            state.loading = false
          },
    }
})

export const { getMovieDetail, getMovieDetailSuccess, getMovieDetailFailure } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;

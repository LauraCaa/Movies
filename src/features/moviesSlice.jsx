import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies } from "../services/apiCall";

const initialState = {
    movieList: [],
    watchlist: [],
    loading: false,
    error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    return await getMovies()
});

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        clearMoviesList: (state) => {
            state.movieList = []
        },
        toggleWatchlist: (state, action) => {
            const movie = action.payload;
            const index = state.watchlist.findIndex(m => m.id === movie.id);
            
            if (index !== -1) {
                state.watchlist.splice(index, 1);
            } else {
                state.watchlist.push(movie);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchMovies.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.movieList = payload;
        }).addCase(fetchMovies.rejected, (state, action) => { // <--- Corregido: añadimos 'action'
            state.loading = false;
            state.error = action.error.message || "Error desconocido";
        })
    }
});

export const { clearMoviesList, toggleWatchlist } = moviesSlice.actions;
export default moviesSlice.reducer;
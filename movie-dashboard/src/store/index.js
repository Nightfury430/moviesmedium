import { createStore } from 'vuex';
import { fetchMovies, searchMovies } from '../utils/api';

const store = createStore({
  state: {
    movies: [],
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
  },
  actions: {
    async fetchMovies({ commit }) {
      try {
        const movies = await fetchMovies();
        commit('setMovies', movies);
      } catch (error) {
        console.error('Error in fetchMovies action:', error);
      }
    },
    async searchMovies({ commit }, query) {
      try {
        const movies = await searchMovies(query);
        commit('setMovies', movies);
      } catch (error) {
        console.error('Error in searchMovies action:', error);
      }
    },
  },
  getters: {
    allMovies(state) {
      return state.movies;
    },
    moviesByGenre(state) {
      return state.movies.reduce((acc, movie) => {
        movie.genres.forEach((genre) => {
          if (!acc[genre]) {
            acc[genre] = [];
          }
          acc[genre].push(movie);
        });
        return acc;
      }, {});
    },
  },
});

export default store;

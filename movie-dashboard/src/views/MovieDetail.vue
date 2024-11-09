<template>
	<Header />
  <div class="movie-detail p-4 flex flex-col md:flex-row items-start">
    <Loading v-if="loading" />
    <div v-else class="flex flex-col md:flex-row mt-4">
      <img :src="movie.poster" alt="Movie Poster" class="w-full md:w-1/3 h-auto object-cover rounded" />
      <div class="md:ml-6 mt-4 md:mt-0 flex-1">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">{{ movie.title }} ({{ movie.imdb_rating }})</h1>
          <span class="text-yellow-500">
            <i v-for="n in validRating" :key="n" class="fas fa-star"></i>
            <i v-if="hasHalfStar" class="fas fa-star-half-alt"></i>
            <i v-for="n in emptyStars" :key="'empty-' + n" class="far fa-star"></i>
          </span>
        </div>
        <p class="text-sm text-gray-600 mt-2">
          {{ releaseYear }} | {{ movie.length }} | {{ movie.director }}
        </p>
        <p class="text-sm text-gray-600 mt-1">
          <strong>Cast:</strong> {{ movie.cast.join(', ') }}
        </p>
        <p class="text-sm text-gray-600 mt-1">
          <strong>Movie Description:</strong>
        </p>
        <p class="mt-1">{{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMovieDetail } from '../utils/api';
import Header from '../components/Header.vue';
import Loading from '../components/Loading.vue';
import moment from 'moment';

export default {
  name: 'MovieDetail',
  components: {
    Header,
    Loading,
  },
  data() {
    return {
      movie: null,
      loading: true,
    };
  },
  computed: {
    validRating() {
      return Math.min(5, Math.max(0, Math.floor((this.movie?.imdb_rating || 0) / 2)));
    },
    hasHalfStar() {
      return (this.movie?.imdb_rating / 2) % 1 !== 0;
    },
    emptyStars() {
      return Math.max(0, 5 - this.validRating - (this.hasHalfStar ? 1 : 0));
    },
    releaseYear() {
      return this.movie ? moment(this.movie.released_on).year() : '';
    },
  },
  created() {
    this.loadMovieDetail();
  },
  methods: {
    async loadMovieDetail() {
      try {
        const movieId = this.$route.params.id;
        this.movie = await fetchMovieDetail(movieId);
      } catch (error) {
        console.error('Error loading movie details:', error);
        this.movie = { title: 'Error loading movie details' }; // Fallback message
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.movie-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  min-height: calc(100vh - 80px); /* Ensure it takes the full viewport height */
}
</style>

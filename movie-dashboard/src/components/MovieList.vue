<template>
  <div class="movie-list p-4">
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      <SkeletonLoader v-for="n in 12" :key="n" />
    </div>
    <div v-else>
      <div v-if="hasMovies">
        <div v-for="(movies, genre) in moviesByGenre" :key="genre" class="mb-8">
          <h2 class="text-xl font-semibold mb-2">{{ genre }}</h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <li v-for="movie in movies" :key="movie.id">
              <MovieCard :movie="movie" />
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        No movies available.
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MovieCard from './MovieCard.vue';
import SkeletonLoader from './SkeletonLoader.vue';

export default {
  name: 'MovieList',
  components: {
    MovieCard,
    SkeletonLoader,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['moviesByGenre']),
    hasMovies() {
      return Object.keys(this.moviesByGenre).length > 0;
    },
  },
  methods: {
    ...mapActions(['fetchMovies']),
  },
  created() {
    this.fetchMovies().then(() => {
      this.loading = false;
    });
  },
};
</script>

<style scoped>
.movie-list {
  padding: 20px;
	width: 100%;
}
</style>

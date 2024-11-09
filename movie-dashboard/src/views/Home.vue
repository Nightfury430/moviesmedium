<template>
	<Header />
  <div class="movie-home">
    <MovieList />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import MovieList from '../components/MovieList.vue';

export default {
  name: 'MovieHome',
  components: {
    Header,
    MovieList,
  },
};
</script>

<style scoped>
.movie-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px); /* Subtracting header height (65px = 16px padding top + 16px padding bottom + text height) */
}
</style>

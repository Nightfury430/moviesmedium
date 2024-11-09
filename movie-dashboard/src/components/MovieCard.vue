<template>
  <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }" class="block">
    <div class="movie-card border rounded overflow-hidden shadow-lg">
      <img :src="movie.poster" alt="Movie Poster" class="w-full h-64 object-cover" />
      <div class="p-4">
        <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
        <p class="text-sm text-gray-600">{{ releaseYear }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import moment from 'moment';
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    releaseYear() {
      return this.movie ? moment(this.movie.released_on).year() : '';
    },
  },
};
</script>

<style scoped>
.movie-card {
  transition: transform 0.2s;
}
.movie-card:hover {
  transform: scale(1.05);
}
img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
}
</style>

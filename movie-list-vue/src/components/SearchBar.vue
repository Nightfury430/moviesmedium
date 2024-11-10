<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      @input="handleInput"
      placeholder="Search movies..."
      class="search-input"
    />
    <span class="search-icon">🔍</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMovieStore } from '@/stores/movies'

const searchQuery = ref('')
const movieStore = useMovieStore()

const handleInput = () => {
  if (searchQuery.value.length >= 2) {
    movieStore.searchMovies(searchQuery.value)
  } else if (searchQuery.value.length === 0) {
    movieStore.fetchMovies()
  }
}
</script>

<style scoped lang="scss">
.search-bar {
  position: relative;
  width: 100%;

  .search-input {
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    outline: none;
  }

  .search-icon {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

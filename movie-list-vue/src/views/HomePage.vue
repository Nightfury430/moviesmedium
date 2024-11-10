<template>
  <!-- Main container for the home page -->
  <div class="home-page">
    <Header @search="handleSearch" />

    <!-- Main content area -->
    <main class="content">
      <!-- Show loading skeleton while data is being fetched -->
      <MovieSkeleton v-if="loading" />

      <!-- Show error message if there was an error fetching data -->
      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <template v-else>
        <!-- Show "no results" message when search is active but no movies found -->
        <div v-if="isSearchActive && !hasMovies" class="no-results">
          No movies found matching your search.
        </div>

        <!-- Conditionally render the "Bookmarked Movies" category at the top -->
        <section v-if="groupedMovies['Bookmarked Movies'] && groupedMovies['Bookmarked Movies'].length > 0" class="category-section">
          <h2 class="category-title">Bookmarked Movies</h2>
          <div class="movie-grid">
            <MovieCard
              v-for="movie in groupedMovies['Bookmarked Movies']"
              :key="movie.id"
              :movie="movie"
              @bookmark-toggled="updateBookmarkedMovies"
            />
          </div>
        </section>

        <!-- Iterate through movie categories and display movies in a grid -->
        <section
          v-for="(movies, genre) in groupedMovies"
          :key="genre"
          class="category-section"
        >
          <template v-if="genre !== 'Bookmarked Movies'">
            <!-- Category/genre title -->
            <h2 class="category-title">{{ genre }}</h2>

            <!-- Gr id container for movie cards -->
            <div class="movie-grid">
            <!-- Render MovieCard component for each movie in the category -->
            <MovieCard
              v-for="movie in movies"
              :key="movie.id"
              :movie="movie"
              @bookmark-toggled="updateBookmarkedMovies"
            />
          </div>
          </template>
        </section>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/movies'
import Header from '@/components/Header.vue'
import MovieCard from '@/components/MovieCard.vue'
import MovieSkeleton from '@/components/skeletons/MovieSkeleton.vue'
import 'vue3-loading-skeleton/dist/style.css'
import type { Movie } from '@/types/movies'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()

onMounted(() => {
  const searchQuery = route.query.q as string
  if (searchQuery) {
    handleSearch(searchQuery)
  } else {
    movieStore.fetchMovies()
  }
})

const handleSearch = async (query: string) => {
  if (query.trim()) {
    await movieStore.searchMovies(query)
    router.replace({ query: { q: query } })
  } else {
    await movieStore.fetchMovies()
    router.replace({ query: {} })
  }
}

const isSearchActive = computed(() => movieStore.isSearchActive)
const hasMovies = computed(() => movieStore.movies.length > 0)
const loading = computed(() => movieStore.loading)
const error = computed(() => movieStore.error)
const groupedMovies = computed<Record<string, Movie[]>>(() => {
  return movieStore.categories || {};
})
const bookmarkedMovies = computed(() =>
  movieStore.movies.filter(movie => movie.bookmarked)
)

// Function to update the bookmarked movies list
const updateBookmarkedMovies = () => {
  movieStore.updateBookmarkedMovies()
}
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
}

.content {
  padding: 2rem;
}

.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.category-section {
  margin-bottom: 3rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
}
</style>

<template>
  <!-- Main container for the movie detail page -->
  <div class="detail-view">
    <Header />

    <!-- Back navigation controls -->
    <div class="nav-controls">
      <button class="back-button" @click="$router.push('/')">
        ← Back to Movies
      </button>
    </div>

    <!-- Loading state - shows skeleton loader -->
    <main v-if="loading" class="content">
      <MovieDetailSkeleton />
    </main>

    <!-- Error state - displays error message -->
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- Movie details content when data is loaded -->
    <main v-else-if="movie" class="content">
      <div class="movie-info">
        <img :src="movie.poster" :alt="movie.title" class="movie-poster" />

        <div class="movie-details">
          <h1>{{ movie.title }}</h1>

          <MovieRating :rating="movie.imdb_rating" />

          <!-- Movie metadata (year, length, director) -->
          <div class="meta-info">
            <span>{{ getYear(movie.released_on) }}</span>
            <span class="separator">|</span>
            <span>{{ movie.length }}</span>
            <span class="separator">|</span>
            <span>{{ movie.director }}</span>
          </div>

          <!-- Cast list -->
          <div class="cast">
            <strong>Cast:</strong> {{ movie.cast.join(', ') }}
          </div>

          <!-- Movie overview/description -->
          <p class="overview">{{ movie.overview }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import MovieRating from '@/components/MovieRating.vue'
import MovieDetailSkeleton from '@/components/skeletons/MovieDetailSkeleton.vue'
import { useMovieDetail } from '@/composables/useMovieDetail'
import { SkeletonLoader } from 'vue3-loading-skeleton'
import 'vue3-loading-skeleton/dist/style.css'

const { movie, loading, error, getYear } = useMovieDetail()
</script>

<style scoped>
.content {
  padding: 2rem;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.movie-info {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

.movie-poster {
  width: 100%;
  border-radius: 8px;
}

.movie-details {
  color: #333;
}

.movie-details h1 {
  margin-bottom: 1rem;
}

.movie-details p {
  margin-bottom: 0.5rem;
}

.overview {
  margin-top: 1rem;
  line-height: 1.6;
}

/* Skeleton-specific styles */
.poster-container {
  width: 100%;
}

.movie-poster-skeleton {
  border-radius: 8px;
}

.meta-info-skeleton {
  margin-top: 1rem;
}

.overview-skeleton {
  margin-top: 2rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.mt-4 {
  margin-top: 1rem;
}

/* Add these new styles */
.nav-controls {
  padding: 1rem 2rem 0;
}

.back-button {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.back-button:hover {
  background-color: #e0e0e0;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.stars {
  color: #ffd700;
  letter-spacing: 2px;
}

.rating-text {
  color: #666;
}

.meta-info {
  margin: 1rem 0;
  color: #666;
}

.separator {
  margin: 0 0.5rem;
}

.cast {
  margin: 1rem 0;
}

.cast strong {
  color: #333;
}
</style>

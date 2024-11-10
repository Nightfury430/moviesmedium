<template>
  <div class="movie-info">
    <!-- Poster skeleton -->
    <div class="poster-container">
      <SkeletonLoader height="450" class="movie-poster-skeleton" />
    </div>

    <!-- Details skeleton -->
    <div class="movie-details">
      <!-- Title skeleton -->
      <SkeletonLoader height="36" width="80%" />

      <!-- Rating, length, director info skeletons -->
      <div class="meta-info-skeleton">
        <SkeletonLoader height="24" width="150" class="mt-3" />
        <SkeletonLoader height="24" width="180" class="mt-2" />
        <SkeletonLoader height="24" width="250" class="mt-2" />
      </div>

      <!-- Cast skeleton -->
      <SkeletonLoader height="24" width="90%" class="mt-3" />

      <!-- Overview paragraph skeletons -->
      <div class="overview-skeleton">
        <SkeletonLoader height="20" width="100%" class="mt-4" />
        <SkeletonLoader height="20" width="95%" class="mt-2" />
        <SkeletonLoader height="20" width="98%" class="mt-2" />
        <SkeletonLoader height="20" width="90%" class="mt-2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SkeletonLoader } from 'vue3-loading-skeleton'
import 'vue3-loading-skeleton/dist/style.css'
</script>

<style scoped>
.movie-info {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

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
</style>

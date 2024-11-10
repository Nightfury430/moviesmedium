<template>
  <section v-for="i in count" :key="i" class="category-section">
    <SkeletonLoader width="180" height="28" class="category-title-skeleton" />
    <div class="movie-grid">
      <div v-for="j in itemsPerCategory" :key="j" class="movie-card-skeleton">
        <SkeletonLoader height="300" class="movie-poster-skeleton" />
        <div class="movie-info-skeleton">
          <SkeletonLoader height="24" width="90%" />
          <SkeletonLoader height="20" width="70%" class="mt-2" />
          <div class="movie-meta-skeleton">
            <SkeletonLoader height="18" width="40%" />
            <SkeletonLoader height="18" width="30%" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SkeletonLoader } from 'vue3-loading-skeleton'
import 'vue3-loading-skeleton/dist/style.css'

interface Props {
  count?: number
  itemsPerCategory?: number
}

withDefaults(defineProps<Props>(), {
  count: 3,
  itemsPerCategory: 6,
})
</script>

<style scoped lang="scss">
.category-section {
  margin-bottom: 3rem;
}

.category-title-skeleton {
  margin-bottom: 1.5rem;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.movie-card-skeleton {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.movie-poster-skeleton {
  border-radius: 8px 8px 0 0;
}

.movie-info-skeleton {
  padding: 1rem;
}

.movie-meta-skeleton {
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>

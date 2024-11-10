<template>
  <div class="rating">
    <span class="stars">
      <span v-for="i in 10" :key="i" class="star">
        {{ i <= rating ? '★' : '☆' }}
      </span>
    </span>
    <span class="rating-text">{{ rating }}/10</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  rating: number
}>()
</script>

<style scoped>
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
</style>

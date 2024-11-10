<template>
  <header class="header">
    <h1 class="title">Thikkiiana Movies</h1>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="debounceSearch"
        placeholder="Search movies..."
        class="search-input"
        :disabled="loading"
      />
      <span class="search-status" v-if="loading">Searching...</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMovieStore } from '@/stores/movies'

const searchQuery = ref('')
const movieStore = useMovieStore()
let debounceTimeout: ReturnType<typeof setTimeout>

const emit = defineEmits<{
  search: [query: string]
}>()

const loading = computed(() => movieStore.loading)

const debounceSearch = () => {
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    emit('search', searchQuery.value)
  }, 300)
}
</script>

<style scoped>
.header {
  padding: 1rem 2rem;
  background: #1a1a1a;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  width: 300px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
}

.search-container {
  position: relative;
}

.search-status {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.search-input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>

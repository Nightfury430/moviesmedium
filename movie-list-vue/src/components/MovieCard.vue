<template>
  <div class="movie-card">
    <router-link
      :to="{ name: 'movie-detail', params: { id: movie.id } }"
      class="movie-link"
    >
      <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
      <div class="movie-info">
        <h3 class="movie-title">{{ movie.title }}</h3>
        <div class="movie-rating" @click="toggleBookmark">
          {{ movie.bookmarked ? '★' : '☆' }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '@/stores/movies'

interface MovieProps {
  movie: {
    id: string
    title: string
    poster: string
    rating: number
    bookmarked: boolean
  }
}

const props = defineProps<MovieProps>()
const movieStore = useMovieStore()
const emit = defineEmits(['bookmark-toggled'])

const toggleBookmark = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  movieStore.toggleBookmark(props.movie.id)
  emit('bookmark-toggled', props.movie.id)
}
</script>

<style scoped lang="scss">
.movie-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: scale(1.05);
  }

  .movie-link {
    text-decoration: none;
  }

  .movie-poster {
    width: 100%;
    aspect-ratio: 2/3;
    object-fit: cover;
  }

  .movie-info {
    padding: 0.5rem;

    .movie-title {
      font-size: 1rem;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-decoration: none;
    }

    .movie-rating {
      font-size: 1.375rem;
      color: #eeff00;
      text-decoration: none;
    }
  }
}
</style>

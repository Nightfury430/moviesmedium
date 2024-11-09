<template>
  <div class="search-bar relative">
    <input
      type="text"
      v-model="searchQuery"
      @input="onSearch"
      placeholder="Search for movies..."
      class="modern-input p-2 pl-10 border border-gray-300 rounded w-full"
    />
    <span class="absolute left-0 inset-y-0 flex items-center pl-2">
      <i class="fas fa-search"></i>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    ...mapActions(['searchMovies']),
    onSearch() {
      this.searchMovies(this.searchQuery);
    },
  },
};
</script>

<style scoped>
.search-bar {
  max-width: 300px;
}

.modern-input {
  padding-left: 2.5rem; /* Adjust padding to make space for the icon */
  border-radius: 25px; /* More rounded corners */
  border: 1px solid #ddd; /* Light border */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: border-color 0.3s, box-shadow 0.3s; /* Smooth transition */
}

.modern-input:focus {
  border-color: #007bff; /* Blue border on focus */
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5); /* Blue shadow on focus */
  outline: none; /* Remove default outline */
}

.search-bar i {
  color: #aaa; /* Icon color */
}
</style>

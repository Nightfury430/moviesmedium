<template>
  <header class="flex justify-between items-center p-4 bg-gray-100">
    <router-link to="/" class="text-3xl font-bold">Wookie Movies</router-link>
    <SearchBar />
  </header>
</template>

<script>
import SearchBar from './SearchBar.vue';

export default {
  name: 'HeaderComponent',
  components: {
    SearchBar,
  },
};
</script>

<style scoped>
header {
  border-bottom: 1px solid #e2e8f0;
}
</style>

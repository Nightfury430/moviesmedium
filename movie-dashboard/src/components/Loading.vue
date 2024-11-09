<template>
  <div class="loading text-center py-4">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
};
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* Adjust as needed */
}

.spinner {
  border: 4px solid rgba(74, 85, 104, 0.2); /* Light gray */
  border-top: 4px solid #4a5568; /* Tailwind gray-700 */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

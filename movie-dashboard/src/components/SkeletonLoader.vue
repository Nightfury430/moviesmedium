<template>
  <div class="skeleton-card">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-title"></div>
      <div class="skeleton-year"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
};
</script>

<style scoped>
.skeleton-card {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: pulse 1.5s infinite ease-in-out;
  transition: transform 0.2s;
}

.skeleton-card:hover {
  transform: scale(1.05);
}

.skeleton-image {
  width: 100%;
  height: 406px;
  background-color: #e0e0e0;
}

.skeleton-content {
  padding: 16px;
  width: 100%;
}

.skeleton-title {
  width: 80%;
  height: 20px;
  background-color: #e0e0e0;
  margin-bottom: 8px;
}

.skeleton-year {
  width: 40%;
  height: 16px;
  background-color: #e0e0e0;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
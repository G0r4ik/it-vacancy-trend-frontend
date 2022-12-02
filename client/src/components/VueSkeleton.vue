<template>
  <div
    v-for="index in count || 1"
    :key="index"
    class="skeleton"
    :style="styles"
  ></div>
</template>

<script>
export default {
  props: {
    width: String,
    height: String,
    display: String,
    br: String,
    mt: String,
    mr: String,
    mb: String,
    ml: String,
    count: Number,
  },

  computed: {
    styles() {
      const { mt = 0, mr = 0, mb = 0, ml = 0, display = 'block', br = 0 } = this
      const margin = `${mt} ${mr} ${mb} ${ml}`
      return `width: ${this.width}; height: ${this.height}; display: ${display}; margin: ${margin}; border-radius: ${br}`
    },
  },
}
</script>

<style>
.skeleton {
  position: relative;
  overflow: hidden;
  background-color: var(--color-skeleton-bg);
}
.skeleton::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgb(255 255 255 / 0),
    rgb(255 255 255 / 0.3),
    rgb(37 22 22 / 0)
  );
  animation: shimmer 1.5s infinite;
  content: '';
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>

<template>
  <div
    v-for="index in count || 1"
    :key="index"
    class="skeleton"
    :style="styles" />
</template>

<script>
export default {
  props: {
    width: { type: String, default: '100px' },
    height: { type: String, default: '100px' },
    display: { type: String, default: '100px' },
    br: { type: String, default: '100px' },
    mt: { type: String, default: '100px' },
    mr: { type: String, default: '100px' },
    mb: { type: String, default: '100px' },
    ml: { type: String, default: '100px' },
    count: { type: Number, default: 1 },
  },

  computed: {
    styles() {
      const {
        mt = 0,
        mr = 0,
        mb = 0,
        ml = 0,
        display = 'block',
        br = 0,
        width,
        height,
      } = this
      const margin = `${mt} ${mr} ${mb} ${ml}`
      return `width: ${width}; height: ${height}; display: ${display}; margin: ${margin}; border-radius: ${br}`
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
  content: '';
  background-image: linear-gradient(
    90deg,
    rgb(255 255 255 / 0),
    rgb(255 255 255 / 0.3),
    rgb(37 22 22 / 0)
  );
  transform: translateX(-100%);
  animation: shimmer var(--transition-skeleton) infinite;
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>

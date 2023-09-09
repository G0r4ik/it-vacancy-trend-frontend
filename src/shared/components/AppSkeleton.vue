<template>
  <div
    v-for="index in count"
    :key="index"
    class="skeleton"
    :class="myClass"
    :style="styles">
    <div
      class="skeleton__wave"
      :style="`animation-delay: ${index * 50}ms`"></div>
  </div>
</template>

<script>
export default {
  props: {
    width: { type: String, default: '100px' },
    height: { type: String, default: '100px' },
    display: { type: String, default: 'block' },
    br: { type: String, default: 'var(--border-radius-middle)' },
    mt: { type: String, default: '0' },
    mr: { type: String, default: '0' },
    mb: { type: String, default: '0' },
    ml: { type: String, default: '0' },
    count: { type: Number, default: 1 },
    myClass: { type: String, default: '' },
  },

  computed: {
    styles() {
      const { mt, mr, mb, ml, display, br, width, height } = this
      const margin = `${mt || 0} ${mr || 0} ${mb || 0} ${ml || 0}`
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
.skeleton .skeleton__wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  background-image: linear-gradient(
    90deg,
    rgb(255 255 255 / 0%),
    rgb(255 255 255 / 3%),
    rgb(37 22 22 / 0%)
  );
  transform: translateX(-100%);
  animation: shimmer var(--transition-skeleton) infinite;
}
.light-theme .skeleton__wave {
  background-image: linear-gradient(
    90deg,
    rgb(255 255 255 / 0%),
    rgb(255 255 255 / 7%),
    rgb(37 22 22 / 0%)
  );
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>

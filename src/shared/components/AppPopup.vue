<template>
  <div class="popup">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: { default: 'bla-bla', type: String },
  },
}
</script>

<style>
.popup {
  position: absolute;
  padding: var(--unit);
  color: var(--color-background);
  background: var(--color-text);
  border-radius: var(--radius);
}
</style>

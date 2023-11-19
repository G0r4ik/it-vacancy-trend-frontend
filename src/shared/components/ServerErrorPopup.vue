<template>
  <div class="error-server">
    <div v-for="error of errors" :key="error.id" class="error-server__item">
      <IconSvg
        icon-name="IconCross"
        custom-class="error-server__cross"
        @click="closeError(error.id)" />
      <div class="error-server__inner">
        <div class="error-server__text">
          <strong class="error-server__title">
            {{ error.title }}
          </strong>
          <span class="error-server__text">
            {{ error.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSharedStore } from '@/shared/store.js'

export default {
  computed: {
    errors() {
      return useSharedStore().errors
    },
  },
  methods: {
    closeError(idError) {
      console.log(idError)
      console.log(this.errors.indexOf(idError))
      const index = this.errors.map(i => i.id).indexOf(idError)
      useSharedStore().errors.splice(index, 1)
    },
  },
}
</script>
<style>
.error-server {
  position: fixed;
  right: calc(var(--unit) * 3);
  bottom: calc(var(--unit) * 3);
}
.error-server__item {
  position: relative;
  padding: calc(var(--unit) * 3);
  margin-top: var(--unit);
  overflow: hidden;
  background: var(--color-background);
  border: var(--border-width-small) solid var(--color-border);
  border-radius: var(--border-radius-middle);
  box-shadow: var(--color-border) 0 2px 8px;
}
.error-server__cross {
  position: absolute;
  top: var(--unit);
  right: var(--unit);
  z-index: var(--z-index-overlay);
  padding: var(--unit);
  color: black;
  cursor: pointer;
  background-color: var(--color-light-gray-base);
  border-radius: 50%;
}
.error-server__inner {
  position: relative;
  max-width: var(--width-popup-error);
  padding-right: calc(var(--unit) * 5);
  padding-left: calc(var(--unit) * 10);
}
.error-server__item::before {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--width-popup-error-bg);
  height: 100%;
  aspect-ratio: 1;
  content: '';
  background: var(--color-error-popup);
  border-top-right-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
}
.error-server__text {
  max-height: var(--max-height-popup-error-text);
  overflow-y: auto;
  font-size: var(--text-extra-small);
}
.error-server__title {
  display: block;
  font-size: var(--text-small);
  word-wrap: break-word;
}
</style>

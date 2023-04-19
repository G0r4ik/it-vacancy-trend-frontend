<template>
  <FocusTrap @deactivate="focusout">
    <div class="modal-wrapper" @click="$emit('closeModal')">
      <div class="modal-wrapper__inner" @click.stop>
        <button class="modal-wrapper__cross" @click="$emit('closeModal')">
          &#9587;
        </button>
        <slot />
      </div>
    </div>
  </FocusTrap>
</template>

<script>
import { FocusTrap } from 'focus-trap-vue'

export default {
  components: { FocusTrap },
  emits: ['closeModal'],
  data() {
    return {
      lastActiveFocusElement: '',
    }
  },

  unmounted() {
    document.removeEventListener('keydown', this.addCloseFunction)
  },
  mounted() {
    document.addEventListener('keydown', this.addCloseFunction)
    this.lastActiveFocusElement = document.activeElement
  },
  methods: {
    addCloseFunction(event) {
      if (event.key === 'Escape') this.$emit('closeModal')
    },
    focusout() {
      this.lastActiveFocusElement.focus()
    },
  },
}
</script>

<style>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-index-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: var(--color-modal-bg);
}
.modal-wrapper__inner {
  position: relative;
}
.modal-wrapper__cross {
  position: absolute;
  top: calc(var(--unit * 2));
  right: calc(var(--unit * 2));
  z-index: var(--z-index-overlay);
  cursor: pointer;
}
</style>

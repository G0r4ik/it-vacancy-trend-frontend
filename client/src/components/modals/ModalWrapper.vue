<template>
  <focus-trap @deactivate="focusout">
    <div class="modal-wrapper" @click="$emit('closeModal')">
      <div class="modal-wrapper__inner" @click.stop>
        <button class="modal-wrapper__cross" @click="$emit('closeModal')">
          &#9587;
        </button>
        <slot></slot>
      </div>
    </div>
  </focus-trap>
</template>

<script>
import { FocusTrap } from 'focus-trap-vue'

export default {
  emits: ['closeModal'],
  components: { FocusTrap },
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
    addCloseFunction(e) {
      if (e.key === 'Escape') this.$emit('closeModal')
    },
    focusout() {
      this.lastActiveFocusElement.focus()
    },
  },
}
</script>

<style>
.modal-wrapper {
  width: 100vw;
  height: 100vh;
  background: var(--color-modal-bg);
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-wrapper__inner {
  position: relative;
}
.modal-wrapper__cross {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
}
</style>

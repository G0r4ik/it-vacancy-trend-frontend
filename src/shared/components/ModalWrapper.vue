<template>
  <FocusTrap @deactivate="focusout">
    <div class="modal-wrapper" @click="$emit('closeModal')">
      <div class="modal-wrapper__inner" :class="myClass" @click.stop>
        <button class="modal-wrapper__cross" @click="$emit('closeModal')">
          Esc
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

  props: { myClass: { default: '', type: String } },

  emits: ['closeModal'],

  data() {
    return {
      lastActiveFocusElement: '',
    }
  },

  mounted() {
    document.addEventListener('keydown', this.addCloseFunction)
    this.lastActiveFocusElement = document.activeElement
  },

  unmounted() {
    document.removeEventListener('keydown', this.addCloseFunction)
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
  z-index: var(--z-index-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: var(--color-modal-bg);
}
.modal-wrapper__inner {
  position: relative;
  max-height: 95vh;
  overflow-y: auto;
  border-radius: var(--radius);
  box-shadow: 0 0.1rem 1rem -0.5rem rgb(0 0 0 / 40%);
}
.modal-wrapper__cross {
  position: absolute;
  top: var(--unit);
  right: var(--unit);
  z-index: var(--z-index-overlay);
  padding: calc(var(--unit) / 2) var(--unit);
  cursor: pointer;
  border: var(--border-width-small) solid var(--color-danger);
  border-radius: var(--radius);
}
</style>

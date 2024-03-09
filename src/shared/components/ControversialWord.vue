<template>
  <span class="controversial-mark">
    <span
      class="controversial-mark__mark"
      @mouseover="changeVisiblePopup(true)"
      @mouseleave="changeVisiblePopup(null)">
      !
    </span>
    <AppPopup
      v-if="isVisiblePopup"
      class="popup-with-error"
      text="controversial word in this language" />
  </span>
</template>
<script>
export default {
  data() {
    return {
      isVisiblePopup: false,
    }
  },
  methods: {
    changeVisiblePopup(status) {
      this.isVisiblePopup = status
    },
  },
}
</script>

<style>
.controversial-mark {
  position: relative;
}
.controversial-mark__mark {
  font-weight: 700;
  color: var(--color-danger);
  cursor: help;
}
.popup-with-error {
  left: calc(var(--unit) * 3);
  white-space: nowrap;
}
</style>

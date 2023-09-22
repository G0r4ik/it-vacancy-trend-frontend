<template>
  <span class="controversial-mark">
    <span
      class="controversial-mark__mark"
      @mouseover="changeIsVisibleFIXMEID(true)"
      @mouseleave="changeIsVisibleFIXMEID(null)">
      !
    </span>
    <AppPopup
      v-if="isVisibleFIXMEID"
      class="popup-with-error"
      text="controversial word in this language" />
  </span>
</template>
<script>
export default {
  data() {
    return {
      isVisibleFIXMEID: false,
    }
  },
  methods: {
    changeIsVisibleFIXMEID(status) {
      this.isVisibleFIXMEID = status
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
  color: red;
  cursor: help;
}
.popup-with-error {
  left: calc(var(--unit) * 3);
  white-space: nowrap;
}
</style>

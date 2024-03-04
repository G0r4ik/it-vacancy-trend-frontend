<template>
  <div v-if="isShowHint" class="alert-hint">
    <div class="alert-hint__inner">
      <IconSvg custom-class="alert-hint__icon" icon-name="IconInfo" />
      <div class="alert-hint__content">
        <strong class="alert-hint__title">Info</strong>
        <span class="alert-hint__text">
          Click on the name of the technology to open a graph
        </span>
        <IconSvg
          class="alert-hint__cross"
          icon-name="IconCross"
          @click="closeHint" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    }
  },

  computed: {
    isShowHint() {
      return JSON.parse(localStorage.getItem('isShowHint')) ?? this.isShow
    },
  },
  methods: {
    closeHint() {
      localStorage.setItem('isShowHint', false)
      this.isShow = false
    },
  },
}
</script>

<style>
.alert-hint {
  position: fixed;
  bottom: calc(var(--unit) * 2);
  left: 0;
  z-index: var(--z-index-modal);
  margin: 15px;
  background: var(--color-background);
  border: var(--border-width-small) solid var(--color-border);
  border-radius: var(--radius);
  opacity: 0.95;
}
.alert-hint__inner {
  position: relative;
  display: flex;
  padding: calc(var(--unit) * 3);
}
.alert-hint__content {
  padding-right: calc(var(--unit) * 8);
  margin-left: calc(var(--unit) * 3);
}
.alert-hint__title {
  display: block;
  margin-bottom: 5px;
  font-size: var(--text-large);
}
.alert-hint__cross {
  position: absolute;
  top: calc(var(--unit) * 3);
  right: calc(var(--unit) * 3);
  cursor: pointer;
}
.alert-hint__icon {
  width: var(--icon-size-large);
  min-width: var(--icon-size-large);
  height: var(--icon-size-large);
  color: var(--color-primary);
}
</style>

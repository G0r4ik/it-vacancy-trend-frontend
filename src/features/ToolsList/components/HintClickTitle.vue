<template>
  <div v-if="isShowHint" class="card-hint">
    <span class="1 card-hint__text">
      Click on the name of the technology to open a graph
    </span>
    <IconSvg style="cursor: pointer" icon-name="IconCross" @click="closeHint" />
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
      console.log(1)
      localStorage.setItem('isShowHint', false)
      this.isShow = false
    },
  },
}
</script>

<style>
.card-hint {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--unit);
  border: var(--border-width-small) solid var(--color-border);
  border-radius: var(--radius);
}
</style>

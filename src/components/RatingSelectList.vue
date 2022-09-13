<template>
  <div class="select-list">
    <div class="select-list__inner">
      <button
        class="select-list__button"
        :class="{ 'select-list__button_active': list === 'tools' }"
        @click="$emit('changeCurrentList', 'tools')"
      >
        Все
      </button>
      <button
        class="select-list__button"
        :class="{ 'select-list__button_active': list === 'favoritesTools' }"
        @click="$emit('changeCurrentList', 'favoritesTools')"
      >
        Избранное
      </button>
      <button
        class="select-list__button"
        :class="{ 'select-list__button_active': list === 'studiedTools' }"
        @click="$emit('changeCurrentList', 'studiedTools')"
      >
        Изученное
      </button>
      <!-- <button class="select-list__button">Настроить</button> -->
    </div>
  </div>
</template>

<script>
export default {
  emits: ['changeCurrentList'],
  props: {
    list: String,
  },
}
</script>

<style scoped>
.select-list {
}
.select-list__inner {
  margin-bottom: var(--margin-large);
}
.select-list__button {
  background: none;
  border: 5px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  color: inherit;
  font-weight: 600;
  font-size: var(--text-extra-small);
  padding: 5px 8px;
  margin-right: var(--margin-small);
}
.select-list__button_active {
  color: var(--color-primary3);
}
</style>

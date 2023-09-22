<template>
  <div class="select-list">
    <div class="select-list__inner">
      <button
        class="select-list__button"
        :class="{ 'select-list__button_active': list === 'tools' }"
        @click="$emit('changeCurrentList', 'tools')">
        All
      </button>
      <button
        class="select-list__button"
        :class="{ 'select-list__button_active': list === 'favoritesTools' }"
        @click="$emit('changeCurrentList', 'favoritesTools')">
        Favourites
      </button>
      <!-- <button
        class="select-list__button"
        :class="{ 'select-list__button_active': list === 'studiedTools' }"
        @click="$emit('changeCurrentList', 'studiedTools')">
        Studied
      </button> -->
      <!-- <button class="select-list__button">Настроить</button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: { type: String, default: 'all' },
  },
  emits: ['changeCurrentList'],
}
</script>

<style>
.select-list__inner {
  margin-bottom: var(--unit);
}
.select-list__button {
  padding: var(--unit) var(--unit);
  margin-right: var(--unit);
  font-size: var(--text-extra-small);
  font-weight: 600;
  color: inherit;
  cursor: pointer;
  background: none;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius);
}
.select-list__button_active {
  color: var(--color-primary);
}
</style>

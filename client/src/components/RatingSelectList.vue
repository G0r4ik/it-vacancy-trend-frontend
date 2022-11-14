<template>
  <div class="select-list">
    <div class="select-list__inner">
      <button
        class="select-list__button"
        :class="{ 'select-list__button_active': list === 'tools' }"
        @click="$emit('changeCurrentList', 'tools')"
      >
        All
      </button>
      <button
        class="select-list__button"
        :class="{ 'select-list__button_active': list === 'favoritesTools' }"
        @click="$emit('changeCurrentList', 'favoritesTools')"
      >
        Favourites
      </button>
      <button
        class="select-list__button"
        :class="{ 'select-list__button_active': list === 'studiedTools' }"
        @click="$emit('changeCurrentList', 'studiedTools')"
      >
        Studied
      </button>
      <!-- <button class="select-list__button">Настроить</button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: String,
  },
  emits: ['changeCurrentList'],
}
</script>

<style>
.select-list {
}
.select-list__inner {
  margin-bottom: var(--margin-large);
}
.select-list__button {
  background: none;
  border: 3px solid var(--color-border);
  border-radius: var(--border-radius-small);
  cursor: pointer;
  color: inherit;
  font-weight: 600;
  font-size: var(--text-extra-small);
  padding: var(--padding-extra-small) var(--padding-small);
  margin-right: var(--margin-small);
}
.select-list__button_active {
  color: var(--color-primary3);
}
</style>

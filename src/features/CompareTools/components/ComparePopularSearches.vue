<template>
  <div class="compare__variants">
    <span class="compare__variants-title">Popular Searches</span>
    <div class="compare__variants-list">
      <span
        v-for="item of listOfPopular"
        :key="item.text"
        class="compare__variants-item"
        @click="addItemsOfPopularList(item.tools)">
        {{ item.text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['addItemsOfPopularList'],
  data() {
    return {
      listOfPopular: [
        {
          text: 'React vs Vue vs Angular',
          tools: ['React', 'Vue', 'Angular'],
        },
        {
          text: 'JavaScript vs Python vs PHP vs Java vs C#',
          tools: ['JavaScript', 'Python', 'PHP', 'Java', 'C#'],
        },
        {
          text: '  All database',
          tools: [
            'SQL',
            'Postgresql',
            'MS SQL',
            'Oracle',
            'MySQL',
            'Redis',
            'MongoDB',
            'Django',
          ],
        },
      ],
    }
  },
  methods: {
    addItemsOfPopularList(tools) {
      this.$emit('addItemsOfPopularList', tools)
    },
  },
}
</script>

<style>
.compare__variants {
  margin-bottom: calc(var(--unit) * 3);
}
.compare__variants-title {
  display: inline-block;
  margin-bottom: var(--unit);
  font-size: var(--text-large);
}
.compare__variants-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.compare__variants-item {
  display: inline;
  color: var(--color-link);
  cursor: pointer;
  border-bottom: var(--border-width-extra-small) solid transparent;
  transition: var(--transition-small) all;
}
.compare__variants-item:hover {
  border-bottom: var(--border-width-extra-small) solid var(--color-link);
  transition: var(--transition-small) all;
}
</style>

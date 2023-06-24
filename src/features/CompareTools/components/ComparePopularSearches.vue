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

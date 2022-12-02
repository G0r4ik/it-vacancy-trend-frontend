<template>
  <div>
    <!-- <div v-for="item of $store.state.tools">{{ item.name_tool }}</div> -->
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'

export default {
  components: { TheHeader },

  data() {
    return {}
  },

  mounted() {
    this.$store.dispatch('loadTools')
    this.$store.dispatch('loadDates')
  },
}
</script>

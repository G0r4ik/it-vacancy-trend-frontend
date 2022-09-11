<template>
  <div>
    <App-Header @changePage="changePage" />
    <App-Other v-if="page === 'other'" />
    <App-Rating v-if="page === 'rating'" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppRating from './components/AppRating.vue'
import AppOther from './components/AppOther.vue'
export default {
  data() {
    return {
      page: 'rating',
    }
  },
  components: { AppHeader, AppRating, AppOther },
  methods: {
    changePage(page) {
      this.page = page
    },
  },
}
</script>

<style></style>

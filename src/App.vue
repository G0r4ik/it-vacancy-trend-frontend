<template>
  <div>
    <App-Header :page="page" @changePage="changePage" />
    <App-Other v-if="page === 'other'" />
    <App-Rating v-if="page === 'rating'" />
    <App-Compare v-if="page === 'compare'" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppRating from './components/AppRating.vue'
import AppCompare from './components/AppCompare.vue'
import AppOther from './components/AppOther.vue'
export default {
  data() {
    return {
      page: 'rating',
    }
  },
  components: { AppHeader, AppRating, AppCompare, AppOther },
  methods: {
    changePage(page) {
      this.page = page
    },
  },
}
</script>

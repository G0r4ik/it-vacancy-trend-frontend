<template>
  <div>
    <App-Header />
    <App-Other />
    <App-Rating />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppRating from './components/AppRating.vue';
import AppOther from './components/AppOther.vue';

export default {
  components: { AppHeader, AppRating, AppOther },
};
</script>

<style></style>

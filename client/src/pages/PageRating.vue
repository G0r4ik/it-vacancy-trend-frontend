<template>
  <TheHeader />
  <RatingStart />
</template>

<script>
import RatingStart from '../features/ratingTable/components/RatingStart.vue'
import TheHeader from '../shared/components/TheHeader.vue'

export default {
  components: { RatingStart, TheHeader },
}
</script>

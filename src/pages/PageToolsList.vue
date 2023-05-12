<template>
  <TheHeader />
  <AppRating />
</template>

<script>
import { AppRating } from '../features/ToolsList'
import TheHeader from '../shared/components/TheHeader.vue'

export default {
  components: { AppRating, TheHeader },
}
</script>

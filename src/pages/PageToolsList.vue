<template>
  <TheHeader />
  <ToolsList />
</template>

<script>
import { ToolsList } from '../features/ToolsList'
import TheHeader from '../shared/components/TheHeader.vue'

export default {
  components: { ToolsList, TheHeader },
}
</script>

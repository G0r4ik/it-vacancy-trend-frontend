<template>
  <TheHeader />
  <ToolsList />
  <ServerErrorPopup />
</template>

<script>
import { ToolsList } from '@/features/ToolsList'

export default {
  components: { ToolsList },
}
</script>

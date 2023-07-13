<template>
  <router-view></router-view>
</template>

<script>
import { useStore, api } from '@/features/AuthUser'

export default {
  async mounted() {
    if (useStore().isLogin) {
      const data = await api.refreshToken()
      useStore().setUser(data.data)
    }
  },
}
</script>

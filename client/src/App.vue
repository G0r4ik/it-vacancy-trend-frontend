<template>
  <div>
    <App-Header />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import api from './api'

export default {
  data() {
    return {
      // tools: [5, 7],
    }
  },
  computed: {
    async tools() {
      let tools = []
      api.getTools('Russia', 'HeadHunter').then(res => {
        tools = res
        let favoritesTools = localStorage.getItem('favoritesTools')
        let studiedTools = localStorage.getItem('studiedTools')

        favoritesTools =
          favoritesTools !== null ? favoritesTools.split(' ') : 'e'
        studiedTools = studiedTools !== null ? studiedTools.split(' ') : 'e'
        for (let i = 0; i < tools.length; i++) {
          tools[i].isFav = false
          tools[i].isStudied = false
          if (favoritesTools.includes(String(tools[i].id_tool))) {
            tools[i].isFav = true
          }
          if (studiedTools.includes(String(tools[i].id_tool))) {
            tools[i].isStudied = true
          }
        }
      })
      return tools
    },
  },
  components: { AppHeader },

  mounted() {},
  provide() {
    return this.tools
  },
}
</script>

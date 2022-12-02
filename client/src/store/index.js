import { createStore } from 'vuex'

import api from '../api'

export default createStore({
  state() {
    return {
      tools: [],
      dates: [],
      lastDate: null,
      isToolsLoaded: false,
    }
  },

  getters: {
    tools(state) {
      return state.tools
    },
    dates(state) {
      return state.dates
    },
    lastDate(state) {
      return state.lastDate
    },
    isToolsLoaded(state) {
      return state.isToolsLoaded
    },
  },

  actions: {
    loadTools({ commit }) {
      api.getTools('Russia', 'HeadHunter').then(res => {
        commit('setTools', res)
        // let favoritesTools = localStorage.getItem('favoritesTools')
        // let studiedTools = localStorage.getItem('studiedTools')

        // favoritesTools =
        //   favoritesTools !== null ? favoritesTools.split(' ') : 'e'
        // studiedTools = studiedTools !== null ? studiedTools.split(' ') : 'e'
        // for (let i = 0; i < this.tools.length; i++) {
        //   this.tools[i].isFav = false
        //   this.tools[i].isStudied = false
        //   if (favoritesTools.includes(String(this.tools[i].id_tool))) {
        //     this.tools[i].isFav = true
        //   }
        //   if (studiedTools.includes(String(this.tools[i].id_tool))) {
        //     this.tools[i].isStudied = true
        //   }
        // }

        // rename
        commit('changeLoadedTools', true)
      })
    },
    loadDates({ commit }) {
      api.getDates().then(res => {
        commit('setDates', res)
        commit('setLastDate', res.at(-1))
      })
    },
  },

  mutations: {
    setTools(state, tools) {
      state.tools = tools
    },
    setDates(state, dates) {
      state.dates = dates
    },
    setLastDate(state, lastDate) {
      state.lastDate = lastDate
    },
    changeLoadedTools(state, active) {
      state.isToolsLoaded = active
    },
  },
})

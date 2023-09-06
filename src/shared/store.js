import { defineStore } from 'pinia'

export const useSharedStore = defineStore('useSharedStore', {
  state: () => ({
    errors: [],
  }),
  actions: {
    errorHandler(error_, message) {
      // console.log(error_)
      this.errors.push({
        id: Math.random(),
        title: 'Server error',
        text: message,
        date: new Date(),
      })
    },
  },
})

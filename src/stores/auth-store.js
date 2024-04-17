import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    token: localStorage.getItem("token") || "",
    loggedIn: false
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    authToken: (state) => state.token
  },

  actions: {
    doLogin(fdata){
      return new Promise((resolve, reject) => {
        api.post('/login', fdata)
        .then( (response)=>{
          this.token = response.data.token
          localStorage.setItem("token", this.token)
          //localStorage.removeItem('name')
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('role', response.data.r)
          resolve(response.status)
        })
        .catch( err => {
          //console.error(err)
          reject(err)
        })
      })
   }
  }
})

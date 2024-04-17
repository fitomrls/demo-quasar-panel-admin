import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const usePiniaStore = defineStore('pinia-store', {
  state: () => ({
    users: []
  }),
  getters: {
    getUsers: state => state.users
  },
  actions: {
    doLogout(){
      return new Promise((resolve, reject) => {
        api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
        api.get('/users/logout')
          .then((response) => {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            this.users = null
            resolve('ok')
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    async retrieveUsers(){
      api.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token")
      await api.get('configs').then( response => {
        this.users = response.data
      })
    },

    async createUser(fdata){
      api.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token")
      await api.post('users', fdata).then( response => {
        fdata.id = response.data
        fdata.state = 'active'
        delete fdata.clave
        delete fdata.reclave
        this.users.push(fdata)
      })
    },

    async updateUser(fdata){
      api.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token")
      await api.put(`users/${fdata.id}`, fdata).then( response => {
        this.users.map(elem=>{
          if(elem.id==fdata.id){
            elem.name = fdata.name
            elem.email = fdata.email
            elem.state = fdata.state? 'active':'inactive'
          }
        })
      })
    }
  }
})

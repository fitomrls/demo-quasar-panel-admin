//import { storeToRefs } from 'pinia'
import { usePiniaStore } from 'src/stores/pinia-store'
import { computed } from 'vue'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import 'dayjs/locale/es' // load on demand
dayjs.locale('es')

export const usePinia = ()=>{

  const storePinia = usePiniaStore()

  const logout = async()=>{
    await storePinia.doLogout()
  }

  const dateFormat =(fecha)=>{
    return dayjs(fecha).format('dddd DD MMM YYYY H:mm')
  }

  const dateFormat2 =(fecha)=>{
    return dayjs(fecha).format('YYYY-MM-DD')
  }

  const retrieveUsers = async()=>{
    await storePinia.retrieveUsers()
  }

  const createUser = async(fdata)=>{
    await storePinia.createUser(fdata)
  }

  const updateUser = async(fdata)=> await storePinia.updateUser(fdata)

  const updateClave = async(fdata)=> await storePinia.updateClave(fdata)

  const nameUser = ()=> storePinia.getNameUser

  return {
    //computed
    users: computed( ()=> storePinia.getUsers),
    //methods
    logout,
    retrieveUsers,
    createUser,
    updateUser,
    updateClave
  }

}

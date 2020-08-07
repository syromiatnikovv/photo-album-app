import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import '@firebase/storage'
import '@firebase/database'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: [],
  },

  getters: {
    images: (state) => state.images,
  },

  mutations: {
    setImages(state, images) {
      state.images = images
    },

    removeImage(state, index) {
      state.images.splice(index, 1)
    },
  },

  actions: {
    async uploadFile({ dispatch }, image) {
      try {
        // add empty record in database
        const { key } = await firebase
          .database()
          .ref('photos')
          .push({ name: '', imageSrc: '' })

        // add file in storage
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await firebase
          .storage()
          .ref(`photos/${key}.${imageExt}`)
          .put(image)

        // update record in database
        //const imageSrc = fileData.metadata.downloadURLs[0]
        const imageSrc = await firebase
          .storage()
          .ref()
          .child(fileData.ref.fullPath)
          .getDownloadURL()

        await firebase
          .database()
          .ref(`photos/${key}`)
          .set({ name: `${key}.${imageExt}`, imageSrc })

        await dispatch('getImages')
      } catch (e) {
        throw new Error(e)
      }
    },

    async getImages({ commit }) {
      try {
        const images = []

        await firebase
          .database()
          .ref('photos')
          .once('value', (res) => {
            res.forEach((item) => {
              images.push({
                id: item.key,
                name: item.val().name,
                imageSrc: item.val().imageSrc,
              })
            })
          })

        commit('setImages', images)
      } catch (e) {
        throw new Error(e)
      }
    },

    async removeImage({ getters, commit }, index) {
      const id = getters.images[index].id
      const name = getters.images[index].name
      console.log(id)

      try {
        //delete file from storage
        await firebase
          .storage()
          .ref(`photos/${name}`)
          .delete()

        //delete record from database
        await firebase
          .database()
          .ref(`photos/${id}`)
          .remove()

        commit('removeImage', index)
      } catch (e) {
        throw new Error(e)
      }
    },
  },
})

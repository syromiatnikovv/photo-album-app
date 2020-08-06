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
  },

  actions: {
    async uploadFile(context, image) {
      try {
        // add empty record in database
        const { key } = await firebase
          .database()
          .ref('photos')
          .push({ imageSrc: '' })

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
          .set({ imageSrc })
      } catch (e) {
        throw new Error(e)
      }
    },

    async getImages() {
      try {
        const images = []

        const res = await firebase
          .database()
          .ref('photos')
          .once('value')

        const resImages = res.val()
        Object.keys(resImages).forEach((key) => {
          images.push(resImages[key])
        })

        this.commit('setImages', images)
      } catch (e) {
        throw new Error(e)
      }
    },
  },
})

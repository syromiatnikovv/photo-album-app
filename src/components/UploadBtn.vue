<template>
  <div>
    <v-btn text :loading="loading" @click="triggerUpload">
      <v-icon left>mdi-cloud-upload</v-icon>
      Загрузить
    </v-btn>
    <input
      ref="fileInput"
      type="file"
      hidden
      accept="image/*"
      @change="uploadFile"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    image: null,
  }),

  methods: {
    triggerUpload() {
      this.$refs.fileInput.click()
    },

    async uploadFile(e) {
      try {
        this.loading = true
        this.image = e.target.files[0]

        await this.$store.dispatch('uploadFile', this.image)

        this.loading = false

        await this.$store.dispatch('getImages')
      } catch (e) {
        this.loading = false
      }
    },
  },
}
</script>

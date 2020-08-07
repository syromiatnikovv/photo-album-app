<template>
  <v-dialog v-model="show" max-width="300">
    <v-card class="pa-2">
      <v-card-title class="headline justify-center">Удалить фото?</v-card-title>

      <v-card-actions>
        <v-btn color="white" @click="close" :disabled="loading">
          Отмена
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          color="error"
          @click="removeImage"
          :disabled="loading"
          :loading="loading"
        >
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    index: null,
    show: false,
    loading: false,
  }),

  methods: {
    open(index) {
      this.index = index
      this.show = true
    },

    close() {
      this.index = null
      this.loading = false
      this.show = false
    },

    async removeImage() {
      try {
        this.loading = true

        await this.$store.dispatch('removeImage', this.index)
      } catch (e) {
        throw new Error(e)
      } finally {
        this.close()
      }
    },
  },
}
</script>

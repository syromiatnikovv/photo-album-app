<template>
  <v-container fluid :class="loading || !images.length ? 'fill-height' : ''">
    <v-card v-if="!loading && !isNoPhotos" class="mt-1">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="img in images"
            :key="img.imageSrc"
            class="d-flex child-flex"
            cols="6"
            sm="4"
            md="3"
            lg="2"
          >
            <v-card flat tile class="d-flex">
              <v-img
                :src="img.imageSrc"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-row
      v-else-if="!loading && isNoPhotos"
      align="center"
      justify="center"
      no-gutters
    >
      Вы пока не добавили ни одной фотографии.
    </v-row>

    <v-row v-else align="center" justify="center" no-gutters>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),

  mounted() {
    this.getImages()
  },

  computed: {
    images() {
      return this.$store.getters['images']
    },

    isNoPhotos() {
      return this.images.length == 0
    },
  },

  methods: {
    async getImages() {
      try {
        this.loading = true

        await this.$store.dispatch('getImages')

        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>

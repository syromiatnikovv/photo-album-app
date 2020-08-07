<template>
  <v-container fluid :class="loading || !images.length ? 'fill-height' : ''">
    <template v-if="!loading && !isNoPhotos">
      <v-card class="mt-1">
        <v-container fluid>
          <v-row>
            <v-col
              v-for="({ imageSrc }, i) in images"
              :key="i"
              class="d-flex child-flex"
              cols="6"
              sm="4"
              md="3"
              lg="2"
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="imageSrc"
                  aspect-ratio="1"
                  class="grey lighten-2 photo-img"
                  @click="viewImg(i)"
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

      <photo-viewer :images="images" ref="viewer"></photo-viewer>
    </template>

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
import PhotoViewer from './PhotoViewer'

export default {
  components: {
    PhotoViewer,
  },

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

    viewImg(index) {
      this.$refs.viewer.view(index)
    },
  },
}
</script>

<style>
.photo-img {
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.photo-img:hover {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
</style>

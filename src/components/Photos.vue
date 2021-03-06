<template>
  <v-container fluid :class="loading || !images.length ? 'fill-height' : ''">
    <v-row v-if="loading" align="center" justify="center" no-gutters>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>

    <v-row v-else-if="isNoPhotos" align="center" justify="center" no-gutters>
      Вы пока не добавили ни одной фотографии.
    </v-row>

    <template v-else>
      <v-card class="mt-1">
        <draggable
          v-model="images"
          v-bind="dragOptions"
          class="container container--fluid"
        >
          <transition-group type="transition" name="flip-list" class="row">
            <v-col
              v-for="({ id, imageSrc }, i) in images"
              :key="id"
              class="d-flex child-flex"
              cols="6"
              sm="4"
              md="3"
              lg="2"
            >
              <v-card flat tile class="d-flex photo-card">
                <v-img
                  :src="imageSrc"
                  aspect-ratio="1"
                  class="grey lighten-2 photo-img"
                  @click="viewImage(i)"
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

                <v-btn
                  icon
                  dark
                  class="remove-btn"
                  @click.stop="openRemoveDialog(i)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card>
            </v-col>
          </transition-group>
        </draggable>
      </v-card>

      <photo-viewer :images="images" ref="viewer"></photo-viewer>

      <photo-remove ref="photoRemove"></photo-remove>
    </template>
  </v-container>
</template>

<script>
import PhotoViewer from './PhotoViewer'
import PhotoRemove from './PhotoRemove'
import Draggable from 'vuedraggable'

export default {
  components: {
    PhotoViewer,
    PhotoRemove,
    Draggable,
  },

  data: () => ({
    loading: false,
    dragOptions: {
      animation: 200,
      group: 'description',
      disabled: false,
    },
  }),

  mounted() {
    this.getImages()
  },

  computed: {
    images: {
      get() {
        return this.$store.getters['images']
      },

      set(value) {
        this.$store.commit('setImages', value)
      },
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
      } catch (e) {
        this.loading = false
      }
    },

    viewImage(index) {
      this.$refs.viewer.view(index)
    },

    openRemoveDialog(index) {
      this.$refs.photoRemove.open(index)
    },
  },
}
</script>

<style>
.photo-card .photo-img {
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.photo-card:hover .photo-img {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

.photo-card:hover .remove-btn {
  display: inline-flex;
}

.remove-btn {
  display: none;
  position: absolute;
  color: #fff;
  right: 3px;
  top: 3px;
}
</style>

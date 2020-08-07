<template>
  <viewer
    :images="images"
    :options="options"
    @inited="inited"
    class="viewer"
    ref="viewer"
  >
    <img v-for="({ imageSrc }, index) in images" :key="index" :src="imageSrc" />
  </viewer>
</template>

<script>
import Vue from 'vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer)

export default {
  props: ['images'],

  data() {
    return {
      options: {
        title: false,
        movable: false,
      },
    }
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer
    },

    view(index) {
      this.$viewer.view(index)
    },
  },
}
</script>

<style>
.viewer,
.viewer > img,
.viewer-loading > img {
  display: none;
}
</style>

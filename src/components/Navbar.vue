<template>
  <v-app-bar color="primary" dark app>
    <v-toolbar-title>
      <v-icon left>mdi-camera</v-icon>
      Фото альбом
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <upload-btn></upload-btn>
  </v-app-bar>
</template>

<script>
import UploadBtn from './UploadBtn'

export default {
  components: { UploadBtn },
}
</script>

<template>
  <v-app>
    <navbar></navbar>

    <v-main>
      <photos></photos>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Photos from '@/components/Photos'

export default {
  components: { Navbar, Photos },
}
</script>

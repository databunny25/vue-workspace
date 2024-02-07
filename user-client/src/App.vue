<template>
  <div>
    <Header />
    <router-view :key="$route.fullPath" />
  </div>
</template>
<script>
import Header from './layouts/HeaderComponent.vue'

export default {
  components: {
    Header
  }
}
</script>

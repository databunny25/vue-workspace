<template>
  <footer>
    <h3>2강입니다.</h3>
  </footer>
  <div v-html="data"></div>
  <slot name="header"></slot>
  <slot></slot> <!-- html 템플릿을 그대로 사용 -->
  <slot name="footer"></slot>
</template>
<script>
  export default {
    props: ['data']
  }
</script>

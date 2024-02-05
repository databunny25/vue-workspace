<template>
  <table id="list">
    <tr>
      <td style="width:50px">글제목</td>
      <td>{{obj.title}}</td>
    </tr>
    <tr style="height: 200px">
      <td colspan="2">{{obj.content}}</td>
    </tr>
  </table>
  <button style="float:right;" v-on:click="boardList">목록</button>
</template>

<script>
export default {
  props: ['obj'],
  data () {
    return {

    }
  },
  methods: {
    boardList() {
      this.$emit('show-list')
    }
  }
}
</script>

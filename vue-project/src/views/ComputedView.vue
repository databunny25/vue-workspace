<template>
  <div>
    <h1>{{`${lastName} / ${firstName}`}}</h1>
    <h1>{{`${fullName}`}}</h1>
  </div>
  <input type="text" v-model="firstName">
</template>

<script>
export default {
  data() {
    return {
      firstName: 'kildong',
      lastName: 'Hong'
    }
  },
  computed: { //복합데이터처리
    fullName() {
      return `${this.lastName} / ${this.firstName}`
    }
  },
  watch: { //변경 이전, 이후
    firstName(curr, bef) {
      console.log(curr, bef)
    }
  }
}//test
</script>

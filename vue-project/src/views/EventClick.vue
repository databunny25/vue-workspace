<template>
  <div>
    <button v-on:click="increaseCounter">Add 1</button>
    <p>Counter is : {{counter}}</p>
    <button v-on:click="increaseCounter2(3)">Increase</button>
    <button v-on:click="one(), two()">다중호출</button>

    <select v-model="city" @change="changeSelect">
      <option value="1">서울</option>
      <option value="2">부산</option>
      <option value="3">제주</option>
    </select>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        counter: 5,
        city: '1'
      }
    },
    methods: {
      increaseCounter() {
        console.log('increaseCounter')
        this.counter = this.counter + parseInt(this.city);
      },
      increaseCounter2(num) {
        this.counter = this.counter + num;
      },
      one() {
        alert('one')
      },
      two() {
        alert('two')
      },
      changeSelect() {
        alert(this.city)
      }
    },
    beforeUpdate() {
      // 변경 이전에 필요처리를 구현
      console.log('beforeUpdate')
    },
    updated() {
      // 변경 이후에 필요처리를 구현
      console.log('updated')
    }
  }
</script>

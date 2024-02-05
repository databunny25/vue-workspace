<template>
  <content>
    <ul id="myUL">
      <li v-for="todo in list" v-bind:key="todo.no" @click="makeChecked" >{{todo.todo}}<span class="close" @click="deleteTodo(todo.no)">X</span></li>
    </ul>
  </content>
</template>

<script>
  export default {
    props: ['list'],
    data () {
      return {

      }
    },
    methods: {
      deleteTodo(no) {
        this.$emit('todo-delete', no);
      },
      makeChecked() {
        this.$emit('make-checked');
      }
    }
  }
</script>

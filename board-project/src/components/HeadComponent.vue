<template>
  <div id="myDIV" class="header">
    <h2 style="margin:5px">My To Do List</h2>
    <input type="text" id="myInput" placeholder="Title..." v-model="todo">
    <span class="addBtn" @click="addTodo">Add</span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        todo: ''
      }
    },
    methods: {
      addTodo() {
        this.$emit('add-todo', this.todo);
      }
    }
  }
</script>

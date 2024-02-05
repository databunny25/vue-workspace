<template>
  <div>
    <input type="text" v-model="todo">
    <button @click="addTodo">추가</button>
  </div>
  <div>
    <ul>
      <li v-for="todo in todoList" v-bind:key="todo.no">
        {{todo.no + ' / ' + todo.text}}
        <button v-on:click="deleteTodo(todo.no)">삭제</button>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        todo: '',//{no: 3, text: '그담할일'}, //배열의 크기로 번호 부여해서...
        todoList: [{no: 1, text: '할일1'}, {no:2, text: '할일2'}]
      }
    },
    methods: { //사용자가 값을 입력하면 todoList에 추가
      addTodo() {
        let no, text;
        no = this.todoList[this.todoList.length - 1].no + 1;
        text = this.todo;
        this.todoList.splice(no-1, 0, {no, text}); // 이 위치에다가, 이 개수만큼의 값을, 이 값으로 추가하겠다
        this.todo = '';
      },
      deleteTodo(no){
        console.log('no: ', no);
        this.todoList = this.todoList.filter(todo => todo.no == no ? false : true)
      }
    }
  }
</script>
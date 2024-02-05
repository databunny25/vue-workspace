<template>
  <div>
    <table id="list">
      <thead>
        <tr>
          <th>글번호</th>
          <th>글제목</th>
          <th>조회수</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in list" v-bind:key="board.no">
          <td>{{board.no}}</td>
          <td @click="showRead(board)">{{board.title}}</td>
          <td>{{board.view}}</td>
          <td><button @click="deleteBoard(board.no)">삭제</button></td>
        </tr>
      </tbody>
    </table>
    <button style="float: right" @click="showWrite">글쓰기</button>
  </div>
</template>

<script>
export default {
  props: ['list'], // 부모 컴포넌트의 전달값을 받는 속성
  data () {
    return {

    }
  },
  methods: {
    showWrite() {
      console.log(this);

      // bad...왜냐면 이렇게 만들면 모든 하위 컴포넌트에 일일히 적어주고, 수정해줘야하니까...중복 코드 계속 만들면 안좋다 -> 부모에 만들고 호출하자
      // this.$parent.listView = false;
      // this.$parent.writeView = true;

      // better
      // 부모컴포넌트 데이터를 변경 (직접 변경하지 않고 부모에게 요청해서 부모가 바꾸도록~)
      this.$emit('show-write') // 부모컴포넌트의 이벤트를 실행하기위한 호출.
    },
    showRead(board) {
      // 상세화면 보여주기
      this.$emit('show-read', board);
    },
    deleteBoard(no) { // 파라미터 전달. 
      this.$emit('board-delete', no);
    }
  }
}
</script>

<template>
  <header>
    <h2>간단 게시판</h2>
    <p>뷰로 작성하는 게시판</p>
  </header>
  <p>{{rootList}}</p>
  <p>{{rootStr}}</p>
</template>

<script>
  export default {
    props: ['rootData'], //바로 상위에 있는 컴포넌트에서 받을때만 가능
    inject: ['rootList', 'rootStr'] // 바로 위보다 더 위에서 받을때는 provide~inject
  }
</script>

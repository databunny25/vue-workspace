<!-- UserListView.vue -->
<template>
    <div class="container">
        <h1>전체 회원 조회</h1>
    </div>    
</template>
<script>
import axios from 'axios'

export default {    
    data(){
        return {
            userList : []
        }    
    },
    created(){ //렌더링 전에 가지고 있어야하는 데이터
        this.getUserList(); //비동기 작업
        this.getDataList(); //비동기...얘가 getUserList보다 먼저 올수도 있다!
    },
    methods : {
        async getUserList(){
            // 동기작업
            let result = await axios.get('') //함수 내에서 동기식으로 처리된다. 이 전체가 동기가 되는건 아님
                                    .catch(err => console.log(err));
            let list = result.data;
            this.userList = list;
        }
    }
}
</script>

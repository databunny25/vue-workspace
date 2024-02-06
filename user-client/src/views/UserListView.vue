<!-- UserListView.vue -->
<template>
    <div class="container">
        <h1>전체 회원 조회</h1>
        <table class="table">
            <caption>Total : {{ count }}</caption>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>ID</th>
                    <th>이름</th>
                    <th>성별</th>
                    <th>가입날짜</th>
                </tr>
            </thead>
            <tbody>
                <!-- <template> 템플릿 태그 : 화면에 출력은 안되지만 페이지에 존재는 함 (for와 if 한 태그 안에서 못쓴다...같이 쓸려면 템플릿태그 사용해야함...평소와 다르게 for-> if 순서로 쓰게됨-->
                    <tr v-bind:key="idx" v-for="(user, idx) in userList" 
                        v-on:click="goToUserInfo(user.user_id)">
                        <td>{{ user.user_no }}</td>
                        <td>{{ user.user_id }}</td>
                        <td>{{ user.user_name }}</td>
                        <td v-text="user.user_gender" />
                        <td v-text="user.join_date" />
                    </tr>
            </tbody>
        </table>
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
    computed : { // 값 : 없는 값을 만들어냄...computed 여기서 선언한 값은 어디서라도 한번은 쓰인다..감시!하고 새로운 값! return 있따
        count(){
            return this.userList.length;
        }
    },
    watch : { // 프로세스 : 기존에 있는(data, computed) 애들을 감시함...return 없다. watch를 벗어난 어디서도 존재하지 않는다. 안 씀. 감시!!
        userList(newQuestion, oldQuestion){
            console.log('이전 : ', newQuestion);
            //alert('데이터가 변경되었습니다.');
            console.log('이후 : ', oldQuestion);
        }    
    },
    created(){ //렌더링 전에 가지고 있어야하는 데이터
        this.getUserList(); //비동기 작업
        //this.getDataList(); //비동기...얘가 getUserList보다 먼저 올수도 있다!
    },
    methods : {
        async getUserList(){
            // 동기작업
            let result = await axios.get('/api/users') //함수 내에서 동기식으로 처리된다. 이 전체가 동기가 되는건 아님
                                    .catch(err => console.log(err));
            let list = result.data;
            this.userList = list;
        },
        goToUserInfo(userId){
            this.$router.push({ path: '/userInfo', query : { "userId" : userId }}); //이 라우터는 무조건 get방식 (body존재 X) //{ "uId" : userId } 이렇게 가도 상관없다. but 이 정보 받는 새롭게 불려지는 컴포넌트는 이게 뭔 정보인지 알수있어야한다!
            //this.$router.push({ name: 'userInfo', query : { "userId" : userId }}); //path 또는 name으로 지정 가능....path는 복잡하면 찾기 어려울 수 있으니 name도 가능 name은 유니크 해야한다 
        }
    }
}
</script>

<!-- UserInfoView.vue -->
<template>
    <div class="container">
        <h1>회원 정보 조회</h1>
        <div class="row">
            <table class="table">
                <tr>
                    <th class="text-right table-primary">No.</th>
                    <td class="text-center">{{ userInfo.user_no }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">ID</th>
                    <td class="text-center">{{ userInfo.user_id }}</td>
                </tr>                
                <tr>
                    <th class="text-right table-primary">Password</th>
                    <td class="text-center">{{ userInfo.user_pwd }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">이름</th>
                    <td class="text-center">{{ userInfo.user_name }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">성별</th>
                    <td class="text-center">{{ userGender }}</td> <!-- computed니까 값처럼 쓰면 된다 -->
                </tr>
                <tr>
                    <th class="text-right table-primary">나이</th>
                    <td class="text-center">{{ userInfo.user_age }}</td>
                </tr>
                <tr>
                    <th class="text-right table-primary">가입날짜</th>
                    <td class="text-center">{{ joinDate }}</td> <!-- computed니까 값처럼 쓰면 된다 -->
                </tr>
            </table>
        </div>
        <div class="row">
            <button class="btn btn-info col-4" @click="goToUpdate(userInfo.user_id)">수정</button>
            <router-link to="/" class="btn btn-success col-4">목록</router-link>
            <button class="btn btn-warning col-4" @click="deleteInfo(userInfo.user_id)">삭제</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return {
            userInfo : {}
        }
    },
    computed : {
        // 성별
        userGender(){ //값처럼 쓰면 된다
            //1st_way
            let result = null;
            if(this.userInfo.user_gender == "M"){
                result = "남";
            }else if(this.userInfo.user_gender == "F"){
                result = "여";
            }
            return result;

            //2nd_way...자바스크립트는 이렇게도 사용가능...정확하게 이해못했으면 쓰지마
            // let map = {
            //     "M" : "남",
            //     "F" : "여"
            // };
            // return map[this.userInfo.user_gender];
        },

        // 가입날짜 : 년 월 일
        joinDate(){
            let result = null;
            if(this.userInfo.join_date != null){
                let date = new Date(this.userInfo.join_date);
                let year = date.getFullYear();
                let month = ('0' + (date.getMonth() + 1)).slice(-2);
                let day = ('0' + date.getDate()).slice(-2);

                result = `${year}년 ${month}월 ${day}일`;
            }
            return result;
        }
    },
    created(){
        let searchNo = this.$route.query.userId; // $route : 지금 컴포넌트에 전달된 통신 정보를 들고있다
        //console.log(searchNo);
        this.getUserInfo(searchNo);
    },
    methods: {
        async getUserInfo(userId){ // 서버에서 확인해보기 http://localhost:3000/users/admin 주소가 여기구나!
            let result = await axios.get('/api/users/'+userId) // `/api/users/${userId}` //함수 내에서 동기식으로 처리된다. 이 전체가 동기가 되는건 아님
                              .catch(err => console.log(err));
            let info = result.data;
            //console.log(info);
            this.userInfo = info;
        },
        goToUpdate(userId){
            // 수정 폼 컴포넌트 호출
            console.log(userId);
            // this.$router.push({ path: '/userUpdate', query : { "userId" : userId }}) //query : { userId }
            this.$router.push({ path: '/userForm', query : { "id" : userId }}) //query : { userId }

        },
        deleteInfo(userId){
            // 서버의 해당 데이터를 삭제
            console.log(userId);

            axios
                .delete('/api/users/'+ this.userInfo.user_id) //delete : 기본은 GET방식 참고하므로 바디가 없지만 but 프레임워크 따라 다르다!!!!!!!!!!!!!! 있을수도...
                .then(result => {
                    //let delNo = result.data.affectedRows;
                    //console.log(delNo);
                    
                    if( result.data.affectedRows != 0 && result.data.changedRows == 0){
                        alert('삭제되었습니다');
                        this.$router.push({ path : '/' })
                    }else{
                        alert(`삭제되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`);
                    }
                })
        }
    }
}
</script>

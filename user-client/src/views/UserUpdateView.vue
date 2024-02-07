<!-- UserUpdateView.vue -->
<template>
    <div class="container">
        <h1></h1>
        <div class="row">
            <table class="table">
                <tr>
                    <th class="text-right table-primary">No.</th>
                    <td class="text-center">
                        <input class="form-control" type="number" v-model="userInfo.user_no" readonly>
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">ID</th>
                    <td class="text-center">
                        <input class="form-control" type="text" v-model="userInfo.user_id" readonly>
                    </td>
                </tr>                
                <tr>
                    <th class="text-right table-primary">Password</th>
                    <td class="text-center">
                        <input class="form-control" type="password" v-model="userInfo.user_pwd">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">이름</th>
                    <td class="text-center">
                        <input class="form-control" type="text" v-model="userInfo.user_name">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">성별</th>
                    <td class="text-center">
                        <input type="radio" value="M" v-model="userInfo.user_gender"> 남
                        <input type="radio" value="F" v-model="userInfo.user_gender"> 여
                        <!--<input type="checkbox" true-valule="" false-value="" v-model="chkVal">-->
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">나이</th>
                    <td class="text-center">
                        <input class="form-control" type="number" v-model="userInfo.user_age" min="0" max="150">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">가입일자</th>
                    <td class="text-center">
                        <input class="form-control" type="date" v-model="userInfo.join_date"> <!-- yyyy-MM-dd-->
                    </td>
                </tr>
            </table>
        </div>
        <div class="row">
            <button class="btn btn-info" @click="updateInfo(userInfo.user_id)">저장</button>        
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default{
    data() {
        return {
            userInfo : { // 내부 내용은 없어도 괜찮다...but 헷갈리니까 적어주기
                user_no : null, // 필드명은 db칼럼명과 동일해야함!! 서버랑 통신하기 위해서니까 서버가 원하는 형태로 줘야해!!!
                user_id : "",
                user_pwd : "",
                user_name : "",
                user_gender : "",
                user_age : null, //""이렇게 공백으로 두면 db에 0으로 인식...null로 둬라!
                join_date : null
            }
        }
    },
    created(){
        let searchNo = this.$route.query.userId; // $route : 지금 컴포넌트에 전달된 통신 정보를 들고있다
        //console.log(searchNo);
        this.getUserInfo(searchNo);
    },
    methods: {
        async getUserInfo(userId){ 
            // 서버에서 확인해보기 http://localhost:3000/users/admin 주소가 여기구나!
            // 1. '/api/users/' + userId
            // 2. `/api/users/${userId}` 
            let result = await axios.get('/api/users/'+userId) //함수 내에서 동기식으로 처리된다. 이 전체가 동기가 되는건 아님
                              .catch(err => console.log(err));
            let info = result.data;
            
            let newDate = this.dateFormat(info.join_date); //mySQL 기본 날짜 포맷은 '2024-01-09 15:00:00'
            info.join_date = newDate;

            this.userInfo = info;
        },
        dateFormat(value){  // mySQL에서 데이터를 받아왔지만 포맷이 달라서 출력을 못 하니까 가공해준다!
            let result = null;
            if(value != null){
                let date = new Date(value);
                let year = date.getFullYear();
                let month = ('0' + (date.getMonth() + 1)).slice(-2);
                let day = ('0' + date.getDate()).slice(-2);
                result = `${year}-${month}-${day}`;
            }
            return result;
        },
        updateInfo(){
            if(!this.validation()) return; //메소드 안에서 메소드 안의 함수를 호출하려면 this사용

            // 2) ajax
            // 2-1) 실제 보낼 데이터 선별
            let data = this.getSendData();

            // 2-2) axios를 이용해 ajax
            axios
                .put(`/api/users/${this.userInfo.user_id}`, data) //data는 객체거나 배열이어야 한다....axios는 json으로 자동변환하므로
                .then(result => {
                    // 3) 결과처리
                    //console.log(result);
                    let count = result.data.changedRows; // changedRows : 수정에서만 있다!
                    if(count == 0){
                        alert(`수정되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`)
                    }else{
                        alert(`정상적으로 수정되었습니다.`);
                        this.$router.push({ path : '/userInfo', query : { "userId" : this.userInfo.user_id}});
                    }
                })
                .catch(err => console.log(err));

            },
            validation(){ //있어도 되고 없어도 된다~
                if(this.userInfo.user_pwd == ""){
                    alert('비밀번호가 입력되지 않았습니다');
                    return false;
                }
                if(this.userInfo.user_name == ""){
                    alert('이름이 입력되지 않았습니다');
                    return false;
                }
                return true;
            },
            getSendData(){
                let obj = this.userInfo;
                let delData = ["user_no", "user_id"]; //이 두가지는 수정될 데이터에서 제외되어야 한다!  보내긴 해야하는데 body에 담으면 안됨!
                let newObj = {};
                
                let isTargeted = null;    
                for( let field in obj ){ 
                    isTargeted = false;
                    for(let target of delData){
                        if(field == target) {
                            isTargeted = true;
                            break;
                        }            
                    }
                    if(!isTargeted){
                        newObj[field] = obj[field];
                    }
                }
                let sendData = {
                    "param" : newObj
                }
                return sendData;
            }
    }
}
</script>

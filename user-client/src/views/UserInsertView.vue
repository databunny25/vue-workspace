<!-- UserInsertView.vue -->
<template>
    <div class="container">
        <h1>회원 정보 등록</h1>
        <div class="row">
            <table class="table">
                <tr>
                    <th class="text-right table-primary">No.</th>
                    <td class="text-center">
                        <input class="form-control" type="number" v-model="userInfo.user_no">
                    </td>
                </tr>
                <tr>
                    <th class="text-right table-primary">ID</th>
                    <td class="text-center">
                        <input class="form-control" type="text" v-model="userInfo.user_id">
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
            <button class="btn btn-info" @click="insertInfo()">저장</button>        
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default{
    data(){
        return {
            //chkVal : "아니오",
            userInfo : {
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
        this.userInfo.join_date = this.getToday();
    },
    methods: {
        getToday(){
            let date = new Date();
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        insertInfo(){
            // 1) 유효성 체크
            if(!this.validation()) return; //메소드 안에서 메소드 안의 함수를 호출하려면 this사용

            // 2) ajax
            // 2-1) 실제 보낼 데이터 선별
            let data = this.getSendData();

            // 2-2) axios를 이용해 ajax
            axios
                .post('/api/users', data) //data는 객체거나 배열이어야 한다....axios는 json으로 자동변환하므로
                .then(result => {
                    // 3) 결과처리
                    console.log(result);
                    let user_no = result.data.insertId;
                    if(user_no == 0){
                        alert(`등록되지 않았습니다.\n메세지를 확인해주세요\n${result.data.message}`)
                    }else{
                        alert(`정상적으로 등록되었습니다.`);
                        this.userInfo.user_no = user_no;
                    }
                })
                .catch(err => console.log(err));

        },
        validation(){
            if(this.userInfo.user_id == ""){
                alert('아이디가 입력되지 않았습니다');
                return false;
            }
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
        getSendData(){ //다시보기
            let obj = this.userInfo;
            let delData = ["user_no"];
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

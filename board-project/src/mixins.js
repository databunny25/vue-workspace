// mixin.js

export default {
    // 컴포넌트 공동 기능
    methods : {
        $getToday(format){ //믹스인은 다른 컴포넌트의 함수와 충돌을 막기 위해...$로 이름 사용
            // yyyy-MM-dd
            let today = new Date();
            let year = today.getFullYear();
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);

            let result = format.replace('yyyy', year)
                               .replace('MM', month)
                               .replace('dd', day);
            return result;
        }
    }, 
    // 각 라이프사이클 훅에 공통 코드
    created() {
        console.log("component Created");
    }, 
    mounted() {
        console.log("DOM mounted");
    }
}
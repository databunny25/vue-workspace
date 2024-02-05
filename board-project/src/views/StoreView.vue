<template>
    <div>
        <form>
            <label>
                제품ID: 
                <input type="text" v-model="productInfo.product_id">
            </label>
            <br>
            <label>
                제품명: 
                <input type="text" v-model="productInfo.product_name">
            </label>
            <br>
            <label>
                카테고리: 
                <input type="radio" value="A" v-model="productInfo.category"> A
                <input type="radio" value="B" v-model="productInfo.category"> B
            </label>
            <br>
            <button type="button" @click="addCart">추가</button>
        </form>
        <table>
            <thead>
                <caption>total : {{total}}</caption>
                <tr>
                    <th>카테고리</th>
                    <th>제품ID</th>
                    <th>제품명</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="idx" v-for="(info, idx) in productList">
                    <td>{{ info.category }}</td>
                    <td>{{ info.product_id }}</td>
                    <td>{{ info.product_name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                productInfo : {
                    product_id : "",
                    product_name : "",
                    category : "A"
                }
            }
        },
        computed : { //computed는 무조건 readonly (수정 불가능)
            productList(){
                return this.$store.state.cart; // cart 정보 전체가 필요한 경우
            },
            total(){
                return this.$store.getters.cartCount; //
            }
        },
        methods : {
            addCart(){
                let obj = {
                    product_id : this.productInfo.product_id,
                    product_name : this.productInfo.product_name,
                    category : this.productInfo.category,
                }

                //commit: mutations호출 (actions: dispatch?호출)
                //addProduct 를 호출할때 직접 호출이 아니라 커밋에 의존에서 호출...우리는 변수 하나만 전달했지만 commit내부에서 가진 state와 함께 (state, info)로 함수에 전달해서 실행 
                //this.$store.commit('addProduct', this.productInfo); // vuex에서...이렇게 쓰면 안된다! 참조타입은 복사가 아니라서...실시간으로 갱신되더라? ...참조타입은 값을 넘길 대상에 대해서 새로 obj로 복사하고 그걸 넘겨줘야함. 직접 주면 안돼!
                //this.$store.commit('addProduct', obj);
                //this.$store.commit('increment');

                this.$store.dispatch('addProduct', obj);
            }
        }
    }
</script>

<style scoped>
    table, th, td{
        border:1px solid #000;
    }
</style>

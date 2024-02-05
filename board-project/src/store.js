// store.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state() { //함수...저장소. vue가 가진 data와 같은 구조 (데이터 옵션이랑 같다고 보면됨...저장소에 저장하고 싶은 데이터를 적어주면 된다)
        return { // 데이터 옵션처럼 CRUD는 가능하지만 but 직접적인 조작은 하지않는다(제한을 검)
            cart : [
                {
                    product_id : 1,
                    product_name : '아이폰 거치대',
                    category : 'A'
                }
            ],
            count : 0
        }
    },
    getters : { //객체...computed옵션처럼 보면된다 가지고 오고 싶은 데이터를 정의
        cartCount : (state) => {
            return state.cart.length;
        }
    },
    mutations : { //객체... state가 가진 값의 실질적인 데이터 조작
        increment(state) {
            state.count++;
        },
        addProduct(state, info){
            state.cart.push(info);
        }
    },
    actions : { //객체...
        addProduct(context, info) { //state를 내장하고 있는 context 자체를 불러옴
            context.commit('addProduct', info); //저장소 정보 전체를 불러옴 직접 state의 데이터 못 건들고 mutation이 가지고 있는 기능을 호출해서 commit통해서 반영하므로
            setTimeout(()=>{
                context.commit('increment');
            }, 1000);
        }
    },
    plugins : [ createPersistedState() ] //프로젝트 너무 커지면...persistedstate npm에 모듈이 있다. 그걸 이용해 쪼갠다?
})
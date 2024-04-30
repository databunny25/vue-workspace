## cdn 방식

[vue loader](https://github.com/FranckFreiburger/vue3-sfc-loader)  
[vue quick start](https://v3-docs.vuejs-korea.org/guide/quick-start.html)  

## json
json은 데이터 교환하기 위한 객체 표기법으로서 {}, [] 기호를 사용함
 - object : { } ,  {"필드명":값, ....   }  
 - array : [], [ 값, ... ]  
 - 값에는 number, string, object, array 등이 올 수 있다.

```javascript
let name="aaa"
let age=10
let obj1 = {"name":name, "age":Age} 
let obj2 = {name, age}    //축약형

let obj3 = {"name":name, "getName":function(){} }
let obj4 = {name, getName(){     } }    //축약형

//{ data(){}  }   =>   {data : function(){ }}
```

## instance (참조:00instance.html)

## life cycle (참조:01lift.html)

## data binding (참조 : 02binding.html)
Vue는 컴포넌트 인스턴스의 데이터를 서술적으로 렌더링된 DOM에 바인딩할 수 있는 HTML 기반 템플릿 문법을 사용합니다.
<pre>
태그내용  v-text  <== innerText  
          v-html  <== innerHTML  
    속성  v-bind
   input  v-model  (양방향 바인딩)
</pre>

## event (03event.html, 04bindingEvent.html)
- @click.prevent :  event.preventDefault()  
- @click.stop : event.stopPropagation()
  : submit, a  


## 제어문 (05controll.html)


## fetch (06bindingFetch.html)


## component (10component.html)


## router (11router.html)
- this.$route.params.username
- this.$router.push('/login')

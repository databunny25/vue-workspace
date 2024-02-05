<template>
  <select v-model="city">
    <option value="02">서울</option>
    <option value="03">부산</option>
    <option value="04">제주</option>
  </select>
  <p>{{city}}</p>
  <label>선택: <input type="checkbox" true-value="yes" false-value="no" v-model="checked"></label> 
  <p>선택값: {{checked}}</p>

  <label><input type="checkbox" v-model="checkItems" value="01">서울</label>
  <label><input type="checkbox" v-model="checkItems" value="02">부산</label>
  <label><input type="checkbox" v-model="checkItems" value="01">제주</label>
  <label><input type="checkbox" v-model="checkItems" value="02">대전</label>
   <p>선택값: {{checkItems}}</p>
</template>

<script>
export default {
  data(){ //속성
    return {
      city: '04',
      checked: 'yes',
      checkItems: [] //''이렇게 두면 모든 값이 같아진다. 서로 다른 value의 값을 가져와서 담으려면 배열로 선언~
    }
  }
}
</script>
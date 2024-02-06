const { defineConfig } = require('@vue/cli-service')
const target = "http://localhost:3000";

module.exports = defineConfig({
  transpileDependencies: true,
  devServer : {
    proxy : {
      '^/api' : {
        target,
        changeOrigin : true,
        ws : false, //웹소켓...디폴트로 웹소켓이 사용되도록 되어있으니까...이거 빼기
        pathRewrite : { '^/api' : '/'} //origin 뒤의 경로를 오버롸이팅 하겠다?  ^/api를 빼고 /로 덮어쓰겠다...?
      }
    }
  }
})

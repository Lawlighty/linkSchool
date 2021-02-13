# linkSchool
极客学院服务端(管理端/客户端)

## 启动 ( server 文件夹下)
* npm start -w admin (管理端)
* npm start -w server (客户端)
### server
* admin 管理端  swagger 地址 http://localhost:xxxx/api-docs
* server 客户端 swagger 地址 http://localhost:xxxx/api-docs

### 用户注册 使用 bcryptjs
* npm i bcryptjs 
* npm i @types/bcryptjs

### passport 登录策略
* npm i @nestjs/jwt (生成token)
* npm i @nestjs/passport
* npm i passport
* npm i @types/passport
* npm i passport-local (登录)
* npm i @types/passport-local
* npm i passport-jwt (获取token)
* npm i @types/passport-jwt

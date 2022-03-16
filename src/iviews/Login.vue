<template>
  <div class="login-page">
    <a-row>
      <a-col :span="12" class="aside">
        <div class="aside-inner">
          <router-link to="/">
            <img alt="细腻lego" src="" class="logo-img" />
          </router-link>
          <h2>工具</h2>
          <span class="text-white-70">test</span>
        </div>
      </a-col>
      <a-col :span="12" class="login-area">
        <a-form
          ref="formRef"
          :model="formState"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="手机号码"  name="cellphone">
            <a-input placeholder="phone number" v-model:value="formState.cellphone">
              <template v-slot:prefix>
                <UserOutlined style="color:red" />
              </template>
            </a-input>
          </a-form-item>
           <a-form-item label="手机号码2"  name="cellphone2">
            <a-input placeholder="phone number" v-model:value="formState.cellphone2">
              <template v-slot:prefix>
                <UserOutlined style="color:red" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button @click="login" type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>
<script src="./Login.ts" />
<style>
.logo-area {
  position: absolute;
  top: 30px;
  width: 150px;
}
.aside {
  height: 100vh;
  background-color: #1a1919;
  background-size: cover;
  background-repeat: no-repeat;
}
.aside .logo-img {
  width: 200px;
  margin-bottom: 20px;
}
.aside h2 {
  color: #cccccc;
  font-size: 29px;
}
.aside-inner {
  width: 60%;
  text-align: center;
}
.login-area {
  height: 100vh;
}
.login-area .ant-form {
  width: 350px;
}
.text-white-70 {
  color: #999;
  display: block;
  font-size: 19px;
}
.aside,
.login-area {
  display: flex !important;
  align-items: center;
  justify-content: center;
}
.login-area h2 {
  color: #333333;
  font-size: 29px;
}
.login-area .subTitle {
  color: #666666;
  font-size: 19px;
}
.login-area .ant-form-item-label {
  display: none;
}
.login-area .ant-input-prefix {
  left: auto;
  right: 30px;
  font-size: 19px;
}
.login-area .ant-input {
  font-size: 17px;
  padding: 20px 45px 20px 30px;
}
</style>

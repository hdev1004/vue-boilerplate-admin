<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { success, error, warning } from '@/utils/vueAlert'
import { useRouter } from 'vue-router'
const id = ref('')
const pw = ref('')

const router = useRouter()

const keyPress = (e: any) => {
  if (e.key === 'Enter') {
    login()
  }
}

const login = async () => {
  let data = null

  try {
    data = await AxiosInstance.post('/api/user-service/admin/login', {
      loginId: id.value,
      password: pw.value
    })
    console.log(data.headers.token)
    window.localStorage.setItem('memberToken', data.headers.token)
    router.push('/')
    success('글루따띠온에 오신것을 환영합니다.')
  } catch (err: any) {
    console.log(err)
    if (err.response.request.status === 400) {
      warning('아이디, 비밀번호를 확인해주세요')
    } else {
      error('오류가 발생했습니다')
    }
  }
}
</script>

<template>
  <div className="canvas-wrapper">
    <div className="circle circle-0" />
    <div className="circle circle-1" />
    <div className="circle circle-2" />
    <div className="circle circle-3" />
  </div>

  <div class="index">
    <section class="login_container">
      <div class="login_logo">로그인</div>
      <div class="login_input">
        <div class="login_input_group">
          <div class="login_text" v-on:keypress="keyPress">아이디</div>
          <input v-model="id" />
        </div>

        <div class="login_input_group">
          <div class="login_text">비밀번호</div>
          <input v-model="pw" type="password" v-on:keypress="keyPress" />
        </div>
      </div>

      <div class="login_btn" @click="login">로그인</div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import url('./login.scss');
</style>

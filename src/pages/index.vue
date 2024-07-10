<script setup lang="ts">
const router = useRouter()
import { warning } from '@/utils/vueAlert'
let now = new Date()

let memberTokenString = localStorage.getItem('memberToken')
let memberToken = memberTokenString ? JSON.parse(memberTokenString) : undefined
if (!memberToken) {
  warning('로그인을 진행해주세요.')
  router.push('/login')
} else if (now.getTime() > memberToken.expires) {
  warning('로그인이 만료되었습니다.')
  router.push('/login')
}
</script>

<template>
  <section>
    <div></div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./index.scss');
</style>

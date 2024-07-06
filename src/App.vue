<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { error, warning } from './utils/vueAlert'

const route = useRoute()
const router = useRouter()
const isNavShow = ref(false)

const handleRouteChange = (newRoute: any) => {
  let now = new Date()
  if (newRoute.path === '/login') {
    isNavShow.value = false
  } else {
    // 다른 경로에 대한 작업 수행

    let memberTokenString = localStorage.getItem('memberToken')
    let memberToken = memberTokenString ? JSON.parse(memberTokenString) : undefined

    if (!memberToken) {
      warning('로그인을 진행해주세요.')
      router.push('/login')
    } else if (now.getTime() > memberToken.expires) {
      warning('로그인이 만료되었습니다.')
      router.push('/login')
    }

    isNavShow.value = true
  }
}

watch(
  () => route.path,
  (newPath) => {
    handleRouteChange(route)
  }
)
</script>

<template>
  <section v-if="isNavShow">
    <Navbar />
  </section>

  <section class="contents">
    <div v-if="isNavShow" class="blank"></div>
    <RouterView />
  </section>
</template>

<style lang="scss" scoped>
.contents {
  display: flex;
}
.blank {
  width: 232px;
  min-width: 232px;
  height: 100vh;
}
</style>

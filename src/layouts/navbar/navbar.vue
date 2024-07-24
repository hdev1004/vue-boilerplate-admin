<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

let menu = ref('')
const menuClick = (title: string) => {
  menu.value = title
  if (title === '제품등록') {
    router.push('/upload')
  } else if (title === '제품목록') {
    router.push('/itemlist')
  } else if (title === '배너관리') {
    router.push('/banner')
  } else if (title === '스타일관리') {
    router.push('/style')
  } else if (title === '사용자관리') {
    router.push('/user')
  } else if (title === '쿠폰관리') {
    router.push('/coupon')
  } else if (title === '문의관리') {
    router.push('/inquiry')
  }
}

const homeClick = () => {
  router.push('/')
  menu.value = 'home'
}
</script>

<template>
  <section class="navbar_container">
    <div class="navbar_title" @click="homeClick">글루따띠온</div>
    <div class="navbar_menu_list">
      <div
        :class="`navbar_menu ${menu === '제품등록' ? 'navbar_menu_active' : ''}`"
        @click="menuClick('제품등록')"
      >
        제품 등록
      </div>
      <div
        :class="`navbar_menu ${menu === '제품목록' ? 'navbar_menu_active' : ''}`"
        @click="menuClick('제품목록')"
      >
        제품 목록
      </div>
      <div
        :class="`navbar_menu ${menu === '배너관리' ? 'navbar_menu_active' : ''}`"
        @click="menuClick('배너관리')"
      >
        배너 관리
      </div>
      <div
        :class="`navbar_menu ${menu === '스타일관리' ? 'navbar_menu_active' : ''}`"
        @click="menuClick('스타일관리')"
      >
        카테고리 관리
      </div>
      <div
        :class="`navbar_menu ${menu === '문의관리' ? 'navbar_menu_active' : ''}`"
        @click="menuClick('문의관리')"
      >
        문의 관리
      </div>
      <div
        :class="`navbar_menu ${menu === '쿠폰관리' ? 'navbar_menu_active' : ''}`"
        @click="menuClick('쿠폰관리')"
      >
        쿠폰 관리
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./navbar.scss');
</style>

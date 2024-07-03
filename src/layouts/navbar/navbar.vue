<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

let menu = ref('')
const menuClick = (title: string) => {
  menu.value = title
  if (title === '제품등록') {
    router.push('/upload')
  }
}
</script>

<template>
  <section class="navbar_container">
    <div class="navbar_title">글루따띠온</div>
    <div class="navbar_menu_list">
      <div
        :class="`navbar_menu ${menu === '제품등록' ? 'navbar_menu_active' : ''}`"
        @click="menuClick('제품등록')"
      >
        제품 등록
      </div>
      <div
        :class="`navbar_menu ${menu === '배너관리' ? 'navbar_menu_active' : ''}`"
        @click="menuClick('배너관리')"
      >
        배너 관리
      </div>
      <div
        :class="`navbar_menu ${menu === '사용자관리' ? 'navbar_menu_active' : ''}`"
        @click="menuClick('사용자관리')"
      >
        사용자 관리
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

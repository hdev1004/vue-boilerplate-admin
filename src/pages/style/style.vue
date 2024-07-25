<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success } from '@/utils/vueAlert'

const styleList = ref<Array<any>>([])
const addInput = ref('카테고리 추가 및 변경은 관리자에게 문의 바랍니다.')

const getStyleList = async () => {
  try {
    let data = await AxiosInstance.get('/api/product-service/products/types')
    if (data === null) return
    console.log(data.data)
    styleList.value = data.data.types
  } catch (err: any) {
    error(err.response.message)
  }
}

const addStyle = (event: any) => {
  if (event.key === 'Enter') {
    if (addInput.value.trim() === '') return
    styleList.value.push({
      type: addInput.value
    })

    addInput.value = ''
  }
}

const saveClick = () => {
  success('저장이 완료되었습니다')
}

const removeStyle = (index: number) => {
  styleList.value.splice(index, 1)
}

getStyleList()
</script>

<template>
  <section class="style_container">
    <section class="title_container">
      <div class="title_logo">카테고리 관리</div>
    </section>

    <section class="style_input">
      <input v-model="addInput" disabled />
      <div>Email : h.dev@kakao.com</div>
      <div>P.H : 010-2202-4671</div>
    </section>

    <section>
      <div class="list_row" v-for="(style, index) in styleList" v-bind:key="`item${index}`">
        <input :value="style.type" disabled />
      </div>
    </section>

    <section></section>
  </section>
</template>

<style lang="scss" scoped>
@import url('style.scss');
</style>

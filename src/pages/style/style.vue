<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success } from '@/utils/vueAlert'

const styleList = ref<Array<any>>([])
const addInput = ref('')

const getStyleList = async () => {
  try {
    let data = await AxiosInstance.get('/api/product-service/products/types')
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
      <div class="title_logo">스타일 관리</div>
    </section>

    <section class="style_input">
      <input
        placeholder="저장할 스타일을 입력하세요 (Enter)"
        @keypress="addStyle"
        v-model="addInput"
      />
    </section>

    <section>
      <div class="list_row" v-for="(style, index) in styleList" v-bind:key="`item${index}`">
        <input :value="style.type" />
        <div class="item_close" @click="removeStyle(index)">
          <img src="@/assets/images/closeWhite.png" />
        </div>
      </div>
    </section>

    <section>
      <div class="save_btn" @click="saveClick">저장</div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@import url('style.scss');
</style>

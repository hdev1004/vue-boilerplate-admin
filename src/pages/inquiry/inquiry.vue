<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error } from '@/utils/vueAlert'
const data = ref<Array<any>>([])
const clickItemIndex = ref(-1)
const cilckItem = ref({})
const inquryList = ref([])

const itemClick = (item: object, index: number) => {
  clickItemIndex.value = index
  cilckItem.value = item

  getInquiryList()
}

const getInquiryList = async () => {
  let res = null
  console.log(clickItemIndex.value)
  try {
    res = await AxiosInstance.get(`/api/product-service/products/${clickItemIndex.value}/inquires`)
    inquryList.value = res.data.inquires
    console.log('Inquiry : ', inquryList.value)
  } catch (err: any) {
    error('오류가 발생했습니다.')
    console.log(err)
  }
}

const getItemList = async () => {
  let res = null
  try {
    res = await AxiosInstance.get('/api/product-service/products/search?page=1&size=10')
    data.value = res.data.contents
    console.log(data.value)
  } catch (err: any) {
    console.log(err)
    error('데이터를 불러오는 도중 오류가 발생했습니다.')
  }
}

getItemList()
</script>

<template>
  <section class="inquiry_container">
    <div>
      <section class="title_container">
        <div class="title_logo">제품 목록</div>
      </section>

      <div class="item_list">
        <div class="item_list_header">
          <div class="image">사진</div>
          <div>제품 이름</div>
          <div>제품 설명</div>
        </div>

        <div
          :class="`item_list_contents ${
            clickItemIndex === index ? 'item_list_contents_active' : ''
          }`"
          @click="itemClick(item, index)"
          v-for="(item, index) in data"
          v-bind:key="`item${index}`"
        >
          <div class="image">
            <img :src="`/api/product-service/products/images/${item.thumbnailImageId}`" />
          </div>
          <div>{{ item.name }}</div>
          <div>{{ item.description }}</div>
        </div>
      </div>
    </div>
    <div>
      <section class="title_container">
        <div class="title_logo">문의 목록</div>
      </section>

      <div class="inquiry_table">
        <div class="inquiry_row">
          <a-spin tip="데이터를 불러오고 있습니다">
            <div>문의 내용입니다</div>
            <div>답변 작성 중 입니다</div>
          </a-spin>

          <div v-for="(inquryItem, index) in inquryList" v-bind:key="`inquriyItem${index}`">
            <div>문의 내용입니다</div>
            <div>답변 작성 중 입니다</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./inquiry.scss');
</style>

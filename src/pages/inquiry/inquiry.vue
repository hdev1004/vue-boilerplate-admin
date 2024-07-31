<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success } from '@/utils/vueAlert'
const data = ref<Array<any>>([])
const clickItemIndex = ref(-1)
const cilckItem = ref<any>({})
const inquryList = ref<Array<any>>([])
const loading = ref(false)
const leftLoading = ref(false)
const current = ref(1)

const itemClick = (item: object, index: number) => {
  clickItemIndex.value = index
  cilckItem.value = item
  console.log(cilckItem.value)

  getInquiryList()
}

const changePage = async (e: any) => {
  leftLoading.value = true
  console.log(current.value)
  let res = null
  try {
    res = await AxiosInstance.get(
      `/api/product-service/products/search?page=${current.value}&size=5`
    )
    if (res === null) return
    data.value = res.data.contents
    leftLoading.value = false
    console.log(data.value)
  } catch (err: any) {
    console.log(err)
    error('데이터를 불러오는 중 오류가 발생했습니다.')
  }
}

const answerClick = async (index: number, itemId: number) => {
  let data = <HTMLInputElement>document.querySelector('#answer' + index)
  console.log('data : ', data)
  console.log('ITEM ID : ', itemId)
  try {
    let res = await AxiosInstance.post(`/api/product-service/products/inquires/${itemId}/answers`, {
      content: data.value
    })
    if (res === null) return

    success('문의 답변이 등록되었습니다.')
    getInquiryList()
  } catch (err: any) {
    error('답변 등록중 오류가 발생했습니다')
    console.log(err)
  }
}

const deleteClick = async (itemId: number) => {
  try {
    let res = await AxiosInstance.delete(`/api/product-service/products/inquires/answers/${itemId}`)
    if (res === null) return

    success('문의 답변이 삭제되었습니다.')
    getInquiryList()
  } catch (err: any) {
    error('답변 삭제 중 오류가 발생했습니다')
    console.log(err)
  }
}

const getInquiryList = async () => {
  let res = null
  loading.value = true
  try {
    res = await AxiosInstance.get(
      `/api/product-service/products/${cilckItem.value.productId}/inquires`
    )
    if (res === null) return
    inquryList.value = res.data.inquires
    loading.value = false
    console.log('DATA : ', inquryList.value)
  } catch (err: any) {
    error('오류가 발생했습니다.')
    console.log(err)
  }
}

const getItemList = async () => {
  let res = null
  try {
    res = await AxiosInstance.get('/api/product-service/products/search?page=1&size=5')
    if (res === null) return
    data.value = res.data.contents
    console.log(data.value)
  } catch (err: any) {
    console.log(err)
    error('데이터를 불러오는 중 오류가 발생했습니다.')
  }
}

getItemList()
</script>

<template>
  <section class="inquiry_container">
    <a-spin :spinning="leftLoading">
      <div class="item_big_list">
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

          <a-pagination
            @change="changePage"
            v-model:current="current"
            :total="10"
            :defaultPageSize="1"
            class="pagination"
          />
        </div>
      </div>
    </a-spin>
    <div class="inquiry_list">
      <section class="title_container">
        <div class="title_logo">문의 목록</div>
      </section>

      <div class="inquiry_table">
        <a-spin :spinning="loading" tip="데이터를 불러오고 있습니다">
          <div v-if="inquryList.length === 0">
            <div>등록된 문의가 없습니다</div>
          </div>
          <div class="inquiry_row" v-for="(item, index) in inquryList" v-bind:key="`item${index}`">
            <div class="inquiry_nickname">
              <b>{{ item.memberName }}</b
              >님의 문의
            </div>
            <div class="inquiry_q">{{ item.content }}</div>
            <textarea
              :disabled="item.answer"
              :value="item?.answer?.content"
              :id="`answer${index}`"
              class="inquiry_a"
              placeholder="답변을 작성해주세요"
              spellcheck="false"
            ></textarea>
            <div class="btn_group">
              <div
                v-if="!item.answer"
                class="inquiry_btn"
                @click="answerClick(index, item.productInquireId)"
              >
                답변 달기
              </div>
              <div v-if="item.answer" class="inquiry_disabled_btn">답변 달기</div>

              <div
                v-if="item.answer"
                class="inquiry_delete_btn"
                @click="deleteClick(item.productInquireId)"
              >
                삭제
              </div>
            </div>
          </div>
        </a-spin>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./inquiry.scss');
</style>

<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success } from '@/utils/vueAlert'
const loading = ref(false)

const AllChecked = ref(false)
const data = ref<Array<any>>([])
const searchInput = ref('')
const router = useRouter()
const route = useRoute()

const checked = ref<{
  [key: string]: boolean
}>({})
const current = ref<any>(1)
const prevKeyword = ref<any>('')
if (route.query.page) {
  current.value = parseInt(route.query.page)
}
if (route.query.keyword) {
  prevKeyword.value = route.query.keyword
}

const changePage = async () => {
  loading.value = true
  let res = null
  try {
    res = await AxiosInstance.get(
      `/api/product-service/products/search?page=${current.value}&size=5`
    )
    if (res === null) return
    data.value = res.data.contents
    loading.value = false
    router.push(`/itemlist?page=${current.value}`)

    console.log(data.value)
  } catch (err: any) {
    console.log(err)
    error('데이터를 불러오는 중 오류가 발생했습니다.')
  }
}

const deleteClick = async (itemId: number) => {
  let res = null
  try {
    if (window.confirm('제품을 삭제하시겠습니까?')) {
      res = await AxiosInstance.delete(`/api/product-service/products/${itemId}`)
      if (res === null) return
      success('제품이 삭제되었습니다.')
      getItemList()
    }
  } catch (err: any) {
    console.log(err)
    error('데이터를 불러오는 중 오류가 발생했습니다.')
  }
}

const search = async (e: any) => {
  let res = null
  if (e.key === 'Enter') {
    try {
      current.value = 1
      loading.value = true
      res = await AxiosInstance.get(
        `/api/product-service/products/search?page=${current.value}&size=5&keyword=${searchInput.value}`
      )
      if (res === null) return
      loading.value = false
      data.value = res.data.contents
      router.push(`/itemlist?page=${current.value}&keyword=${searchInput.value}`)
      success('검색이 완료되었습니다.')
    } catch (err: any) {
      error('제품 검색도중 오류가 발생했습니다.')
    }
  }
}

const AllCheckboxClick = () => {
  console.log('CHECKED : ', checked.value)
  if (Object.keys(checked.value).length === data.value.length) {
    Object.keys(checked.value).map((item: string) => {
      delete checked.value[item]
    })
  } else {
    data.value.forEach((element) => {
      checked.value[element.productId] = true
    })
  }
}
const checkboxClick = (key: string) => {
  if (checked.value[key]) delete checked.value[key]
  else checked.value[key] = true
}

function formatDateString(dateStr: string) {
  // Date 객체로 변환
  const date = new Date(dateStr)

  // 년, 월, 일, 시간, 분 추출
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  // 원하는 형식으로 변환
  const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`

  return formattedDate
}

const getItemList = async () => {
  loading.value = true
  let res = null
  try {
    if (prevKeyword.value) {
      res = await AxiosInstance.get(
        `/api/product-service/products/search?page=${current.value}&size=5&keyword=${prevKeyword.value}`
      )
    } else {
      res = await AxiosInstance.get(
        `/api/product-service/products/search?page=${current.value}&size=5`
      )
    }
    if (res === null) return
    data.value = res.data.contents
    loading.value = false
    console.log(data.value)
  } catch (err: any) {
    console.log(err)
    error('데이터를 불러오는 중 오류가 발생했습니다.')
  }
}

getItemList()
</script>

<template>
  <section class="itemlist_container">
    <section class="title_container">
      <div class="title_logo">제품 목록</div>

      <div class="search">
        <input placeholder="검색" @keypress="search" v-model="searchInput" />
      </div>
      <a-spin :spinning="loading" style="height: 300px" tip="loading...">
        <div class="item_list">
          <div class="item_list_header">
            <div class="check">
              <a-checkbox
                :checked="data.length !== 0 && data.length === Object.keys(checked).length"
                @click="AllCheckboxClick"
              ></a-checkbox>
            </div>
            <div class="image">사진</div>
            <div>제품 이름</div>
            <div>제품 설명</div>
            <div class="upload">등록일</div>
            <div class="update">수정</div>
            <div class="delete">삭제</div>
          </div>

          <div class="item_list_contetns">
            <div class="item_list_row" v-for="(item, index) in data" v-bind:key="`item${index}`">
              <div class="check">
                <a-checkbox
                  :checked="checked[item.productId]"
                  @click="checkboxClick(item.productId)"
                ></a-checkbox>
              </div>
              <div class="image">
                <img :src="`/api/product-service/products/images/${item.thumbnailImageId}`" />
              </div>
              <div>{{ item.name }}</div>
              <div>{{ item.description }}</div>
              <div class="upload">{{ formatDateString(item.createdAt) }}</div>
              <div class="update" @click="$router.push(`/upload?item=${item.productId}`)">
                <img src="@/assets/images/edit.png" />
              </div>
              <div class="delete" @click="deleteClick(item.productId)">
                <img src="@/assets/images/cancel.png" />
              </div>
            </div>
          </div>

          <a-pagination
            @change="changePage"
            v-model:current="current"
            :total="10"
            :defaultPageSize="1"
            class="pagination"
          />
        </div>
      </a-spin>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@import url('./itemlist.scss');
</style>

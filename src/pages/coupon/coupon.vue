<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success, warning } from '@/utils/vueAlert'

const inputType = ref('price')
const couponType = ref('all')
const imagePreview = ref<any>(null)
const imageFile = ref(null)
const isItemSelect = ref(false)
const imageRef = ref<any>('')

const itemList = ref<any>([])
const searchInput = ref<String>('')
const selectItem = ref<any>(null)
const couponList = ref<any>([])

//쿠폰관련
const couponName = ref('')
const description = ref('')
const discount = ref(0)
const productId = ref(null)

const getItemList = async (keyword: String) => {
  try {
    let data = await AxiosInstance.get(
      `/api/product-service/products/search?size=10&page=1&keyword=${keyword}`
    )
    if (data === null) return

    //console.log('data : ', data.data.contents)
    itemList.value = data.data.contents
    console.log('ITEM LIST : ', itemList.value)
  } catch (err: any) {
    console.log(err)
    error('오류가 발생했습니다')
  }
}

const getCouponList = async () => {
  try {
    let data = await AxiosInstance.get('/api/order-service/coupon?disabled=false')
    if (data === null) return
    couponList.value = data.data.coupons

    console.log('couponList : ', couponList.value)
  } catch (err: any) {
    console.log(err)
    error('오류가 발생했습니다.')
  }
}

const searchEnter = async (e: any) => {
  if (e.key === 'Enter') {
    getItemList(searchInput.value)
  }
}

getItemList('')
getCouponList()

warning('쿠폰 목록은 아래에 있습니다')
const onFileChange = (event: any) => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    console.log('FIle : ', imageFile.value)
    const reader = new FileReader()
    reader.onload = (e: any) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

//모달에서 아이템 셀렉트
const itemSelect = (item: any) => {
  success('상품 선택 완료')
  selectItem.value = item
  isItemSelect.value = false
}

const uploadClick = () => {
  imageRef.value.click()
}

const addCoupon = async () => {
  let axiosConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    if (imageFile.value === null) {
      error('이미지는 필수 항목입니다.')
      return
    }
    if (couponName.value.trim() === '') {
      error('쿠폰 제목을 입력해주세요.')
      return
    }
    if (discount.value <= 0) {
      error('할인율을 0이상 입력해주세요.')
      return
    }
    if (couponType.value === 'item' && selectItem.value === null) {
      error('특정 상품을 선택해주세요.')
      return
    }
    if (inputType.value === 'percent' && discount.value > 100) {
      error('퍼센트의 경우 100이하로 작성해주세요.')
      return
    }

    console.log('IMAGE : ', imageFile.value)

    let param: any = {
      multipartFile: imageFile.value,
      name: couponName.value,
      description: '',
      discount: discount.value
    }

    if (couponType.value === 'item') {
      alert('특정 아이템 ')
      console.log(selectItem.value)
      param['productId'] = selectItem.value.productId
    }

    if (inputType.value === 'price') {
      param['isPercent'] = false
    } else {
      param['isPercent'] = true
    }

    let data = await AxiosInstance.post('/api/order-service/coupon', param, axiosConfig)
    if (data === null) return
    success('쿠폰이 등록되었습니다.')

    imagePreview.value = null
    imageFile.value = null
    couponName.value = ''
    discount.value = 0
    productId.value = null
    selectItem.value = null
    inputType.value = 'price'
    couponType.value = 'all'

    getCouponList()
  } catch (err: any) {
    console.log(err)
    error('쿠폰 등록 중 오류가 발생했습니다.')
  }
}
</script>

<template>
  <section class="coupon_container">
    <div class="coupon_division">
      <div class="coupon_left">
        <section class="title_container">
          <div class="title_logo">쿠폰 등록</div>
          <div class="title_sub_logo">(쿠폰 목록은 아래에 있습니다)</div>
        </section>

        <div class="coupon_upload">
          <input ref="imageRef" type="file" style="display: none" @change="onFileChange" />
          <div class="image_upload" @click="uploadClick">
            <img v-if="imagePreview" class="image_preview" :src="imagePreview" />
            <img v-else src="@/assets/images/addImage.png" />
          </div>
          <div class="input_upload">
            <input placeholder="제목을 입력하세요" v-model="couponName" />
            <div class="input_sales">
              <a-radio-group v-model:value="inputType" class="radio_group" size="large">
                <a-radio-button value="price">가격</a-radio-button>
                <a-radio-button value="percent">퍼센트</a-radio-button>
              </a-radio-group>

              <div class="input_deduct">
                <input
                  v-model="discount"
                  :placeholder="
                    inputType === 'price'
                      ? '공제될 가격을 입력하세요'
                      : '공제될 퍼센트를 입력하세요'
                  "
                  type="number"
                  :max="100"
                />
                <div>{{ inputType === 'price' ? '₩' : '%' }}</div>
              </div>
            </div>

            <div class="item_select_container">
              <a-radio-group v-model:value="couponType" class="coupon_size_group" size="large">
                <a-radio-button value="all">쿠폰 전체 적용</a-radio-button>
                <a-radio-button value="item">특정 상품 적용</a-radio-button>
              </a-radio-group>

              <div v-if="couponType === 'item'">
                <div class="item_select_btn" @click="isItemSelect = true">상품 선택</div>
              </div>
            </div>

            <div v-if="selectItem && couponType === 'item'" class="item_select_name">
              <div>선택된 상품 : {{ selectItem.name }}</div>
            </div>
          </div>
        </div>
        <div class="upload_btn" @click="addCoupon">등록</div>
      </div>
      <div class="coupon_right">
        <section class="title_container">
          <div class="title_logo">쿠폰 목록</div>
        </section>

        <section class="coupon_list">
          <div class="coupon_head">
            <div class="coupon_image">사진</div>
            <div class="coupon_description">쿠폰 설명</div>
            <div>공제 금액</div>
            <div>삭제</div>
          </div>
          <div
            class="coupon_contents"
            v-for="(item, index) in couponList"
            v-bind:key="`item${index}`"
          >
            <div class="coupon_image">
              <img :src="`/api/order-service/coupon/images/${item.couponImage.couponImageId}`" />
            </div>
            <div class="coupon_description">{{ item.name }}</div>
            <div>{{ item.discount.toLocaleString() }}{{ item.isPercent ? '%' : '원' }}</div>
            <div class="coupon_delete">
              <img src="@/assets/images/cancel.png" />
            </div>
          </div>
        </section>
      </div>
    </div>

    <div :class="`coupon_item_select_container coupon_item_select_container_${isItemSelect}`">
      <div class="coupon_item_select_background" @click="isItemSelect = false"></div>
      <div class="coupon_item_select_modal">
        <div class="coupon_item_select_row">
          <div class="coupon_item_select_close">
            <img src="@/assets/images/close.png" @click="isItemSelect = false" />
          </div>
          <div class="coupon_item_select_title">상품 선택</div>
          <div class="coupon_item_select_search">
            <input placeholder="검색" v-model="searchInput" @keypress="searchEnter" />
          </div>
        </div>
        <div class="coupon_item_select_items">
          <div class="coupon_item_select_header">
            <div>사진</div>
            <div class="coupon_item_select_item_name">상품명</div>
            <div>선택</div>
          </div>

          <div
            class="coupon_item_select_item"
            v-for="(item, index) in itemList"
            v-bind:key="`itemlist${index}`"
          >
            <div class="coupon_item_select_thumbnail">
              <img :src="`/api/product-service/products/images/${item.thumbnailImageId}`" />
            </div>
            <div class="coupon_item_select_item_name">{{ item.name }}</div>
            <div class="coupon_item_check">
              <img src="@/assets/images/checkmark.png" @click="itemSelect(item)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./coupon.scss');
</style>

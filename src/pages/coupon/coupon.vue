<script setup lang="ts">
import { warning } from '@/utils/vueAlert'

const inputType = ref('price')
const imagePreview = ref<any>(null)
const imageFile = ref(null)
const imageRef = ref<any>('')

warning('쿠폰 목록은 아래에 있습니다')
const onFileChange = (event: any) => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = (e: any) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const uploadClick = () => {
  imageRef.value.click()
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
            <input placeholder="설명을 입력하세요" />
            <a-radio-group v-model:value="inputType" class="radio_group">
              <a-radio-button value="price">가격</a-radio-button>
              <a-radio-button value="percent">퍼센트</a-radio-button>
            </a-radio-group>

            <div class="input_deduct">
              <input
                :placeholder="
                  inputType === 'price' ? '공제될 가격을 입력하세요' : '공제될 퍼센트를 입력하세요'
                "
                type="number"
                :max="100"
              />
              <div>{{ inputType === 'price' ? '₩' : '%' }}</div>
            </div>
            <div class="upload_btn">등록</div>
          </div>
        </div>
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
            <div>수정</div>
            <div>삭제</div>
          </div>
          <div class="coupon_contents" v-for="item in [1, 2, 3, 4, 5]" v-bind:key="`item${item}`">
            <div class="coupon_image">
              <img src="@/assets/images/coupon2.png" />
            </div>
            <div class="coupon_description">쿠폰 설명</div>
            <div>10%</div>
            <div class="coupon_edit">
              <img src="@/assets/images/edit.png" />
            </div>
            <div class="coupon_delete">
              <img src="@/assets/images/cancel.png" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./coupon.scss');
</style>

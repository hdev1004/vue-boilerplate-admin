<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success } from '@/utils/vueAlert'

const image1 = ref<any>(null)
const image2 = ref<any>(null)
const image3 = ref<any>(null)
const image4 = ref<any>(null)
const image5 = ref<any>(null)

const input1 = ref<any>(null)
const input2 = ref<any>(null)
const input3 = ref<any>(null)
const input4 = ref<any>(null)
const input5 = ref<any>(null)
const closeHover = ref(false)

const urls = ref<Array<string>>(['', '', '', '', ''])
const bannerList = ref<Array<any>>([])
const loading = ref(false)

const generateRandomString = () => {
  //랜덤 문자 생성기
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const mouseover = () => {
  console.log('over')
}

const mouseout = () => {
  console.log('out')
}

const closeClick = (idx: number) => {
  if (idx === 0) {
    image1.value = null
  } else if (idx === 1) {
    image2.value = null
  } else if (idx === 2) {
    image3.value = null
  } else if (idx === 3) {
    image4.value = null
  } else if (idx === 4) {
    image5.value = null
  }
}

const getBannerList = async () => {
  try {
    loading.value = true
    let data = await AxiosInstance.get('/api/product-service/banners')
    if (data === null) return
    let banners = data.data.banners
    bannerList.value = banners
    console.log('Banner List : ', bannerList.value)

    for (let i = 0; i < banners.length; i++) {
      urls.value[i] = banners[i].url
      let response: any = await AxiosInstance.get(
        `/api/product-service/banners/images/${banners[i].bannerImageId}`,
        { responseType: 'arraybuffer' }
      )
      let blob = new Blob([response.data], { type: 'image/jpeg' }) // 필요한 경우 MIME 타입을 변경하세요
      let file = new File([blob], `banner_${generateRandomString()}.jpg`, { type: 'image/jpeg' }) // 필요한 경우 MIME 타입을 변경하세요
      console.log('GET BLOB : ', file)
      if (i === 0) {
        image1.value = {
          file: file,
          preview: `/api/product-service/banners/images/${banners[i].bannerImageId}`
        }
      } else if (i === 1) {
        image2.value = {
          file: file,
          preview: `/api/product-service/banners/images/${banners[i].bannerImageId}`
        }
      } else if (i === 2) {
        image3.value = {
          file: file,
          preview: `/api/product-service/banners/images/${banners[i].bannerImageId}`
        }
      } else if (i === 3) {
        image4.value = {
          file: file,
          preview: `/api/product-service/banners/images/${banners[i].bannerImageId}`
        }
      } else if (i === 4) {
        image5.value = {
          file: file,
          preview: `/api/product-service/banners/images/${banners[i].bannerImageId}`
        }
      }
    }
    loading.value = false
  } catch (err: any) {
    console.log('ERR : ', err)
    error('데이터를 불러오는 중 오류가 발생했습니다')
  }
}

getBannerList()

const saveBtn = async () => {
  loading.value = true
  try {
    let banners = bannerList.value

    //기존꺼 삭제
    for (let i = 0; i < banners.length; i++) {
      await AxiosInstance.delete(`/api/product-service/banners/${banners[i].bannerId}`)
    }

    let formData = new FormData()
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    if (image1.value) {
      formData = new FormData()
      formData.append('multipartFile', image1.value.file)
      formData.append('url', urls.value[0])
      let data = await AxiosInstance.post('/api/product-service/banners', formData, axiosConfig)
      if (data === null) return
    }
    if (image2.value) {
      formData = new FormData()
      formData.append('multipartFile', image2.value.file)
      formData.append('url', urls.value[1])
      let data = await AxiosInstance.post('/api/product-service/banners', formData, axiosConfig)
      if (data === null) return
    }
    if (image3.value) {
      formData = new FormData()
      formData.append('multipartFile', image3.value.file)
      formData.append('url', urls.value[2])
      let data = await AxiosInstance.post('/api/product-service/banners', formData, axiosConfig)
      if (data === null) return
    }
    if (image4.value) {
      formData = new FormData()
      formData.append('multipartFile', image4.value.file)
      formData.append('url', urls.value[3])
      let data = await AxiosInstance.post('/api/product-service/banners', formData, axiosConfig)
      if (data === null) return
    }
    if (image5.value) {
      formData = new FormData()
      formData.append('multipartFile', image5.value.file)
      formData.append('url', urls.value[4])
      let data = await AxiosInstance.post('/api/product-service/banners', formData, axiosConfig)
      if (data === null) return
    }

    success('저장이 완료되었습니다')
    loading.value = false
  } catch (err: any) {
    error('업로드 중 오류가 발생했습니다.')
    console.log(err)
    loading.value = false
  }
}

const handleFileChange = (event: any, idx: number) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      if (idx === 1) {
        image1.value = {
          preview: e.target.result,
          file: file
        }
      } else if (idx == 2) {
        image2.value = {
          preview: e.target.result,
          file: file
        }
      } else if (idx === 3) {
        image3.value = {
          preview: e.target.result,
          file: file
        }
      } else if (idx === 4) {
        image4.value = {
          preview: e.target.result,
          file: file
        }
      } else {
        image5.value = {
          preview: e.target.result,
          file: file
        }
      }
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <a-spin :spinning="loading" style="margin-top: 20px">
    <section class="banner_container">
      <section class="title_container">
        <div class="title_logo">배너 관리</div>
      </section>
      <div class="image_container">
        <div @click="!closeHover ? input1.click() : (closeHover = false)" class="image_card">
          <img
            class="add_image"
            v-if="!image1"
            src="@/assets/images/addImage.png"
            @mouseover="closeHover = false"
          />
          <img class="have_iamge" v-else :src="image1.preview" />
          <input
            ref="input1"
            type="file"
            class="image_add_file"
            @change="(event:any) => {handleFileChange(event, 1)}"
          />
          <div
            v-if="image1"
            class="close_image"
            @click="closeClick(0)"
            @mouseover="closeHover = true"
            @mouseout="closeHover = false"
          >
            <img src="@/assets/images/closeWhite.png" />
          </div>
        </div>
        <div @click="!closeHover ? input2.click() : (closeHover = false)" class="image_card">
          <img
            class="add_image"
            v-if="!image2"
            src="@/assets/images/addImage.png"
            @mouseover="closeHover = false"
          />
          <img class="have_iamge" v-else :src="image2.preview" />
          <input
            ref="input2"
            type="file"
            class="image_add_file"
            @change="(event:any) => {handleFileChange(event, 2)}"
          />
          <div
            v-if="image2"
            class="close_image"
            @click="closeClick(1)"
            @mouseover="closeHover = true"
            @mouseout="closeHover = false"
          >
            <img src="@/assets/images/closeWhite.png" />
          </div>
        </div>
        <div @click="!closeHover ? input3.click() : (closeHover = false)" class="image_card">
          <img
            class="add_image"
            v-if="!image3"
            src="@/assets/images/addImage.png"
            @mouseover="closeHover = false"
          />
          <img class="have_iamge" v-else :src="image3.preview" />
          <input
            ref="input3"
            type="file"
            class="image_add_file"
            @change="(event:any) => {handleFileChange(event, 3)}"
          />
          <div
            v-if="image3"
            class="close_image"
            @click="closeClick(2)"
            @mouseover="closeHover = true"
            @mouseout="closeHover = false"
          >
            <img src="@/assets/images/closeWhite.png" />
          </div>
        </div>
        <div @click="!closeHover ? input4.click() : (closeHover = false)" class="image_card">
          <img
            class="add_image"
            v-if="!image4"
            src="@/assets/images/addImage.png"
            @mouseover="closeHover = false"
          />
          <img class="have_iamge" v-else :src="image4.preview" />
          <input
            ref="input4"
            type="file"
            class="image_add_file"
            @change="(event:any) => {handleFileChange(event, 4)}"
          />
          <div
            v-if="image4"
            class="close_image"
            @click="closeClick(3)"
            @mouseover="closeHover = true"
            @mouseout="closeHover = false"
          >
            <img src="@/assets/images/closeWhite.png" />
          </div>
        </div>
        <div @click="!closeHover ? input5.click() : (closeHover = false)" class="image_card">
          <img
            class="add_image"
            v-if="!image5"
            src="@/assets/images/addImage.png"
            @mouseover="closeHover = false"
          />
          <img class="have_iamge" v-else :src="image5.preview" />
          <input
            ref="input5"
            type="file"
            class="image_add_file"
            @change="(event:any) => {handleFileChange(event, 5)}"
          />
          <div
            v-if="image5"
            class="close_image"
            @click="closeClick(4)"
            @mouseover="closeHover = true"
            @mouseout="closeHover = false"
          >
            <img src="@/assets/images/closeWhite.png" />
          </div>
        </div>
      </div>

      <div class="input_container">
        <div class="input_title">배너 URL</div>

        <div class="input_row">
          <div class="input_row_title">1</div>
          <input placeholder="url 링크를 입력하세요" v-model="urls[0]" />
        </div>
        <div class="input_row">
          <div class="input_row_title">2</div>
          <input placeholder="url 링크를 입력하세요" v-model="urls[1]" />
        </div>
        <div class="input_row">
          <div class="input_row_title">3</div>
          <input placeholder="url 링크를 입력하세요" v-model="urls[2]" />
        </div>
        <div class="input_row">
          <div class="input_row_title">4</div>
          <input placeholder="url 링크를 입력하세요" v-model="urls[3]" />
        </div>
        <div class="input_row">
          <div class="input_row_title">5</div>
          <input placeholder="url 링크를 입력하세요" v-model="urls[4]" />
        </div>
      </div>
      <div class="save_btn" @click="saveBtn()">저장</div>
    </section>
  </a-spin>
</template>

<style lang="scss" scoped>
@import url('./banner.scss');
</style>

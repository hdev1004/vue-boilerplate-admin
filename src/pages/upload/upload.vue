<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success } from '@/utils/vueAlert'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

const itemName = ref('')
const itemDescription = ref('')
const itemTypeId = ref('')
const itemStyles = ref('')
const itemPrice = ref(0)
const quantity = ref(0)
const itemList = ref([])
const fileUpload = ref()
const previewImage = ref(null)

const hashTagInput = ref('')
const prevTagTrigger = ref(false)
const hashTag = ref<Array<String>>([])

const inputEnter = (event: any) => {
  if (event.key === 'Enter') {
    if (hashTagInput.value.trim() === '') return
    //추가 매커니즘
    if (hashTagInput.value === null) return
    hashTag.value.push(hashTagInput.value)
    hashTagInput.value = ''
  } else if (event.key === 'Backspace') {
    if (hashTagInput.value === '' && prevTagTrigger.value) {
      //삭제 매커니즘
      hashTag.value.pop()
    }
    if (hashTagInput.value === '') {
      prevTagTrigger.value = true
    }
  } else {
    prevTagTrigger.value = false
  }
}

const thumbnailUpload = (event: any) => {
  const files = event.target?.files
  if (files.length > 0) {
    const file = files[0]

    // FileReader 객체 : 웹 애플리케이션이 데이터를 읽고, 저장하게 해줌
    const reader = new FileReader()

    // load 이벤트 핸들러. 리소스 로딩이 완료되면 실행됨.
    reader.onload = (e: any) => {
      previewImage.value = e.target.result
    } // ref previewImage 값 변경

    // 컨텐츠를 특정 file에서 읽어옴. 읽는 행위가 종료되면 loadend 이벤트 트리거함
    // & base64 인코딩된 스트링 데이터가 result 속성에 담김
    reader.readAsDataURL(file)
  }
}

const upload = async () => {
  let data = null
  try {
    data = await AxiosInstance.post('/api/product-service/products', {
      name: itemName.value,
      description: itemDescription.value,
      productTypeId: itemTypeId.value,
      productStyles: itemStyles.value.split(','),
      unitPrice: itemPrice.value,
      quantity: quantity.value
    })

    let detail = await AxiosInstance.get(`/api/product-service/products/${data.data.productId}`)

    success('등록이 완료되었습니다.')
  } catch (err) {
    console.log(err)
    error('등록중에 오류가 발생했습니다.')
  }
}

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const editor = ref()
onMounted(() => {
  const e: any = new Editor({
    el: editor.value,
    height: '500px',
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical',
    events: {
      change: () => emit('update:modelValue', e.getMarkdown())
    }
  })
})
</script>

<template>
  <section class="upload_container">
    <section class="title_container">
      <div class="title_logo">제품 등록</div>
    </section>
    <section class="image_container">
      <div class="image_add" @click="fileUpload.click()">
        <input
          @change="thumbnailUpload"
          ref="fileUpload"
          type="file"
          id="upload-image"
          accept="image/gif, image/jpeg, image/png, image/jpg"
          hidden
        />
        <img v-if="!previewImage" src="@/assets/images/addImage.png" />
        <img class="previewImage" v-else :src="previewImage" />
      </div>

      <div class="item_title_container">
        <div class="item_row">
          <div>제품 이름</div>
          <input v-model="itemName" type="text" />
        </div>

        <div class="item_row">
          <div>제품 설명</div>
          <input type="text" />
        </div>
      </div>
    </section>

    <section class="editor_container">
      <div ref="editor" />
    </section>

    <section class="item_footer_container">
      <div class="item_row">
        <div class="item_row_title">스타일 해시 태그 (#)</div>
        <div class="hashtag">
          <div class="tag_container" v-if="hashTag.length">
            <div class="tag" v-for="(tag, index) in hashTag" v-bind:key="`tag${index}`">
              {{ tag }}
              <img src="@/assets/images/close.png" @click="hashTag.splice(index, 1)" />
            </div>
          </div>
          <input
            placeholder="텍스트 입력 후 엔터를 입력해주세요"
            @keyup="inputEnter"
            v-model="hashTagInput"
          />
        </div>
      </div>
      <div class="item_sub_container">
        <div class="item_sub_row">
          <div>가격</div>
          <input type="number" />
        </div>
        <div class="item_sub_row">
          <div>수량</div>
          <input type="number" />
        </div>
      </div>
    </section>

    <section class="save_btn">등록</section>
    <div style="height: 40px; width: 500px">&nbsp;</div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./upload.scss');
</style>

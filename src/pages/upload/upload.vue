<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success, warning } from '@/utils/vueAlert'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const options = ref<Array<Object>>([])

const itemName = ref('')
const itemContents = ref('')
const itemDescription = ref('')
const itemPrice = ref(0)
const quantity = ref(0)
const itemCategory = ref('')
const fileUpload = ref()
const previewImage = ref<any>(null)
const thumbnail = ref<any>(null)
const beforeThumbnail = ref<any>(null)
const beforeEditImages = ref<Array<number>>([])

const hashTagInput = ref('')
const prevTagTrigger = ref(false)
const hashTag = ref<Array<String>>([])

const getCategory = async () => {
  let data = null

  try {
    data = await AxiosInstance.get('/api/product-service/products/types')
    if (data === null) return
    data.data.types.map((item: { productTypeId: number; type: string }) => {
      console.log('ITEM : ', item)
      options.value.push({
        value: item.productTypeId,
        label: item.type
      })
    })
  } catch (err: any) {
    console.log(err)
    error('등록 중 오류가 발생했습니다.')
  }
}

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

const thumbnailUpload = async (event: any) => {
  const files = event.target?.files
  let formData = new FormData()
  let axiosConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  if (files.length > 0) {
    try {
      const file = files[0]

      const newFile = new File([file], `thumbnail_${file.name}`, {
        type: file.type
      })
      formData.append('multipartFile', newFile)
      let data = await AxiosInstance.post(
        '/api/product-service/products/images',
        formData,
        axiosConfig
      )
      if (data === null) return
      thumbnail.value = data.data.imageId

      // FileReader 객체 : 웹 애플리케이션이 데이터를 읽고, 저장하게 해줌
      const reader = new FileReader()

      // load 이벤트 핸들러. 리소스 로딩이 완료되면 실행됨.
      reader.onload = (e: any) => {
        previewImage.value = e.target.result
      } // ref previewImage 값 변경

      // 컨텐츠를 특정 file에서 읽어옴. 읽는 행위가 종료되면 loadend 이벤트 트리거함
      // & base64 인코딩된 스트링 데이터가 result 속성에 담김
      reader.readAsDataURL(file)
    } catch (err: any) {
      error('이미지 업로드 오류')
      console.log('ERR : ', err)
    }
  }
}

const findUseImageArray = () => {
  let html = itemContents.value

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const images = doc.querySelectorAll('img')
  return Array.from(images).map((img) =>
    parseInt(img.src.split('/')[img.src.split('/').length - 1])
  )
}

const modify = async () => {
  try {
    let itemId = route.query.item
    let useImages = findUseImageArray()
    //전체 이미지.filter("예전 이미지")
    const notUse = beforeEditImages.value.filter((item) => !useImages.includes(item))
    console.log('click before : ', beforeThumbnail.value)
    if (beforeThumbnail.value !== thumbnail.value) {
      //새로 등록된 이미지일 경우 deleteImage로 추가
      notUse.push(beforeThumbnail.value)
    }

    let data = null
    let param = {
      name: itemName.value,
      description: itemDescription.value,
      content: itemContents.value,
      productTypeId: itemCategory.value,
      productStyles: hashTag.value,
      unitPrice: itemPrice.value,
      quantity: quantity.value,
      contentImageIds: useImages,
      deleteImageIds: notUse,
      thumbnailImageId: thumbnail.value
    }
    console.log('param : ', param)

    let res = await AxiosInstance.put(`/api/product-service/products/${itemId}`, param)
    if (res === null) return
    success('제품 수정이 완료되었습니다.')
  } catch (err: any) {
    error('수정 중 오류가 발생했습니다.')
    console.log(err)
  }

  /*
{
    "name": "new",
    "description": "new-desc",
    "content": "new content",
    "productTypeId": "1",
    "productStyles": ["NEW", "OLD"],
    "unitPrice": "999",
    "quantity": "99",
    "contentImageIds": [6, 7],
    "deleteImageIds": [1, 2],
    "thumbnailImageId": 5
}
  */
}

const upload = async () => {
  console.log('Contetns : ', itemContents.value)

  try {
    let data = null
    let param = {
      name: itemName.value,
      description: itemDescription.value,
      content: itemContents.value,
      productTypeId: itemCategory.value,
      productStyles: hashTag.value,
      unitPrice: itemPrice.value,
      quantity: quantity.value,
      contentImageIds: findUseImageArray(),
      thumbnailImageId: thumbnail.value
    }

    console.log('PARAM : ', param)
    if (!confirm('제품을 등록하시겠습니까?')) {
      return
    }
    data = await AxiosInstance.post('/api/product-service/products', param)
    if (data === null) return

    clearEditing()
    success('등록이 완료되었습니다.')
  } catch (err) {
    console.log(err)
    error('등록중에 오류가 발생했습니다.')
  }
}

const clearEditing = () => {
  itemName.value = ''
  itemDescription.value = ''
  itemContents.value = ''
  itemCategory.value = ''
  itemPrice.value = 0
  quantity.value = 0
  e.setHTML('')
  hashTag.value = []
  thumbnail.value = null
  previewImage.value = null
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
let e: any = null

const getItemInfo = async () => {
  let itemId = route.query.item
  if (itemId) {
    let data = await AxiosInstance.get(`/api/product-service/products/${itemId}`)
    let item = data.data
    beforeThumbnail.value = item.thumbnailImageId
    console.log('BeforeEditImages : ', beforeThumbnail.value)

    console.log(item)
    itemName.value = item.name
    itemDescription.value = item.description
    itemCategory.value = item.productType.productTypeId
    itemContents.value = item.content
    hashTag.value = item.productStyles
    itemPrice.value = item.unitPrice
    quantity.value = item.quantity

    thumbnail.value = item.thumbnailImageId
    previewImage.value = `/api/product-service/products/images/${item.thumbnailImageId}`
    beforeEditImages.value = findUseImageArray()

    console.log(item.content)
  }
}

getItemInfo()

const isEditingCheck = () => {
  if (
    itemName.value !== '' ||
    itemDescription.value !== '' ||
    itemCategory.value !== '' ||
    itemPrice.value !== 0 ||
    quantity.value !== 0 ||
    hashTag.value.length !== 0 ||
    thumbnail.value !== null ||
    previewImage.value !== null
  ) {
    return true
  } else {
    return false
  }
}

router.beforeEach((to, from, next) => {
  if (route.path === '/upload' && isEditingCheck()) {
    if (window.confirm('편집중에 있습니다. 이동하시겠습니까?')) {
      clearEditing()
      next()
    }
  } else {
    next()
  }
})

onMounted(async () => {
  let itemId = route.query.item
  let item = ''
  let data = null
  let content = null
  if (itemId) {
    loading.value = true

    data = await AxiosInstance.get(`/api/product-service/products/${itemId}`)
    item = data.data.content

    loading.value = false
  }

  getCategory()
  e = new Editor({
    el: editor.value,
    height: '500px',
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical',
    initialValue: item ? item : '',
    hooks: {
      async addImageBlobHook(blob, callback) {
        let formData = new FormData()

        let axiosConfig = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        try {
          let randomUUID = crypto.randomUUID()
          const newFile = new File([blob], `content_${blob.name}`, {
            type: blob.type
          })
          formData.append('multipartFile', newFile)
          let data = await AxiosInstance.post(
            '/api/product-service/products/images',
            formData,
            axiosConfig
          )
          if (data === null) return
          callback(`/api/product-service/products/images/${data.data.imageId}`)
          //callback()
        } catch (err) {
          error('이미지 업로드 오류')
          console.log('ERR : ', err)
        }
      }
    },
    events: {
      change: () => {
        emit('update:modelValue', e.getMarkdown())
        itemContents.value = e.getHTML()
      }
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
          <input v-model="itemDescription" type="text" />
        </div>

        <div class="item_row">
          <div>제품 카테고리</div>
          <a-select
            v-model:value="itemCategory"
            size="large"
            style="width: 200px"
            :options="options"
          ></a-select>
        </div>
      </div>
    </section>

    <section class="editor_container">
      <a-skeleton active v-if="loading" style="background-color: transparent" />
      <a-skeleton active v-if="loading" style="background-color: transparent" />
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
          <input type="number" v-model="itemPrice" />
        </div>
        <div class="item_sub_row">
          <div>수량</div>
          <input type="number" v-model="quantity" />
        </div>
      </div>
    </section>

    <section v-if="$route.query.item" class="save_btn" @click="modify()">수정</section>
    <section v-else class="save_btn" @click="upload()">등록</section>
    <div style="height: 40px; width: 500px">&nbsp;</div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./upload.scss');
</style>

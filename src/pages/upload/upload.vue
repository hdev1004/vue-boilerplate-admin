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
  const e = new Editor({
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
      <div class="image_add">
        <img src="@/assets/images/addImage.png" />
      </div>

      <div class="item_title_container">
        <div class="item_row">
          <div>제품 이름</div>
          <input type="text" />
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
  </section>
</template>

<style lang="scss" scoped>
@import url('./upload.scss');
</style>

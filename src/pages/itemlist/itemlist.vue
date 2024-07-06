<script setup lang="ts">
const AllChecked = ref(false)
const data = ref(['item1', 'item2', 'item3', 'item4', 'item5'])
const searchInput = ref('')
const checked = ref<{
  [key: string]: boolean
}>({})

const search = (e: any) => {
  if (e.key === 'Enter') {
    alert(searchInput.value)
  }
}

const AllCheckboxClick = () => {
  if (Object.keys(checked.value).length === data.value.length) {
    Object.keys(checked.value).map((item: string) => {
      delete checked.value[item]
    })
  } else {
    data.value.forEach((element) => {
      checked.value[element] = true
    })
  }
}
const checkboxClick = (key: string) => {
  if (checked.value[key]) delete checked.value[key]
  else checked.value[key] = true
}
</script>

<template>
  <section class="itemlist_container">
    <section class="title_container">
      <div class="title_logo">제품 목록</div>

      <div class="search">
        <input placeholder="검색" @keypress="search" v-model="searchInput" />
      </div>
      <div class="item_list">
        <div class="item_list_header">
          <div class="check">
            <a-checkbox
              :checked="data.length === Object.keys(checked).length"
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
          <div class="item_list_row" v-for="item in data" v-bind:key="item">
            <div class="check">
              <a-checkbox :checked="checked[item]" @click="checkboxClick(item)"></a-checkbox>
            </div>
            <div class="image">사진</div>
            <div>제품 이름</div>
            <div>제품 설명</div>
            <div class="upload">등록일</div>
            <div class="update">
              <img src="@/assets/images/edit.png" />
            </div>
            <div class="delete">
              <img src="@/assets/images/cancel.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@import url('./itemlist.scss');
</style>

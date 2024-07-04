<script setup lang="ts">
const image1 = ref(null)
const image2 = ref(null)
const image3 = ref(null)
const image4 = ref(null)
const image5 = ref(null)
</script>

<template>
  <section class="banner_container">
    <section class="title_container">
      <div class="title_logo">배너 관리</div>
    </section>
    <div class="image_container">
      <div>
        <img class="add_image" v-if="!image1" src="@/assets/images/addImage.png" />
        <img v-else src="@/assets/images/background1.jpg" />
      </div>
      <div>
        <img class="add_image" v-if="!image2" src="@/assets/images/addImage.png" />
      </div>
      <div>
        <img class="add_image" v-if="!image3" src="@/assets/images/addImage.png" />
      </div>
      <div>
        <img class="add_image" v-if="!image4" src="@/assets/images/addImage.png" />
      </div>
      <div>
        <img class="add_image" v-if="!image5" src="@/assets/images/addImage.png" />
      </div>
    </div>

    <div class="input_container">
      <div class="input_title">배너 URL</div>

      <div class="input_row">
        <div class="input_row_title">1</div>
        <input placeholder="url 링크를 입력하세요" />
      </div>
      <div class="input_row">
        <div class="input_row_title">2</div>
        <input placeholder="url 링크를 입력하세요" />
      </div>
      <div class="input_row">
        <div class="input_row_title">3</div>
        <input placeholder="url 링크를 입력하세요" />
      </div>
      <div class="input_row">
        <div class="input_row_title">4</div>
        <input placeholder="url 링크를 입력하세요" />
      </div>
      <div class="input_row">
        <div class="input_row_title">5</div>
        <input placeholder="url 링크를 입력하세요" />
      </div>
    </div>
    <div class="save_btn">저장</div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./banner.scss');
</style>

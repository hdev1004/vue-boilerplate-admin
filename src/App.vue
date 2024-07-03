<script setup lang="ts"></script>

<template>
  <section>
    <Navbar />
  </section>

  <section class="contents">
    <div class="blank">공백</div>
    <RouterView />
  </section>
</template>

<style lang="scss" scoped>
.contents {
  display: flex;
}
.blank {
  width: 232px;
  height: 100vh;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  data: Array<Number>
})

const chartOptions = ref({})

const series = ref([
  {
    name: 'series A',
    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
  },
  {
    name: 'series B',
    data: [20, 29, 37, 36, 44, 45, 50, 58]
  }
])
</script>

<template>
  <div class="dashboard_container">
    <div class="dashboard_group">
      <div class="dashboard_card">
        <div class="dashboard_card_title">신규 회원 가입인원</div>
        <VueApexCharts width="500" type="line" :options="chartOptions" :series="series" />
      </div>

      <div class="dashboard_card">
        <div class="dashboard_card_title">총 매출금액</div>
        <VueApexCharts width="500" type="line" :options="chartOptions" :series="series" />
      </div>
    </div>

    <div class="dashboard_group">
      <div class="dashboard_table">
        <div class="dashboard_card_title">VIP 회원 리스트</div>
        <div class="dashboard_card_table">
          <div class="dashboard_header">
            <div>아이디</div>
            <div>결제금액</div>
          </div>
          <div class="dashboard_row">
            <div>tester</div>
            <div>1000원</div>
          </div>
          <div class="dashboard_row">
            <div>tester</div>
            <div>1000원</div>
          </div>
          <div class="dashboard_row">
            <div>tester</div>
            <div>1000원</div>
          </div>
          <div class="dashboard_row">
            <div>tester</div>
            <div>1000원</div>
          </div>
          <div class="dashboard_row">
            <div>tester</div>
            <div>1000원</div>
          </div>
          <div class="dashboard_row">
            <div>tester</div>
            <div>1000원</div>
          </div>
        </div>
      </div>

      <div class="dashboard_table">
        <div class="dashboard_card_title">多 매출 상품</div>
        <div class="dashboard_card_table">
          <div class="dashboard_header">
            <div>제품 이름</div>
            <div>제품 가격</div>
            <div>판매 수</div>
          </div>
          <div class="dashboard_row">
            <div>제품 이름</div>
            <div>제품 가격</div>
            <div>판매 수</div>
          </div>
          <div class="dashboard_row">
            <div>제품 이름</div>
            <div>제품 가격</div>
            <div>판매 수</div>
          </div>
          <div class="dashboard_row">
            <div>제품 이름</div>
            <div>제품 가격</div>
            <div>판매 수</div>
          </div>
          <div class="dashboard_row">
            <div>제품 이름</div>
            <div>제품 가격</div>
            <div>판매 수</div>
          </div>
          <div class="dashboard_row">
            <div>제품 이름</div>
            <div>제품 가격</div>
            <div>판매 수</div>
          </div>
          <div class="dashboard_row">
            <div>제품 이름</div>
            <div>제품 가격</div>
            <div>판매 수</div>
          </div>
          <div class="dashboard_row">
            <div>제품 이름</div>
            <div>제품 가격</div>
            <div>판매 수</div>
          </div>
          <div class="dashboard_row">
            <div>제품 이름</div>
            <div>제품 가격</div>
            <div>판매 수</div>
          </div>
          <div class="dashboard_row">
            <div>제품 이름</div>
            <div>제품 가격</div>
            <div>판매 수</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('./Dashboard.scss');
</style>

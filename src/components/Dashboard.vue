<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import AxiosInstance from '@/axios/axiosInstance'
import { error } from '@/utils/vueAlert'

ChartJS.register(ArcElement, Tooltip, Legend, Title)
const isDataLoad = ref(false)
const props = defineProps({
  data: Array<Number>
})
let data = ref<any>({})

const load = async () => {
  try {
    let res = await AxiosInstance.get('/api/product-service/products/orders/top')
    if (res === null) return

    let values = res.data.products.map((item: any) => item.count)
    let labels = res.data.products.map((item: any) => item.product.name)

    data.value.labels = labels
    data.value.datasets = [{}]
    data.value.datasets[0].data = values
    data.value.datasets[0].backgroundColor = [
      '#0081a7',
      '#00afb9',
      '#fdfcdc',
      '#fed9b7',
      '#f07167',
      '#48cae4',
      '#90e0ef',
      '#ade8f4'
    ]

    isDataLoad.value = true
    console.log('DATA : ', data.value)
  } catch (err: any) {
    error('오류가 발생했습니다.')
    console.log(err)
  }
}

load()

const options = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div class="dashboard_container">
    <div class="dashboard_row">
      <div class="dashboard_group">
        <div class="dashboard_title">오늘의 매출</div>
        <div class="dashboard_sub_title">매출 요약</div>
        <div class="dashboard_detail">
          <div class="dashboard_detail_card">
            <img src="@/assets/images/bar.png" />
            <div class="dashboard_detail_card_title">11,000원</div>
            <div>총 매출액</div>
          </div>

          <div class="dashboard_detail_card">
            <img src="@/assets/images/board.png" />
            <div class="dashboard_detail_card_title">100개</div>
            <div>판매 수</div>
          </div>

          <div class="dashboard_detail_card">
            <img src="@/assets/images/users.png" />
            <div class="dashboard_detail_card_title">11명</div>
            <div>일일 방문자</div>
          </div>
        </div>
      </div>

      <div class="dashboard_group2">
        <div class="dashboard_title">매출 목표</div>
        <div class="dashboard_sub_title">매출 지표</div>
        <div>
          <div>
            <div>주간 매출 목표</div>
            <a-tooltip title="15000 / 30000">
              <a-progress :percent="50" status="active" strokeColor="#F2BD6F" />
            </a-tooltip>
          </div>

          <div>
            <div>일별 매출 목표</div>
            <a-tooltip title="800 / 4000">
              <a-progress :percent="20" status="active" strokeColor="#B4D8D8" />
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard_row">
      <div class="dashboard_group">
        <div class="dashboard_title">회원 순위</div>
        <div class="dashboard_sub_title">회원별 순위</div>
        <div class="dashboard_table_head">
          <div>#</div>
          <div>회원 아이디</div>
          <div>결제 금액</div>
        </div>

        <div class="dashboard_table_contents" v-for="item in [1, 2, 3, 4, 5]">
          <div>#</div>
          <div>tester</div>
          <div>100000</div>
        </div>
      </div>

      <div class="dashboard_group2">
        <div class="dashboard_title">상품 지표</div>
        <div class="dashboard_sub_title">Best 상품 점유율</div>
        <div class="dashboard_doughnut">
          <Doughnut :data="data" :options="options" v-if="isDataLoad" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('./Dashboard.scss');
</style>

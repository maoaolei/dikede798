<template>
  <div class="dashboard-container">
    <div class="top">
      <div class="pannel"></div>
      <div class="pannel"></div>
    </div>
    <div class="middle">
      <div id="main"></div>
      <div id="imt"></div>
    </div>
    <div class="bottom">
      <div id="pie"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',

  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.add()
    this.sub()
    this.pie()
  },
  methods: {
    add() {
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom)
      // var option

      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      }

      option && myChart.setOption(option)
    },
    sub() {
      var chartDom = document.getElementById('imt')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      }

      option && myChart.setOption(option)
    },
    pie() {
      var chartDom = document.getElementById('pie')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: 'Nightingale Chart',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: [
            'rose1',
            'rose2',
            'rose3',
            'rose4',
            'rose5',
            'rose6',
            'rose7',
            'rose8'
          ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Radius Mode',
            type: 'pie',
            radius: [20, 140],
            center: ['25%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { value: 40, name: 'rose 1' },
              { value: 33, name: 'rose 2' },
              { value: 28, name: 'rose 3' },
              { value: 22, name: 'rose 4' },
              { value: 20, name: 'rose 5' },
              { value: 15, name: 'rose 6' },
              { value: 12, name: 'rose 7' },
              { value: 10, name: 'rose 8' }
            ]
          },
          {
            name: 'Area Mode',
            type: 'pie',
            radius: [20, 140],
            center: ['75%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 5
            },
            data: [
              { value: 30, name: 'rose 1' },
              { value: 28, name: 'rose 2' },
              { value: 26, name: 'rose 3' },
              { value: 24, name: 'rose 4' },
              { value: 22, name: 'rose 5' },
              { value: 20, name: 'rose 6' },
              { value: 18, name: 'rose 7' },
              { value: 16, name: 'rose 8' }
            ]
          }
        ]
      }

      option && myChart.setOption(option)
    }

  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .top,.middle,.bottom {
      display: flex;
      justify-content: space-around;
    }
  }
}
.pannel {
  width: 500px;
  height: 150px;
  border-radius: 30px;
  background-color: pink;
  margin-right: 20px;
}
#main {
  width: 400px;
  height: 400px;
}
#imt,#pie {
  width: 400px;
  height: 400px;
}
</style>

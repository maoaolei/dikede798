<template>
  <div class="dashboard-container">
    <div class="top">
      <div class="top-left">
        <div class="pannels">
          <div class="leftpannel">
            <div class="firsttop"><span class="order">工单统计</span> <span class="date">2022.09.01 ~ {{ date }}</span></div>
            <el-row :gutter="20">
              <el-col class="col" :span="6">{{ cancelTotal }}</el-col>
              <el-col class="col" :span="6">{{ completedTotal }}</el-col>
              <el-col class="col" :span="6">{{ progressTotal }}</el-col>
              <el-col class="col" :span="6">{{ total }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col class="col1" :span="6">工单总数(个)</el-col>
              <el-col class="col1" :span="6">完成工单(个)</el-col>
              <el-col class="col1" :span="6">进行工单(个)</el-col>
              <el-col class="col1" :span="6">取消订单(个)</el-col>
            </el-row>
          </div>
          <div class="rightpannel">
            <div class="firsttop"><span class="order">销售统计</span> <span class="date">2022.09.01 ~ {{ date }}</span></div>
            <el-row :gutter="20">
              <el-col class="col" :span="12">{{ orederCount }}</el-col>
              <el-col class="col" :span="12">{{ salesMoney }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col class="col1" :span="12">订单量(个)</el-col>
              <el-col class="col1" :span="12">销售额(万元)</el-col>
            </el-row>
          </div>
        </div>
        <div class="echarts">
          <div>
            <span class="title">销售数据</span><span class="date">2022.09.26 ~ {{ date }}</span>
            <span class="week">
              <div :class="{active:index===0}" @click="index=0">周</div>
              <div :class="{active:index===1}" @click="index=1">月</div>
              <div :class="{active:index===2}" @click="index=2">年</div>
            </span>
          </div>
          <div class="echartsreal">
            <div id="zhexian"></div>
            <div id="zhuzhuang"></div>
          </div>
        </div>
      </div>
      <div class="top-right">
        <div class="firsttop"><span class="order">商品热榜</span> <span class="date">2022.09.01 ~ {{ date }}</span></div>
        <el-table
          :data="hotGoodsList"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="skuName"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="count"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <span class="title">合作商点位数Top5</span> <span class="more"><span class="ponit" @click="$router.push('/node/partner')">...</span></span>
        <div class="pieb">
          <div id="coleft"></div>
          <div class="coright">
            <div>
              <p class="nums">{{ sixteen }}</p>
              <p class="des">点位数</p>
            </div>
            <div>
              <p class="nums">{{ five }}</p>
              <p class="des"> 合作商数</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-right">
        <span class="title">异常设备监控</span> <span class="more"><span class="ponit">...</span></span>
        <div class="pic">
          <img src="@/assets/common/empty.png" alt="">
          <h4>暂无数据</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getOrderInfo, getSaleCount, getSaleMoney, getHotGoods,
  getPartners, getAllPartners, getAllPonit, getSalesData, getSalesSpread
} from '@/api/order'
import dayjs from 'dayjs'
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',
  data() {
    return {
      index: 0,
      time: '',
      start: '2022-09-01 00:00:00',
      end: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      dateStart: '2022-09-01',
      dateEacharts: '2022-09-26',
      date: dayjs().format('YYYY-MM-DD'),
      orederList: [],
      orederCount: '',
      salesMoney: '',
      five: '',
      sixteen: '',
      hotGoodsList: [],
      top5: [],
      all: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    cancelTotal() {
      return this.orederList.reduce((acc, item) => acc + item.cancelTotal, 0)
    },
    completedTotal() {
      return this.orederList.reduce((acc, item) => acc + item.completedTotal, 0)
    },
    progressTotal() {
      return this.orederList.reduce((acc, item) => acc + item.progressTotal, 0)
    },
    total() {
      return this.orederList.reduce((acc, item) => acc + item.total, 0)
    },
    prcnet() {
      return this.top5.reduce((acc, item) => acc + item.value, 0)
    }
  },
  mounted() {
    this.add()
    this.zhexian()
    this.zhuzhuang()
  },
  created() {
    this.getHotGoods()
    this.getOrderInfo()
    this.getSaleMoney()
    this.getAllPartners()
    this.getPartners()
    this.getSalesData()
    this.getSalesSpread()
  },
  methods: {
    add() {
      var chartDom = document.getElementById('coleft')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5']
        },

        series: [
          {
            name: 'Radius Mode',
            type: 'pie',
            radius: [60, 130],
            center: ['50%', '40%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            label: {
              show: true
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [{ value: 6.25, name: '佳佳6.25%' },
              { value: 62.25, name: '金燕龙合作商62.5%' },
              { value: 12.5, name: '天花物业12.5%' },
              { value: 12.5, name: '北京合作商12.5%' },
              { value: 6.25, name: 'Likede6.25%' }]

          }

        ]
      }

      option && myChart.setOption(option)
    },
    zhexian() {
      var chartDom = document.getElementById('zhexian')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '销售额趋势图',
          left: '30%'
          // textAlign: 'left'
        },
        xAxis: {
          type: 'category',
          data: ['星期一', '星期二', '星期三']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [0, 1000, 2000, 3000, 4000, 5000, 6000],
            type: 'line'
          }
        ]
      }

      option && myChart.setOption(option)
    },
    zhuzhuang() {
      var chartDom = document.getElementById('zhuzhuang')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title: {
          text: '销售额分布',
          left: '50%'
          // textAlign: 'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }

      option && myChart.setOption(option)
    },

    async getOrderInfo() {
      const { data } = await getOrderInfo(this.start, this.end)
      this.orederList = data
      console.log(data)
      const res = await getSaleCount(this.start, this.end)
      const res2 = await getSaleMoney(this.start, this.end)
      this.orederCount = res.data
      this.salesMoney = ((res2.data) / 1000000).toFixed(2)
    },
    async getSaleMoney() {
      const start = '2022-09-01 00:00:00'
      const end = '2022-09-26 23:59:59'
      const res2 = await getSaleMoney(start, end)
      console.log(res2)
    },
    async getHotGoods() {
      const { data } = await getHotGoods(10, this.dateStart, this.date)
      this.hotGoodsList = data
      this.hotGoodsList.forEach(item => {
        item.count = item.count + '单'
      })
    },
    async getSalesData() {
      await getSalesData(1, this.dateEacharts, this.date)
    },
    async getSalesSpread() {
      await getSalesSpread(this.dateEacharts, this.date)
    },
    async getAllPartners() {
      const { data } = await getAllPartners()
      const data1 = await getAllPonit()
      this.five = data
      this.sixteen = data1.data
    },
    async getPartners() {
      const { data } = await getPartners()
      this.top5 = data
      this.all = this.top5.reduce((acc, item) => acc + item.value, 0)
      this.top5.forEach(item => {
        item.value = (item.value / this.all) * 100
      })
      console.log(data)
    }

  }

}
</script>

<style lang="scss" scoped>
.dashboard-container {
  background-color: #f8fafd;
    padding: 20px;
    .top {
      width: 100%;
      height: 500px;
      // background-color: pink;
      margin-bottom: 80px;
      display: flex;
      .top-left{
        width: 1000px;
        height: 100%;
        // background-color: lightblue;
        margin-right: 20px;
        .pannels {
          height: 200px;
          // background-color: pink;
          // margin-bottom: 20px;
          display: flex;
          .leftpannel,.rightpannel {
            width: 500px;
            height: 90%;
            background-color: #e9f3ff;
            margin-right: 20px;
            border-radius: 20px;
            padding: 20px;
            background: url('~@/assets/common/circle.png') no-repeat top left,
            url('~@/assets/common/task.png')no-repeat bottom right;
            .firsttop {
              margin-bottom: 30px;
            }
            .order {
              font-weight: 700;
              margin-right: 20px;
            }
            .el-row {
              margin-bottom: 10px;
            }
            .col.el-col {
             text-align: center;
             color: #072074;
             height: 50px;
             font-size: 36px;
             font-family: PingFangSC-Semibold,PingFang SC;
             font-weight: 600;
             line-height: 50px;
            }
            .col1.el-col {
              height: 17px;
              margin-top: 3px;
              font-size: 12px;
              font-family: PingFangSC-Regular,PingFang SC;
              font-weight: 400;
              color: #91a7dc;
              line-height: 17px;
              padding-left: 27px !important;
            }
            .date {
              font-size: 12px;
              color: #999999;
            }
          }
          .rightpannel {
            width: 400px;
            height: 90%;
            border-radius: 20px;
            background-color:#fbefe8 !important;
            background:url('~@/assets/common/pinkpig.png')no-repeat bottom right;
            // background-color: green;
            .col.el-col {
              color: #ff5757;;
            }
            .col1.el-col {
              color: #de9690;
              padding-left: 60px !important;
            }

          }
        }
        .echarts {
          height: 350px;
          // background-color: gray;
          padding: 20px;
          position: relative;
          .week {
            position: absolute;
            display: flex;
            justify-content: space-around;
            top: 0;
            right: 0;
            width: 100px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            background-color: rgba(233,243,255,.37);;
          }
          .active {
          background: #fff;
          -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
          box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
          border-radius: 7px;
          font-weight: 600;
          color: #333;
          }
          .echartsreal {
            display: flex;
            margin-top: 20px;
          }
          .title {
            font-weight: 700;
            margin-right: 10px;
          }
          .date {
              font-size: 12px;
              color: #999999;
            }
            #zhexian {
              width: 50%;
              height: 300px;
            }
            #zhuzhuang {
              width: 50%;
              height: 300px;
            }
        }
      }
      .top-right {
        width: 350px;
        height: 100%;
        // background-color: pink;
        padding-top: 20px;
        .order {
              font-weight: 700;
              margin-right: 20px;
            }
            .date {
              font-size: 12px;
              color: #999999;
            }
      }
    }
    .bottom {
      width: 100%;
      height: 500px;
      display: flex;
      background-color: #fff;
      // background-color: lightgreen;
      .bottom-left ,.bottom-right{
        width: 800px;
        height: 100%;
        // background-color: skyblue;
        border-radius: 20px;
        margin-right: 20px;
        position: relative;
        padding: 20px;
        .pieb {
          width: 100%;
          height: 300px;
          display: flex;
          padding-top: 20px;
          // background-color: pink;
          #coleft {
            height: 100%;
            width: 500px;
            // background-color: pink;
          }
          .coright {
            height: 90%;
            width: 150px;
            border-radius: 10px;
            background-color: #f8f8f9;
            text-align: center;
            padding-top: 20px;
            .nums {
              font-weight: 700;
              font-size: 24px;
            }
            .des {
              font-size: 12px;
              font-weight: 500;
              margin-top: -10px;
            }

          }
        }
        .title {
          font-weight: 700;
        }
        .more {
          position: absolute;
          top: 10px;
          right: 20px;
        }
        .more {
          width: 20px;
          height: 20px;
          line-height: 10px;
          text-align: center;
          color: #5f84ff;
          border-radius: 50%;
          border: 1px solid #5f84ff;
        }
      }
      .bottom-right {
        width: 600px;
        height: 100%;
        border-radius: 20px;
        // background-color: pink;
        padding: 20px;
        position: relative;
        // background:url('~@/assets/common/empty.png')

        // .title {
        //   font-weight: 700 !important;
        // }
        // .more {
        //   position: absolute;
        //   top: 10px;
        //   right: 20px;
        // }
        // .more {
        //   width: 20px;
        //   height: 20px;
        //   line-height: 10px;
        //   text-align: center;
        //   color: #5f84ff;
        //   border-radius: 50%;
        //   border: 1px solid #5f84ff;
        // }
        .pic {
         text-align: center;
         margin-top: 80px;
        }
      }
    }
  }
</style>

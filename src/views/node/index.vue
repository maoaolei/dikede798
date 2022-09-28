<template>
  <div class="detail">
    <!-- 头部 -->
    <el-card class="box-card">
      <el-form :inline="true" size="medium ">
        <el-form-item label="合作商管理:">
          <el-input v-model="value" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="searchName">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-circle-plus-outline" class="btn" @click="flag=true">新建</el-button>
      <el-table
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="合作商名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="account"
          label="账号"
        >
        </el-table-column>
        <el-table-column
          prop="vmCount"
          label="设备数量"
        >
        </el-table-column>
        <el-table-column
          prop="ratio"
          label="分成比例"
        >
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系人"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="连系电话"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="240"
        >
          <div class="fourtips">
            <span>重置密码</span><span>查看详情</span><span>修改</span><span>删除</span>
          </div>
        </el-table-column>
      </el-table>

    </el-card>
    <add-role :is-show.sync="flag"></add-role>
  </div>
</template>

<script>
import { getComdetail } from '@/api/order'
import addRole from './components/addRole.vue'
export default {
  components: {
    addRole
  },
  data() {
    return {
      flag: false,
      value: '',
      list: []
    }
  },
  created() { this.getComdetail() },
  methods: {
    searchName() { },
    async getComdetail() {
      const { data } = await getComdetail(1, 10)
      this.list = data.currentPageRecords
      console.log(data)
    }
  }

}
</script>

<style scoped lang="scss">
  .detail {
    padding: 40px;
    .box-card {
      height: 80px;
      margin-bottom: 20px;
    }
    .btn {
      background-color: #ff7931;
      border-color: #ff7931;
    }
    .fourtips span {
      margin-right: 10px;
      color: #4368e3;
    }
    .fourtips span:last-child {
      color: red;
    }
  }

</style>

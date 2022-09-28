<template>
  <div>
    <el-dialog
      :visible="isShow"
      width="40%"
      center
      top="80px"
      :before-close="cancle"
    >
      <h4>新增合作商</h4>
      <el-form label-position="right" label-width="100px" :model="formLabelAlign">
        <el-form-item label="合作商名称">
          <el-input v-model="formLabelAlign.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="formLabelAlign.region" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formLabelAlign.type" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="分成比例(%)">
          <el-input v-model="formLabelAlign.type" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="formLabelAlign.type" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.type" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formLabelAlign: {}
    }
  },
  methods: {
    cancle() {
      this.$emit('update:is-show', false)
    },
    submit() {
      this.cancle()
    }
  }

}
</script>

<style>

</style>

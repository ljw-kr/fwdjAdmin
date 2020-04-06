<template>
  <div class="admin">
    <commonTop></commonTop>
    <div class="center">
      <el-tabs v-model="activeName">
        <el-tab-pane label="厨师管理" name="first">厨师管理</el-tab-pane>
        <el-tab-pane label="订单管理" name="second">订单管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="third">配置管理</el-tab-pane>
        <el-tab-pane label="付款流水" name="fourth">付款流水</el-tab-pane>
      </el-tabs>
    </div>
    <commonBottom></commonBottom>
  </div>
</template>

<script>
import commonTop from '@/components/commonTop'
import commonBottom from '@/components/commonBottom'
export default {
  name: 'home',
  components: { commonTop, commonBottom },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {}
}
</script>

<style scoped>
.admin {
}
.center{
  width:1200px;
  height: auto;
  margin: 0 auto;
  margin-top: 50px;
  border:1px solid #ccc;
  padding-left: 130px;
  padding-top: 20px;
}
</style>

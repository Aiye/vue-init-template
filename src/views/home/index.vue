<template>
  <div class="main">
    <div class="btn" @click="showPup('success')">成功提示</div>
    <div class="btn" @click="showPup('wraning')">警告提示</div>
    <div class="btn" @click="showPup('error')">错误提示</div>
    <div class="btn" @click="showPup('info')">信息提示</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions(['showPopupAction']),
    showPup(type) {
      this.showPopupAction({
        type: type,
        msg: '这是一条' + type + '提示！',
        time: 3000 //默认1500毫秒
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  position: relative;
  padding: 10px;
  height: 100%;
  width: 100%;
  background-color: white;
  div {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .btn {
    padding: 10px;
    margin: 10px 0;
    color: white;
    background-color: #000000;
    border: 1px solid #f5f5f5;
    border-radius: 5px;
  }
}
</style>



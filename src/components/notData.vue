<template>
  <div class="notDataClass">
    <div class="content" v-if="type=='0'">
      <div>
        <img src="@/assets/notData/zwsj_img.png" />
      </div>
      <div class="content-text">{{text}}</div>
    </div>
    <div v-if="type=='1'" class="content_jqqd">
      <div>
        <img class="jqqd_img" src="@/assets/notData/jqqd_img.png" alt="">
      </div>
      <div>
        <img class="jqqd_text" src="@/assets/notData/jqqd_text.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '0'// 0：无数据 1：敬请期待
    },
    text: {
      type: String,
      default: '暂无内容'
    }
  }
}
</script>

<style lang="less" scoped>
.notDataClass {
  .content {
    text-align: center;
    img {
      margin-top: 30%;
      width: 127px;
    }
    .content-text {
      margin-top: 10px;
      color: #999;
      font-size: 15px;
    }
  }
  .content_jqqd {
    text-align: center;
    .jqqd_img {
      width: 127px;
      padding-top: 40%;
    }
    .jqqd_text {
      height: 20px;
    }
  }
}
</style>

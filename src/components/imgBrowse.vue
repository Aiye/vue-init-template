<template>
  <div class="imgBrowse">
    <img class="img" v-for="(src,index) in list" :key="index" :src="src" alt="" @click="show(index)">
    <div v-transfer-dom>
      <previewer :list="imgList" ref="previewer"></previewer>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux'
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  directives: { TransferDom },
  components: { Previewer },
  data() {
    return {
      imgList: []
    }
  },
  mounted() {
    this.list.forEach(element => {
      this.imgList.push({ src: element })
    });
  },
  methods: {
    show(index) {
      this.$refs.previewer.show(index)
    }
  }
}
</script>

<style lang="less" scoped>
.imgBrowse {
  padding: 10px 0;
  .img {
    height: 80px;
    margin-right: 10px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
  }
}
</style>


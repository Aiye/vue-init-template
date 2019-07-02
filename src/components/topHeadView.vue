<template>
  <div class="topHeadView">
    <div class="headCell" :class="selectedIndex==index?'selected':''" v-for="(item,index) in list" :key="index" @click="onClick(index)">
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    selectedIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onClick(index) {
      this.$emit('selectedIndexChange', index)
      this.$emit('on-change')
    }
  }
}
</script>

<style lang="less" scoped>
.topHeadView {
  width: 100%;
  height: 44px;
  line-height: 44px;
  display: -webkit-box;
  overflow: scroll;
  font-size: 14px;
  // padding: 0 10px;
  background-color: white;
  -webkit-overflow-scrolling: touch;

  .headCell {
    position: relative;
    padding: 0 10px;
  }
  .selected {
    color: #2d8cf0;
  }
  .selected:after {
    content: "";
    position: absolute;
    left: 3vw;
    right: 3vw;
    bottom: 2px;
    height: 2px;
    background-color: #2d8cf0;
  }
}
</style>

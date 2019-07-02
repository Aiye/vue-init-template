<template>
  <div class="cellExhibition">
    <div class="cellExhibition-left">{{title}}</div>
    <div class="cellExhibition-right">{{value}}</div>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.cellExhibition {
  display: -webkit-box;
  padding: 12px 0;
  position: relative;
  font-size: 14px;
  .cellExhibition-left {
    padding-right: 15px;
    color: #333;
  }
  .cellExhibition-right {
    -webkit-box-flex: 1;
    text-align: right;
    color: #666;
  }
  .cellExhibition-ft {
    padding-left: 2px;
    color: #999;
  }
}
.cellExhibition:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #f2f2f2;
  color: #f2f2f2;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>


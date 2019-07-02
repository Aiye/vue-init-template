<template>
  <span class="raterView" :style="{pointerEvents: disabled==true?'none':'all'}">
    <a v-for="i in max" :key="i" class="iconfont icon-shoucang3" :class="i<=value?'rater_h':'rater_n'" :style="{paddingRight:margin+'px',paddingLeft:margin+'px'}"
      @click.stop="raterTap(i)"></a>
  </span>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'raterChange'
  },
  props: {
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    margin: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    raterTap(i) {
      this.$emit('raterChange', i)
    }
  }
}
</script>

<style lang="less" scoped>
.raterView {
  display: inline-block;
  .rater_n {
    color: #cccccc;
  }
  .rater_h {
    color: #fc9c00;
  }
}
</style>

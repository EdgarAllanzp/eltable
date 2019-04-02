<template>
  <div :class="b()">
    <div :class="b('image')">

    </div>
    <p :class="b('desc')">暂无数据</p>
  </div>
</template>

<script>
import bem from '../mixins/bem';

export default {
  mixins: [bem]
}
</script>

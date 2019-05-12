<template>
<div class="home">
  <aRow type="flex" class="lecture-flex">
    <aCol :xs="24" :sm="12" :lg="8" :xxl="6" v-for="lecture in sLectures">
      <lecture class="lecture" :lectInfo="lecture" :key="lecture.id" :crack="crack"></lecture>
    </aCol>
  </aRow>
</div>
</template>

<script>
import Lecture from '@/components/Lecture.vue'

export default {
  name: 'home',
  components: {
    Lecture
  },
  props: {
    crack: {
      type: Boolean,
      default: false
    },
    sLectures: Array
  },
  beforeUpdate() {
    if (this.crack) {
      document.title = 'BUCM Lectures Crack'
    } else {
      document.title = 'BUCM Lectures'
    }
  }
}
</script>

<style lang="scss" scoped>
.lecture-flex {
    // align-items: stretch;
}
</style>

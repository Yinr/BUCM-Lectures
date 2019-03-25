<template>
<div class="home">
  <Row type="flex">
    <Col :xs="24" :sm="12" :lg="8" v-for="lecture in sLectures">
    <lecture class="lecture" :lectInfo="lecture" :key="lecture.id" :crack="crack"></lecture>
    </Col>
  </Row>
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

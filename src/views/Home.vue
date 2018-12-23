<template>
<div class="home">
  <Row type="flex">
    <Col :xs="24" :sm="12" :lg="8" v-for="lecture in sLectures">
    <lecture class="lecture" :lectInfo="lecture" :key="lecture.id"></lecture>
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
    sLectures: Array
  }
}
</script>

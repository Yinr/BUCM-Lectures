<template>
<v-app id="bucm-lectures" class="section">
  <v-toolbar color="indigo" dark>
    <v-toolbar-title>
      BUCM Lectures
    </v-toolbar-title>
  </v-toolbar>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <lecture v-for="lecture in sortedLectures" :lectInfo="lecture" :key="lecture.id"></lecture>
    </v-layout>
  </v-container>
  <y-footer></y-footer>
</v-app>
</template>

<script>
import Lecture from './components/Lecture.vue'
import YFooter from './components/Footer.vue'

export default {
  name: 'bucm-lectures',
  components: {
    Lecture,
    YFooter
  },
  data() {
    return {
      lectures: []
    }
  },
  created() {
    this.updateData();
  },
  mounted() {
    this.initCNZZ();
  },
  computed: {
    sortedLectures: function() {
      return this.lectures.sort(
        (a, b) => (new Date(b.time)) - (new Date(a.time))
      );
    }
  },
  methods: {
    updateData() {
      let that = this
      axios
        .get("/data/lectures.json")
        .then(response => {
          that.lectures = response.data
        })
    },
    initCNZZ() {
      //添加脚本
      const cnzzid = '1275164029'
      const script = document.createElement('script');
      script.src = 'https://s22.cnzz.com/z_stat.php?id=' + cnzzid + '&web_id=' + cnzzid;
      script.language = 'JavaScript';
      script.id = 'cnzz';
      document.body.appendChild(script);
    }
  },
  watch: {
    '$route'() {
      if (window._czc) {
        //监听路由变化
        let location = window.location;
        let contentUrl = location.pathname + location.hash;
        let refererUrl = '/';
        window._czc.push(['_trackPageview', contentUrl, refererUrl])
      }
    }
  }
}
</script>

<style lang="scss">

</style>

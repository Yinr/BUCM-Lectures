<template>
<div id="bucm-lectures" class="section">
  <aLayout>
    <aLayoutHeader>
      <div class="header-title">BUCM Lectures</div>
      <!-- <aButton ghost icon="reload" @click="updateData" /> -->
      <aIcon id="fresh-btn" type="reload" @click="updateData" />
    </aLayoutHeader>
    <aLayoutContent>
      <router-view :sLectures="sortedLectures"></router-view>
    </aLayoutContent>
    <aLayoutFooter>
      Copyright &copy; 2018 <a href="https://yinr.cc">Yinr</a>.
    </aLayoutFooter>
  </aLayout>
</div>
</template>

<script>
export default {
  name: 'bucm-lectures',
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
    sortedLectures: function () {
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

<style lang="scss" scoped>
.ant-layout {
    position: relative;
    .ant-layout-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        width: 100%;
        top: 0;
        z-index: 1000;
        box-shadow: 0 3px 3px lightgray;
        font-size: 24px;
        font-weight: bold;
        color: white;
        #fresh-btn:hover {
            color: lightblue;
        }
    }
    .ant-layout-footer {
        text-align: center;
    }
}
</style>

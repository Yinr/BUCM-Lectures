<template>
<div id="bucm-lectures" class="section">
  <Layout class="layout">
    <Header class="header">
      <div>BUCM Lectures</div>
    </Header>
    <Content class="content">
      <router-view :sLectures="sortedLectures"></router-view>
    </Content>
    <Footer class="footer">Copyright &copy; 2018 <a href="https://yinr.cc">Yinr</a>.</Footer>
  </Layout>
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
.layout {
    position: relative;
    .header {
        position: sticky;
        width: 100%;
        top: 0;
        z-index: 1000;
        box-shadow: 0 3px 3px lightgray;
        font-size: 24px;
        font-weight: bold;
        color: white;
    }
    .content {
        font-family: "";
    }
    .footer {
        text-align: center;
    }
}
</style>

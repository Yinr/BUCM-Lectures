<template>
<Card class="lecture" :padding="10">
  <Row class="lecture-topinfo" type="flex" justify="space-between">
    <Tooltip :content="lectInfo.time" placement="top-start">
      <Time :time="lectInfo.time" />
    </Tooltip>
    <span><a :href="classroomUrl">
        @{{ lectInfo.classroom }}
      </a></span>
  </Row>
  <Row class="lecture-title" :class="{'has-text-grey': this.isOutTime(lectInfo.time)}">
    <b>{{ lectInfo.title }}</b>
  </Row>
  <Row type="flex" justify="space-between">
    <Button size="small" shape="circle" ghost type="primary" target="_blank" :to="infoUrl">
      详情
    </Button>
    <ButtonGroup size="small">
      <Button type="info" :disabled="this.isOutTime(lectInfo.time)" target="_blank" :to="signUpUrl">
        报名
      </Button>
      <Button type="success" :disabled="!this.isDuringTime(lectInfo.time)" target="_blank" :to="signInUrl">
        签到
      </Button>
    </ButtonGroup>
  </Row>
</Card>
</template>

<script>
export default {
  name: 'Lecture',
  props: {
    lectInfo: Object,
    crack: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  computed: {
    signUpUrl() {
      let url = 'https://bucmedu.wjx.cn/jq/' + this.lectInfo.id + '.aspx';
      return url;
    },
    signInUrl() {
      let crack = this.crack;
      let url_base = crack ?
        'http://bucmwjx.yinr.cc/app/checkin.aspx?activity=' :
        'https://bucmedu.wjx.cn/app/checkin.aspx?activity=';
      let url = url_base + this.lectInfo.id;
      return url;
    },
    infoUrl() {
      let infoId = this.lectInfo.infoId;
      let infoUrl = "https://xiumi.us/stage/v5/37Dxv/" + infoId;
      return infoUrl;
    },
    classroomUrl() {
      let classroom = this.lectInfo.classroom;
      let url = 'https://class.yinr.cc/classroom/#' + classroom;
      return classroom.length == 0 ? "" : url;
    }
  },
  methods: {
    isOutTime(strTime) {
      var lectEndTime = new Date(strTime);
      lectEndTime.setHours(lectEndTime.getHours() + 4);
      var now = new Date();
      return now > lectEndTime;
    },
    isDuringTime(strTime) {
      var lectTime = new Date(strTime);
      var lectEndTime = new Date(lectTime);
      lectEndTime.setHours(22);
      lectTime.setHours(lectTime.getHours(), lectTime.getMinutes() - 30);
      var now = new Date();
      return now >= lectTime && now <= lectEndTime;
    }
  }
}
</script>

<style lang="scss">
.lecture {
    margin: 10px;
    box-shadow: 1px 1px 1px lightgray;
    .lecture-topinfo span {
        color: #9ea7b4;
        font-size: smaller;
        a:link,
        a:visited {
            color: #9ea7b4;
        }
    }
    .lecture-title {
        margin: 10px 20px;
        font-size: 16px;
        text-align: center;
    }
    .ivu-btn {
        padding: 0 14px;
        line-height: 1.5;
    }
}
</style>

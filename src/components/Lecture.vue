<template>
<Card class="lecture" :padding="10">
  <Row class="lecture-topinfo" type="flex" justify="space-between">
    <Time :time="lectInfo.time" />
    <span><a :href="lectInfo.classroom | getClassroomUrl">
        {{ lectInfo.classroom | fmtClassroom }}
      </a></span>
  </Row>
  <Row class="lecture-title" :class="{'has-text-grey': this.isOutTime(lectInfo.time)}">
    <b>{{ lectInfo.title }}</b>
  </Row>
  <Row type="flex" justify="space-between">
    <Button size="small" shape="circle" ghost type="primary" :to="lectInfo.infoId | getInfoUrl">
      详情
    </Button>
    <ButtonGroup size="small">
      <Button type="info" :disabled="this.isOutTime(lectInfo.time)" :to="lectInfo.id | getSignUpUrl">
        报名
      </Button>
      <Button type="success" :disabled="!this.isDuringTime(lectInfo.time)" :to="lectInfo.id | getSignInUrl">
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
    lectInfo: Object
  },
  filters: {
    fmtDate: function(str) {
      var theDate = new Date(str);
      return (theDate.getFullYear() + '/' +
        (theDate.getMonth() + 1) + '/' +
        theDate.getDate() + ' ' +
        theDate.getHours() + ':' +
        (theDate.getMinutes() < 10 ? "0" : "") + theDate.getMinutes()
      )
    },
    fmtClassroom: function(str) {
      return '@' + str;
    },
    getSignUpUrl: function(id) {
      var url = 'https://bucmedu.wjx.cn/jq/' + id + '.aspx';
      return url;
    },
    getSignInUrl: function(id) {
      var url = 'https://bucmedu.wjx.cn/app/checkin.aspx?activity=' + id;
      return url;
    },
    getInfoUrl: function(infoId) {
      let infoUrl = "https://xiumi.us/stage/v5/37Dxv/" + infoId;
      return infoUrl;
    },
    getClassroomUrl: function(classroom) {
      var url = 'https://class.yinr.cc/classroom/#' + classroom;
      if (classroom.length == 0) {
        url = "";
      }
      return url;
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

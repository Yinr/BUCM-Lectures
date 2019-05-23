<template>
<aCard class="lecture" :bodyStyle="{padding: '20px'}" @click="toggleShowTitle">
  <aRow class="lecture-topinfo" type="flex" justify="space-between">
    <span>{{lectInfo.time}}</span>
    <span><a :href="classroomUrl">
        @{{ lectInfo.classroom }}
      </a></span>
  </aRow>
  <aRow class="lecture-title" :class="{'lecture-title-grey': this.isOutTime(lectInfo.time)}">
    <span v-if="showTitle">{{ lectInfo.title }}</span>
    <aCardMeta v-else :title="lectInfo.title" />
  </aRow>
  <template slot="actions">
    <a target="_blank" :href="infoUrl">
      <aIcon type="info-circle">详情</aIcon>
    </a>
    <a target="_blank" :href="signUpUrl" :disabled="this.isOutTime(lectInfo.time)">
      <aIcon type="edit">报名</aIcon>
    </a>
    <a target="_blank" :href="signInUrl" :disabled="!this.isDuringTime(lectInfo.time)">
      <aIcon type="environment">签到</aIcon>
    </a>
  </template>
</aCard>
</template>

<script>
export default {
  name: 'Lecture',
  data() {
    return {
      showTitle: false,
    }
  },
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
        'https://bucmwjxold.yinr.cc/bucm/' :
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
    },
    toggleShowTitle() {
      return this.showTitle = !this.showTitle
    }
  }
}
</script>

<style lang="scss" scoped>
.lecture {
    margin: 5px 10px;
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
    .lecture-title-grey {
        color: grey;
    }
    .ant-button {
        padding: 0 14px;
        line-height: 1.5;
    }
}
</style>

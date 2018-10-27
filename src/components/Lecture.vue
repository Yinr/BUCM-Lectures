<template>
<div class="lecture box">
  <div class="level is-mobile">
    <div class="level-left">
      <span class="level-item tag has-text-left">
        <span class="tag is-light">
          {{ lectInfo.time | fmtDate }}
        </span>
      </span>
    </div>
    <div class="level-right">
      <a class="level-item tag is-light" :href="lectInfo.classroom | getClassroomUrl">
        {{ lectInfo.classroom | fmtClassroom }}
      </a>
    </div>
  </div>
  <span class="level-item title is-4" :class="{'has-text-grey': this.isOutTime(lectInfo.time)}">
    {{ lectInfo.title }}
  </span>
  <div class="level">
    <div class="level-left">
      <a class="button is-gray is-small has-text-grey-light" :href="lectInfo.url">
        详情
      </a>
    </div>
    <div class="level-right">
      <a class="level-item button is-link is-small" :class="{'is-static': this.isOutTime(lectInfo.time)}" :href="lectInfo.id | getSignUpUrl">
        报名
      </a>
      <a class="level-item button is-success is-small" :class="{'is-static': !this.isDuringTime(lectInfo.time)}" :href="lectInfo.id | getSignInUrl">
        签到
      </a>
    </div>
  </div>
</div>
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
      lectEndTime.setHours(lectTime.getHours() + 4);
      lectTime.setHours(lectTime.getHours() - 1);
      var now = new Date();
      return now >= lectTime && now <= lectEndTime;
    }
  }
}
</script>

<style scoped lang="scss">

</style>

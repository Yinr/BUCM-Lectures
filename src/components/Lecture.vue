<template>
<v-flex>
  <v-card class="lecture" elevation-2>
    <v-container text-xs-center>
      <v-layout column>
        <v-flex>
          <v-layout px-1>
            <v-card flat class="caption grey--text">
              {{ lectInfo.time | fmtDate }}
            </v-card>
            <v-spacer></v-spacer>
            <v-card flat class="caption grey--text" :href="lectInfo.classroom | getClassroomUrl">
              {{ lectInfo.classroom | fmtClassroom }}
            </v-card>
          </v-layout>
        </v-flex>
        <v-flex>
          <span class="level-item title is-4" :class="{'has-text-grey': this.isOutTime(lectInfo.time)}">
            {{ lectInfo.title }}
          </span>
        </v-flex>
        <v-flex>
          <v-layout>
            <v-btn small outline color="teal" :href="lectInfo.url">
              详情
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn small color="info" :disabled="this.isOutTime(lectInfo.time)" :href="lectInfo.id | getSignUpUrl">
              报名
            </v-btn>
            <v-btn small color="success" :disabled="!this.isDuringTime(lectInfo.time)" :href="lectInfo.id | getSignInUrl">
              签到
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</v-flex>
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

var lecturesVM = new Vue({
    el: '#bucm-lectures',
    data: {
        items: [{
            id: 28190609,
            title: "三十年中美临床感悟-田海河博士",
            time: "2018-9-21 14:00:00",
            classroom: "东-9教",
            url: "https://a.xiumi.us/stage/v5/37Dxv/107159455"
        },{
            id: 29642680,
            title: "中医药创新发展分论坛",
            time: "2018-10-26 14:00:00",
            classroom: "西-三报",
            url: "https://r.xiumi.us/stage/v5/37Dxv/113332369"
        }]
    },
    filters: {
        fmtDate: function(str) {
            var theDate = new Date(str);
            return(theDate.getFullYear() + '/' +
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
            if (classroom.length == 0) { url = ""; }
            return url;
        }
    },
    computed: {
        sortedItems: function() {
            return this.items.sort(
                (a, b) => (new Date(b.time)) - (new Date(a.time))
            );
        }
    }
})

function isOutTime(strTime) {
    var lectEndTime = new Date(strTime);
    lectEndTime.setHours(lectEndTime.getHours() + 4);
    var now = new Date();
    return now > lectEndTime;
}

function isDuringTime(strTime) {
    var lectTime = new Date(strTime);
    var lectEndTime = new Date(lectTime);
    lectEndTime.setHours(lectTime.getHours() + 4);
    lectTime.setHours(lectTime.getHours() - 1);
    var now = new Date();
    return now >= lectTime && now <= lectEndTime;
}

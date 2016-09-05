// 学生个人信息
lbApp.controller('StudentProfileController', ['$rootScope', '$scope', '$routeParams', 'UtilsService', 'RequestService', function ($rootScope, $scope, $routeParams, UtilsService, RequestService) {
    //
    "use strict";
    // 设置边栏
    $scope.asideTab = {
        listName: 'student',
        tabName: 'tabName'
    };
    RequestService.request({
        token: 's_profile',
        method: 'GET',
        loading: true,
        success: function (data) {
            $rootScope.studentInfo = data;
        }
    })
}]);
// 修改密码
lbApp.controller('StudentEditPwdController', ['$rootScope', '$scope', '$routeParams', 'UtilsService', 'RequestService', function ($rootScope, $scope, $routeParams, UtilsService, RequestService) {
    //
    "use strict";
    // 设置边栏
    $scope.asideTab = {
        listName: 'student',
        tabName: 'tabName'
    };
    $scope.password = {
        'oldPassword': '',
        'newPassword': ''
    };
    $scope.submitPassword = function () {
        console.log($scope.password);
        RequestService.request({
            token: 's_editPwd',
            method: 'POST',
            data: UtilsService.serialize($scope.password),
            loading: true,
            success: function (data) {
                UtilsService.href('/student/course')
            }
        })
    }

}]);


//我的课程
lbApp.controller('StudentCourseController', ['$scope', '$routeParams', 'UtilsService', 'RequestService', function ($scope, $routeParams, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'student',
        tabName: 'tabName'
    };

    //课程状态
    $scope.classesStatusMap = {
        '0': '未开课',
        '1': '开课中',
        '2': '已完结'
    }

    $scope.inflag = true;

    // 绑定弹框事件
    UtilsService.initPop($scope);
    $scope.s_myCourse = [];


    //查询条件
    $scope.conditions = {
        // 值查询
        common: {},
        // 分页信息
        pageInfo: {
            page: 1,
            pageSize: '20',
            totalPage: 0
        }
    }

    //班级列表
    $scope.t_classListArr = {};

    // 获取班级列表项
    $scope.getclasslist = function (page) {
        $scope.conditions.pageInfo.page = page || 1;
        RequestService.request({
            token: 's_course_list',
            method: 'GET',
            strParams: UtilsService.genConditions($scope.conditions),
            success: function (data) {
                console.log(data);
                $scope.conditions.pageInfo.totalPage = data.pages;
                $scope.s_myCourse = data.result;
                $scope.total = data.total;

            }
        });
    }
    $scope.getclasslist(1);

    //防止重复提交多次
    RequestService.request({
        token: 's_course_list',
        method: 'GET',
        strParams: UtilsService.genConditions($scope.conditions),
        success: function (data) {
            $scope.inflag = false;
            $scope.s_myCourse = data.result;
            console.log($scope.s_myCourse);
        }
    });
    //加入课程
    $scope.sequenceNo;




    document.onkeydown = function (event) {
        if (event && event.keyCode == 13) { // 按 4
            if($("#pop-class").is(':visible')){
                $scope.inflag = true;
                $scope.addCourse($scope.s_myCourse.sequenceNo);
            }

        }
    };

    $scope.addCourse = function (sequenceNo) {
        RequestService.request({
            token: 's_addCourse',
            method: 'POST',
            data: UtilsService.serialize({sequenceNo: sequenceNo}),
            success: function () {
                $scope.inflag = false;
                $scope.closePop('pop-class');
                location.reload();
            }
        })
    }
    //退出课程
    $scope.delCourse = function (classesId) {
        if (confirm("确定退出课程吗")) {
            RequestService.request({
                token: 's_delCourse',
                method: 'POST',
                params: {classesId: classesId},
                data: UtilsService.serialize({classesId: classesId}),
                success: function (data) {
                    location.reload();
                    //UtilsService.href("/class/courseSetting/"+classID);
                    $scope.s_courseList();
                }
            });
        }

    }


}]);
//我的课程详情
lbApp.controller('StudentCourseDetailController', ['$scope', '$routeParams', 'UtilsService', 'RequestService', function ($scope, $routeParams, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'student',
        tabName: 'tabName'
    };
    //查询条件
    $scope.conditions = {
        // 值查询
        common: {
            courseId: $routeParams.courseID
        },
        // 分页信息
        pageInfo: {
            page: 1,
            pageSize: '20',
            totalPage: 0
        }
    }

    //班级列表
    $scope.t_classListArr = {};

    //请求章节列表数据
    $scope.getclasslist = function (page) {
        $scope.conditions.pageInfo.page = page || 1;
        RequestService.request({
            token: 's_chapterList',
            method: 'GET',
            strParams: UtilsService.genConditions($scope.conditions),
            success: function (data) {
                console.log(data);
                $scope.conditions.pageInfo.totalPage = data.pages;
                $scope.total = data.total;
                $scope.courseChapter = data.result;

            }
        });
    }
    $scope.getclasslist(1);


    $scope.course = {
        //课程名
        name: '',
        //课程简介
        description: ''
    }
    //课程信息
    console.log($routeParams.courseID);
    RequestService.request({
        token: 's_course',
        method: 'post',
        data: UtilsService.serialize({courseId: $routeParams.courseID}),
        success: function (data) {
            console.log(data);
            $scope.course = data;
            s_chapterList($scope.course.id);
        }
    });

    //判断是否为空
    function isEmptyObject(obj) {
        for (var n in obj) {
            return false
        }
        return true;
    }
    //准备中的章节，不能开始练习
    $scope.StartExe = function(status,chapterID){
        if(status == 0){
            alert("准备中的章节，还不开始练习")
        }else{
            UtilsService.href('/student/study/'+chapterID);
        }
    }
    $scope.courseChapter = [];

    // 请求章节列表数据
    function s_chapterList() {
        RequestService.request({
            token: 's_chapterList',
            method: 'GET',
            strParams: 'courseId=' + $routeParams.courseID,
            loading: true,
            success: function (data) {
                console.log(data);
                $scope.courseChapter = data.result;
            }
        });
    }
}]);
//开始学习
lbApp.controller('StudyController', ['$scope', '$routeParams', 'UtilsService', 'RequestService', function ($scope, $routeParams, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'student',
        tabName: 'tabName'
    };
    //页面切换
    $scope.p_status = '1';
    //页面切换的状态码
    $scope.pageStatus = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4'
    }
    $scope.keyJudgeMap = {
        'key-1': false,
        'key-2': false,
        'key-3': false,
        'key-4': false,
        'key-5': false
    }
    $scope.pageS = function (NO) {
        //切换
        $scope.p_status = $scope.pageStatus[NO];
        //音量校准
        if (NO == 2) {
            var musicAudio = document.getElementById("musicAudio");
            musicAudio.play();
        }
        if (NO == 3) {
            var musicAudio = document.getElementById("musicAudio");
            musicAudio.pause();
            //键盘校准 1 ， 2 ， 3 ， 4 ， 回车
            document.onkeydown = function (event) {
                var e = event || window.event;
                if (e && e.keyCode == 49) { // 按 1
                    $(".key-1").addClass("bgcolor-blue");
                    $scope.keyJudgeMap['key-1'] = true;
                    if ($scope.keyJudgeMap['key-1'] && $scope.keyJudgeMap['key-2'] && $scope.keyJudgeMap['key-3'] && $scope.keyJudgeMap['key-4'] && $scope.keyJudgeMap['key-5']) {
                        $("#prepare").show();
                        $("#keyCodeAlign").hide();
                        startExe();
                    }
                }
                if (e && e.keyCode == 50) { // 按 2
                    $(".key-2").addClass("bgcolor-blue");
                    $scope.keyJudgeMap['key-2'] = true;
                    if ($scope.keyJudgeMap['key-1'] && $scope.keyJudgeMap['key-2'] && $scope.keyJudgeMap['key-3'] && $scope.keyJudgeMap['key-4'] && $scope.keyJudgeMap['key-5']) {
                        $("#prepare").show();
                        $("#keyCodeAlign").hide();
                        startExe();
                    }
                }
                if (e && e.keyCode == 51) { // 按 3
                    $(".key-3").addClass("bgcolor-blue");
                    $scope.keyJudgeMap['key-3'] = true;
                    if ($scope.keyJudgeMap['key-1'] && $scope.keyJudgeMap['key-2'] && $scope.keyJudgeMap['key-3'] && $scope.keyJudgeMap['key-4'] && $scope.keyJudgeMap['key-5']) {
                        $("#prepare").show();
                        $("#keyCodeAlign").hide();
                        startExe();
                    }
                }
                if (e && e.keyCode == 52) { // 按 4
                    $(".key-4").addClass("bgcolor-blue");
                    $scope.keyJudgeMap['key-4'] = true;
                    if ($scope.keyJudgeMap['key-1'] && $scope.keyJudgeMap['key-2'] && $scope.keyJudgeMap['key-3'] && $scope.keyJudgeMap['key-4'] && $scope.keyJudgeMap['key-5']) {
                        $("#prepare").show();
                        $("#keyCodeAlign").hide();
                        startExe();
                    }
                }
                if (e && e.keyCode == 13) { // 按 enter
                    $(".key-5").addClass("bgcolor-blue");
                    $scope.keyJudgeMap['key-5'] = true;
                    if ($scope.keyJudgeMap['key-1'] && $scope.keyJudgeMap['key-2'] && $scope.keyJudgeMap['key-3'] && $scope.keyJudgeMap['key-4'] && $scope.keyJudgeMap['key-5']) {
                        $("#prepare").show();
                        $("#keyCodeAlign").hide();
                        startExe();
                    }
                }
            };
        }
    }

    //请准备页面，点击回车，开始做题
    function startExe() {
        document.onkeydown = function (event) {
            if (event.keyCode == 13) { // 按 enter
                RequestService.request({
                    token: 's_course_list',
                    method: 'GET',
                    success: function (data) {
                        UtilsService.href('/student/study_keying/' + $scope.execiseID);
                    }
                });
            }
        };


    }


    RequestService.request({
        token: 't_chapterShow',
        method: 'POST',
        data: UtilsService.serialize({id: $routeParams.chapterID}),
        success: function (data) {
            $scope.chapterInfo = data;
            shengcheng();
        }
    });

    function shengcheng() {
        RequestService.request({
            token: 't_exercise_list',
            method: 'GET',
            params: {chapterId: $routeParams.chapterID},
            success: function (data) {
                $scope.execiseID = data;
            }
        })
    }
}]);
//做题
lbApp.controller('StudyKeyingController', ['$scope', '$routeParams', 'UtilsService', 'RequestService', function ($scope, $routeParams, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'student',
        tabName: 'tabName'
    };
    //退出
    $scope.exe_out_finish = function(){
        if(confirm("练习还未完成，确定退出吗？")){
            UtilsService.href('/student/course');
        }
    }
    //练习
    $scope.exerciseInfo = {};
    //答题
    $scope.execiseAnswer = {
        chapterExerciseId: '',
        exerciseId: '',
        answer: '',
        answerBody: ''
    };
    $("#imgShow").hide();
    //等待加载嘟嘟嘟~
    setTimeout(function () {
        $("#dududu").hide();
        $("#exerciseQ").show();
    }, 1000);

    //判断是否为空
    function isEmptyObject(obj) {
        for (var n in obj) {
            return false
        }
        return true;
    }
    //提取习题
    RequestService.request({
        token: 's_chapterExercise',
        method: 'GET',
        params: {chapterExerciseId: $routeParams.exerciseID},
        success: function (data) {
            console.log(data);
            if(isEmptyObject(data)){
                alert("没有可以练习的习题");
                UtilsService.href('/student/course');
            }else{
                chapterExercise(data);
            }

        }
    });
    function chapterExercise(data) {
        $("#dududu").show();
        $("#exerciseQ").hide();


        $scope.exerciseInfo = data;
        $scope.execiseAnswer.chapterExerciseId = data.chapterExerciseId;
        $scope.execiseAnswer.exerciseId = data.id;
        $scope.musicSrc = '../../vendor/mp3/' + $scope.exerciseInfo.questionsPronunciation.filePath.substr(12);
        var imgSrcNum = $scope.exerciseInfo.questionsId;
        $scope.imgSrc = '../../vendor/png/' + imgSrcNum + '.png';

        var dududu_Audio = document.getElementById('dududu_Audio');
        dududu_Audio.play();
        var musicAudio = document.getElementById('musicAuto');
        dududu_Audio.onended = function(){
            setTimeout(function(){
                $("#dududu").hide();
                $("#exerciseQ").show();
                musicAuto.play();
            },1000);
        }
        $("#answer").html("");
        if ($scope.exerciseInfo.questionsPronunciation.tones.length == 1) {
            var html = '<div class="key-1">' +
                '<div class="answer_empty">' + '</div>' +
                '</div>';
        } else if ($scope.exerciseInfo.questionsPronunciation.tones.length == 2) {
            var html = '<div class="key-2">' +
                '<div class="answer_empty">' + '</div>' +
                '<div class="answer_empty">' + '</div>'
                + '</div>';
        } else if ($scope.exerciseInfo.questionsPronunciation.tones.length == 3) {
            var html = '<div class="key-3">' +
                '<div class="answer_empty">' + '</div>' +
                '<div class="answer_empty">' + '</div>' +
                '<div class="answer_empty">' + '</div>'
                + '</div>'
        } else if ($scope.exerciseInfo.questionsPronunciation.tones.length == 4) {
            var html = '<div class="key-4">' +
                '<div class="answer_empty">' + '</div>' +
                '<div class="answer_empty">' + '</div>' +
                '<div class="answer_empty">' + '</div>' +
                '<div class="answer_empty">' + '</div>'
                + '</div>'
        }
        $("#answer").html(html);
        var flag = true;
        document.onkeydown = function (event) {
            if (event.keyCode == 49) { // 按 1
                if ($("#exerciseQ").is(":visible")) {
                    select(-1, 1);
                }
            }
            if (event.keyCode == 50) { // 按 2
                if ($("#exerciseQ").is(":visible")) {
                    select(-1, 2);
                }
            }
            if (event.keyCode == 51) { // 按 3
                if ($("#exerciseQ").is(":visible")) {
                    select(-1, 3);
                }
            }
            if (event.keyCode == 52) { // 按 4
                if ($("#exerciseQ").is(":visible")) {
                    select(-1, 4);
                }
            }
        };
        var userAnswer = [];
        $("#answer").find('.answer_empty').html('');
        var rightAnswer = [];
        function select(num, code,T_F) {
            userAnswer.push(code);
            var codeT = '';
            codeT = userAnswer.join('') + "";
            console.log(codeT);
            $.each(userAnswer,function(n,value){
                var selectHtml = '<span class="icon border-3-white icons-' + value + '"></span>';
                $("#answer").find('.answer_empty').eq(n).html('');
                $("#answer").find('.answer_empty').eq(n).html(selectHtml);
            })
            $scope.execiseAnswer.answerBody = codeT;
            var TonsAnswer = $scope.exerciseInfo.questionsPronunciation.tones + "";
                if (TonsAnswer == codeT) {
                    $scope.execiseAnswer.answer = true;
                    $("#answer").find('.icon').addClass('border-3-green');
                    //初始化暂存答案的数组
                    userAnswer = [];
                    setTimeout(function(){
                        nextExe();
                    },1000);
                } else {
                    $scope.execiseAnswer.answer = false;
                    if (TonsAnswer.length == codeT.length) {
                        var rightA = TonsAnswer.split("");
                        var userA = codeT.split("");
                        for(var i = 0 ; i < rightA.length ; i++){
                            if(rightA[i] == userA[i]){
                                $("#answer").find('.icon').eq(i).addClass('border-3-green');
                            }else{
                                $("#answer").find('.icon').eq(i).addClass('border-3-red');
                            }
                        }
                        $("#imgShow").show();
                        flag = false;
                        document.onkeydown = function (event) {
                            if (event && event.keyCode == 13) { // 按 1
                                $("#imgShow").hide();
                                flag = true;
                                //nextExe();
                                //舒适化暂存答案的数组
                                userAnswer = [];
                                $("#answer").find('.answer_empty').html('');
                                if($scope.exerciseInfo.pattern == 0){
                                    var repeatTimes = false;
                                    //$("#answer").find('.answer_empty').html('');
                                    var musicAudio = document.getElementById('musicAuto');
                                    musicAuto.play();
                                    document.onkeydown = function (event) {
                                        if (event.keyCode == 49) { // 按 1
                                            if ($("#exerciseQ").is(":visible")) {
                                                selectFactory(-1, 1,repeatTimes);
                                            }
                                        }
                                        if (event.keyCode == 50) { // 按 2
                                            if ($("#exerciseQ").is(":visible")) {
                                                selectFactory(-1, 2,repeatTimes);
                                            }
                                        }
                                        if (event.keyCode == 51) { // 按 3
                                            if ($("#exerciseQ").is(":visible")) {
                                                selectFactory(-1, 3,repeatTimes);
                                            }
                                        }
                                        if (event.keyCode == 52) { // 按 4
                                            if ($("#exerciseQ").is(":visible")) {
                                                selectFactory(-1, 4,repeatTimes);
                                            }
                                        }
                                    };

                                }else if($scope.exerciseInfo.pattern == 1){
                                    var repeatTimes = true;
                                    $("#answer").find('.answer_empty').html('');
                                    var musicAudio = document.getElementById('musicAuto');
                                    musicAuto.play();
                                    document.onkeydown = function (event) {
                                        if (event.keyCode == 49) { // 按 1
                                            if ($("#exerciseQ").is(":visible")) {
                                                select(-1, 1,repeatTimes);
                                            }
                                        }
                                        if (event.keyCode == 50) { // 按 2
                                            if ($("#exerciseQ").is(":visible")) {
                                                select(-1, 2,repeatTimes);
                                            }
                                        }
                                        if (event.keyCode == 51) { // 按 3
                                            if ($("#exerciseQ").is(":visible")) {
                                                select(-1, 3,repeatTimes);
                                            }
                                        }
                                        if (event.keyCode == 52) { // 按 4
                                            if ($("#exerciseQ").is(":visible")) {
                                                select(-1, 4,repeatTimes);
                                            }
                                        }
                                    };
                                }

                            }

                        };
                    }
                }
        }

        function selectFactory(num, code,T_F) {
            userAnswer.push(code);
            var codeT = '';
            codeT = userAnswer.join('') + "";
            console.log(codeT);
            $.each(userAnswer,function(n,value){
                var selectHtml = '<span class="icon border-3-white icons-' + value + '"></span>';
                $("#answer").find('.answer_empty').eq(n).html('');
                $("#answer").find('.answer_empty').eq(n).html(selectHtml);
            })
            $scope.execiseAnswer.answerBody = codeT;
            var TonsAnswer = $scope.exerciseInfo.questionsPronunciation.tones + "";
                if (TonsAnswer == codeT) {
                    $scope.execiseAnswer.answer = true;
                    $("#answer").find('.icon').addClass('border-3-green');
                    setTimeout(function(){
                        nextExe();
                    },1000);
                } else {
                    $scope.execiseAnswer.answer = false;
                    if (TonsAnswer.length == codeT.length) {
                        var rightA = TonsAnswer.split("");
                        var userA = codeT.split("");
                        for(var i = 0 ; i < rightA.length ; i++){
                            if(rightA[i] == userA[i]){
                                $("#answer").find('.icon').eq(i).addClass('border-3-green');
                            }else{
                                $("#answer").find('.icon').eq(i).addClass('border-3-red');
                            }
                        }
                        $("#imgShow").show();
                        flag = false;
                        document.onkeydown = function (event) {
                            if (event && event.keyCode == 13) { // 按 1
                                $("#imgShow").hide();
                                flag = true;
                                $("#answer").find('.answer_empty').html('');
                                if(!T_F){
                                    nextExe();
                                }else{
                                    var repeatTimes = true;
                                    var musicAudio = document.getElementById('musicAuto');
                                    musicAuto.play();
                                    document.onkeydown = function (event) {
                                        if (event.keyCode == 49) { // 按 1
                                            if ($("#exerciseQ").is(":visible")) {
                                                selectFactory(-1, 1,repeatTimes);
                                            }
                                        }
                                        if (event.keyCode == 50) { // 按 2
                                            if ($("#exerciseQ").is(":visible")) {
                                                selectFactory(-1, 2,repeatTimes);
                                            }
                                        }
                                        if (event.keyCode == 51) { // 按 3
                                            if ($("#exerciseQ").is(":visible")) {
                                                selectFactory(-1, 3,repeatTimes);
                                            }
                                        }
                                        if (event.keyCode == 52) { // 按 4
                                            if ($("#exerciseQ").is(":visible")) {
                                                selectFactory(-1, 4,repeatTimes);
                                            }
                                        }
                                    };
                                }
                            }

                        };
                    }
                }
        }

        //判断是否为空
        function isEmptyObject(obj) {
            for (var n in obj) {
                return false
            }
            return true;
        }

        function nextExe() {
            if (flag) {
                console.log($scope.execiseAnswer);
                RequestService.request({
                    token: 's_exe_sub',
                    method: 'POSt',
                    data: UtilsService.serialize($scope.execiseAnswer),
                    success: function (data) {
                        console.log(data);
                        if (isEmptyObject(data)) {
                            //$scope.exe_submit();
                            userAnswer = [];
                            UtilsService.href('/student/study_finish/' + $routeParams.exerciseID);
                        } else {
                            userAnswer = [];
                            chapterExercise(data);
                        }

                    }
                })
            }
        };

    }
}]);


//错误提示
lbApp.controller('StudyErrorController', ['$scope', 'UtilsService', 'RequestService', function ($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'student',
        tabName: 'tabName'
    };
}]);
//完成做题
lbApp.controller('StudyFinishController', ['$scope', '$routeParams', 'UtilsService', 'RequestService', function ($scope, $routeParams, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'student',
        tabName: 'tabName'
    };
    RequestService.request({
        token: 's_exe_submit',
        method: 'POST',
        params: {chapterExerciseId: $routeParams.exerciseID},
        success: function (data) {
            $scope.exerciseResult = data;
            var r_Code = data.rightCount / (data.rightCount + data.wrongCount);
            console.log(r_Code);
            if(r_Code==1){
                $scope.percentCode = "100.00%";
            }else{
                var b = r_Code.toFixed(4);
                $scope.percentCode = b.slice(2, 4) + "." + b.slice(4, 6) + "%";
            }
            var startTime = data.startTimeStr;
            var endTime = data.endTimeStr;
            var startT_date = new Date(startTime);
            var endT_date = new Date(endTime);
            var m = parseInt(Math.abs(endT_date - startT_date));
            var count = data.rightCount + data.wrongCount;
            $scope.ave_time = parseInt((m - count * 3000) / count);
        }
    })
}]);


// ��ҳ
lbApp.controller('ClassListController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    // ���ñ���
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };

    //�༶�б�����
    $scope.t_classListArr = [];

    // ��ȡ�༶�б���
        RequestService.request({
            token: 't_classList',
            method: 'POST',
            success: function(data) {
                $scope.t_classListArr = data.result;
                //console.log($scope.t_classListArr);
            }
        });

    //��ѯ����
    $scope.conditions = {
        name:'',
        startYear:''
    }

    $scope.select = function(){
        RequestService.request({
            token: 't_classList',
            method: 'POST',
            data:UtilsService.serialize($scope.conditions),
            success: function(data) {
                console.log(data);
                $scope.t_classListArr = data.result;
            }
        });
    };
  }]);
//�༶����
lbApp.controller('ClassDetailController', ['$scope', '$routeParams', 'UtilsService', 'RequestService', function($scope,$routeParams, UtilsService, RequestService) {
    "use strict";
    // ���ñ���
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
    //�༶
    $scope.classes = {
        id:$routeParams.classID,
        name:'',
        courseName:'',
        startTime:''
        //status:'1'
    };
    //�༶��ϸ��Ϣ
    $scope.classDetail ={};
    RequestService.request({
        token:'t_settingClass',
        method:'post',
        data:UtilsService.serialize({id:$routeParams.classID}),
        success: function(data){
            $scope.classDetail = data.result[0];
        }
    });

    function initDatePicker(startTimeArray, endTimeArray) {
        // ѡ��ʼ����
        $('#time-start-update').jdatepicker({
            selectedDate: {
                year: startTimeArray[0],
                month: startTimeArray[1],
                day: startTimeArray[2]
            },
            disableFn: function(date) {
                return date.getTime() < Date.now() - 86400000;
            },
            callback: function(dateString) {
                $scope.$apply(function() {
                    $scope.classes.startTime = dateString;
                    //checkTime();
                });
            }
        });
    }
    var now = new Date(),
        nowArray = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
    initDatePicker(nowArray, nowArray);

    //�༶��Ϣ����
    $scope.updateClass = function(){
        RequestService.request({
            token:'t_classUpdate',
            method:'POST',
            data:UtilsService.serialize($scope.classes),
            success: function(){
                UtilsService.href('/classList');
            }
        })
    }
}]);
//ɾ���༶
lbApp.controller('classDelController', ['$scope','$routeParams', 'UtilsService', 'RequestService', function($scope,$routeParams, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
    //�½���Ϣ
        RequestService.request({
            token:'t_classDel',
            method:'POST',
            data:UtilsService.serialize({id:$routeParams.classID}),
            loading:true,
            success:function(data){
                $scope.t_classListArr = data.result;
                UtilsService.href('/classList');
            }
        });


}]);
//�½��༶
lbApp.controller('CreateClassController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    // ���ñ���
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };

    // ������Ϣ
    $scope.taskInfo = {
        // ��ʼʱ��
        startTime: '',
        // ����ʱ��
        endTime: '',
    };
    $scope.classes ={
        //�༶����
        name:'',
        //�γ�����
        courseName:'',
        //����ʱ��
        startTime:''
        //�༶״̬
        //status:''
    };
    $scope.classAdd = function(){
        RequestService.request({
            token:'t_classAdd',
            method:'POST',
            loading:true,
            data: UtilsService.serialize($scope.classes),
            success: function (data) {
                UtilsService.href('/classList');
            }
        })
    }

    function initDatePicker(startTimeArray, endTimeArray) {
        // ѡ��ʼ����
        $('#time-start').jdatepicker({
            selectedDate: {
                year: startTimeArray[0],
                month: startTimeArray[1],
                //day: startTimeArray[2]
            },
            //disableFn: function(date) {
            //    return date.getTime() < Date.now() - 86400000;
            //},
            callback: function(dateString) {
                $scope.$apply(function() {
                    $scope.classes.startTime = dateString;
                    checkTime();
                });
            }
        });
    }
    var now = new Date(),
        nowArray = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
    initDatePicker(nowArray, nowArray);

    function checkTime() {
        // �Ƿ���д�˿�ʼʱ��
        if (!$scope.taskInfo.startTime) {
            $scope.dateError = '��ѡ��ʼ����';
            $scope.showDateError = true;
            return false;
        }

        $scope.showDateError = false;
        return true;
    }

}]);

//�γ̹���
lbApp.controller('CourseController', ['$scope','$routeParams', 'UtilsService', 'RequestService', function($scope,$routeParams, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
    //�༶�γ�
    $scope.classCourse={};
    //�γ�����
    RequestService.request({
        token:'t_classCourse',
        method:'POST',
        data:UtilsService.serialize({courseId:$routeParams.courseID}),
        loading:true,
        success:function(data){
            console.log(data);
            $scope.classCourse = data;
            console.log($scope.classCourse.id);
            chapterList($scope.classCourse.id);
        }
    })
    //�½��б�
    $scope.classCourseChapter = [];
    function chapterList(param){
        RequestService.request({
            token:'t_courseChapter',
            method:'GET',
            data:UtilsService.serialize({id:param}),
            loading:true,
            success:function(data){
                console.log(data);
                $scope.classCourseChapter = data.result;
            }
        })
    }

    $scope.chapterDel = function(ID){
        RequestService.request({
            token:'t_chapterDel',
            method:'POST',
            data:UtilsService.serialize({chapterId:ID}),
            loading:true,
            success:function(data){
                alert(2);
                //UtilsService.href("/class/courseSetting");
            }
        });
    }

}]);

//�½�����
lbApp.controller('ChapterController', ['$scope','$routeParams', 'UtilsService', 'RequestService', function($scope, $routeParams,UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
    //�½���Ϣ
    $scope.t_chapter = {};

    RequestService.request({
        token:'t_chapterShow',
        method:'POST',
        data:UtilsService.serialize({id:$routeParams.chapterID}),
        success:function(data){
            $scope.t_chapter = data.result[0];
        }
    });



    $scope.chapterUpdate = function(){
        RequestService.request({
            token:'t_chapterUpdate',
            method:'POST',
            data:UtilsService.serialize($scope.t_chapter),
            success:function(data){
                UtilsService.href("/class/courseSetting");
            }
        });
    }



}]);

//�½��½�
lbApp.controller('CreateChapterController', ['$scope','$routeParams', 'UtilsService', 'RequestService', function($scope,$routeParams, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
    //�½�
    $scope.t_chapter = {
        courseId:$routeParams.courseID,
        name:'',
        descriptionContent:'',
        status:'',
        orderNo:'',
        pattern:''
    };


    $scope.addChapter = function(){
        RequestService.request({
            token:'t_addChapter',
            method:'POST',
            data:UtilsService.serialize($scope.t_chapter),
            loading:'true',
            success:function(data){
                UtilsService.href('/class/courseSetting/'+$scope.t_chapter.courseId);
            }
        })
    }

}]);
//ϰ�����
lbApp.controller('ExerciseController', ['$scope','$routeParams', 'UtilsService', 'RequestService', function($scope,$routeParams, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
    // �󶨵����¼�
    UtilsService.initPop($scope);

    $scope.t_exerciseList = [];



    RequestService.request({
        token:'t_chapterShow',
        method:'POST',
        data:UtilsService.serialize({id:$routeParams.chapterID}),
        loading:true,
        success:function(data){
            $scope.t_chapterInfo = data;
        }
    });
    //RequestService.request({
    //    token:'t_exe_List',
    //    method:'POST',
    //    data:UtilsService.serialize({id:$routeParams.chapterID}),
    //    loading:true,
    //    success:function(data){
    //        alert("123");
    //        //$scope.t_exerciseList = data.exerciseList;
    //    }
    //});

    alert($routeParams.chapterID);
}]);
//���ϰ��
lbApp.controller('SxerciseAddController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
    // �󶨵����¼�
    UtilsService.initPop($scope);
    $scope.t_sel_exeList = [];
    //RequestService.request({
    //    token:'t_exercise',
    //    method:'POST',
    //    loading:true,
    //    success:function(data){
    //        $scope.t_sel_exeList = data.exerciseList;
    //    }
    //})

}]);

//���ϰ��
lbApp.controller('SxerciseAdd2Controller', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
    // �󶨵����¼�
    UtilsService.initPop($scope);
    $scope.t_sel_exeList = [];
    //RequestService.request({
    //    token:'t_exercise',
    //    method:'POST',
    //    loading:true,
    //    success:function(data){
    //        $scope.t_sel_exeList = data.exerciseList;
    //    }
    //})

}]);
//ѧ������
lbApp.controller('StudentController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
    // �󶨵����¼�
    UtilsService.initPop($scope);
}]);
//ѧ������
lbApp.controller('StudentDetailController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);

//�ҵĿγ�
lbApp.controller('StudentClassController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
    // �󶨵����¼�
    UtilsService.initPop($scope);
}]);
//�ҵĿγ�����
lbApp.controller('StudentClassDetailController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);

//��ʼѧϰ
lbApp.controller('StudyController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);

//��ʼѧϰ��һ��
lbApp.controller('Study1Controller', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);

//����У׼
lbApp.controller('StudyVolumeController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);

//����У׼
lbApp.controller('StudyKeyController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);

//��׼��
lbApp.controller('StudyPrepareController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);

//������ʾ��
lbApp.controller('StudyPromptController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);

//����ѡ��
lbApp.controller('StudyKeyingController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);

//������ʾ
lbApp.controller('StudyErrorController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);
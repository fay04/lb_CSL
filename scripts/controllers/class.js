// ��ҳ
lbApp.controller('ClassListController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    // ���ñ���
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };

    // ��ȡ�༶�б���
    $scope.classList = function(){
        RequestService.request({
            token: 'lb_subjectTemplate',
            method: 'GET',
            success: function(data) {

            }
        });
    }
  }]);
//�༶����
// ��ҳ
lbApp.controller('ClassDetailController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    // ���ñ���
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };

    // ��ȡ�༶�б���
    $scope.classList = function(){
        RequestService.request({
            token: 'lb_subjectTemplate',
            method: 'GET',
            success: function(data) {

            }
        });
    }

    $scope.class = {
        name:'1'
    }
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


    function initDatePicker(startTimeArray, endTimeArray) {
        // ѡ��ʼ����
        $('#time-start').jdatepicker({
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
                    $scope.taskInfo.startTime = dateString;
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
        // �Ƿ���д�˽���ʱ��
        if (!$scope.taskInfo.endTime) {
            $scope.dateError = '��ѡ���������';
            $scope.showDateError = true;
            return false;
        }
        // ��ʼ�����Ƿ���ڽ�������
        var startTimeStamp = (new Date($scope.taskInfo.startTime)).getTime();
        var endTimeStamp = (new Date($scope.taskInfo.endTime)).getTime();
        if (startTimeStamp > endTimeStamp) {
            $scope.dateError = '��ʼ���ڲ������ڽ�������';
            $scope.showDateError = true;
            return false;
        }
        $scope.showDateError = false;
        return true;
    }

}]);

//�γ̹���
lbApp.controller('CourseController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);

//�½�����
lbApp.controller('SessionController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);
//ϰ�����
lbApp.controller('SxerciseController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);
//���ϰ��
lbApp.controller('SxerciseAddController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
}]);
//ѧ������
lbApp.controller('StudentController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
    //
    "use strict";
    $scope.asideTab = {
        listName: 'navigation',
        tabName: 'tabName'
    };
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
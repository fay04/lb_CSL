var lbApp = angular.module('lbApp', ['ngRoute']);
// ��������ʱ
lbApp.run(['$rootScope', 'UtilsService', 'RequestService', function($rootScope, UtilsService, RequestService) {
    // �Ƿ���ʾloadingҳ��
    $rootScope.loading = false;
    // �Ƿ���ʾͷ��
    $rootScope.showHeader = false;
    $rootScope.showHeaderStudent = false;

    $rootScope.utils = UtilsService;

    $rootScope.logout = function() {
        RequestService.request({
            token: 'tk_logout',
            method: 'POST',
            success: function(data) {
                UtilsService.href('/login');
            }
        });
    };

    $rootScope.$on('$routeChangeStart', function(e, next, current) {
        if (next.$$route.showHeader === false) {
            $rootScope.showHeader = false;
        } else {
            $rootScope.showHeader = true;
        }
    });
}]);

// ����·��
lbApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        // welcome
        .when('/welcome', {
            templateUrl: 'views/index/welcome.html',
            controller: 'WelcomeController',
            showHeader: false
        })
        // �½��б�
        .when('/', {
            templateUrl: 'views/index/welcome.html',
            controller: 'WelcomeController',
            showHeader: false
        })
        //��¼
        .when('/login', {
            templateUrl: 'views/user/login.html',
            controller: 'LoginController',
            showHeader: false
        })
        //ע��
        .when('/register',{
            templateUrl:'views/user/teacher_reg.html',
            controller:'RegController',
            showHeader:false
        })
        //�༶����
        .when('/classList/:classID',{
            templateUrl:'views/class/class_list.html',
            controller:'ClassListController',
            showHeader:true
        })
        //�༶�б�
        .when('/classList',{
            templateUrl:'views/class/class_list.html',
            controller:'ClassListController',
            showHeader:true
        })
        //�༶����
        .when('/classDetail/:classID',{
            templateUrl:'views/class/class_detail.html',
            controller:'ClassDetailController',
            showHeader:true
        })
        //ɾ��
        .when('/class/delClass/:classID',{
            templateUrl:'views/class/class_del.html',
            controller:'classDelController',
            showHeader:true
        })
        //�½��༶
        .when('/createClass',{
            templateUrl:'views/class/create_class.html',
            controller:'CreateClassController',
            showHeader:true
        })
        //�γ�����
        .when('/class/courseSetting',{
            templateUrl:'views/class/course.html',
            controller:'CourseController',
            showHeader:true
        })

        //�½�����
        .when('/class/session',{
            templateUrl:'views/class/session.html',
            controller:'SessionController',
            showHeader:true
        })
        //�½��½�
        .when('/class/create_session',{
            templateUrl:'views/class/create_session.html',
            controller:'CreateSessionController',
            showHeader:true
        })
        //ϰ�����
        .when('/class/exercise',{
            templateUrl:'views/class/exercise.html',
            controller:'SxerciseController',
            showHeader:true
        })
        //���ϰ��
        .when('/class/exercise_add',{
            templateUrl:'views/class/exercise_add.html',
            controller:'SxerciseAddController',
            showHeader:true
        })
        //���ϰ�����
        .when('/class/exercise_add2',{
            templateUrl:'views/class/exercise_add2.html',
            controller:'SxerciseAdd2Controller',
            showHeader:true
        })

        //ѧ������
        .when('/class/student',{
            templateUrl:'views/class/student.html',
            controller:'StudentController',
            showHeader:true
        })
        //ѧ������
        .when('/class/studentDetail',{
            templateUrl:'views/class/student_detail.html',
            controller:'StudentDetailController',
            showHeader:true
        })
        //ѧ��ϵͳ

        //�ҵĿγ�
        .when('/student/class',{
            templateUrl:'views/student/class.html',
            controller:'StudentClassController',
            showHeaderStudent:true
        })
        //�γ�����
        .when('/student/class_detail',{
            templateUrl:'views/student/class_detail.html',
            controller:'StudentClassDetailController',
            showHeaderStudent:true
        })

        //��ʼѧϰ
        .when('/student/study',{
            templateUrl:'views/student/study.html',
            controller:'StudyController',
            showHeader:false
        })

        //��ʼѧϰ��һ��
        .when('/student/study1',{
            templateUrl:'views/student/study1.html',
            controller:'Study1Controller',
            showHeader:false
        })

        //����У׼
        .when('/student/study_volume',{
            templateUrl:'views/student/study_volume.html',
            controller:'StudyVolumeController',
            showHeader:false
        })
        //����У׼
        .when('/student/study_key',{
            templateUrl:'views/student/study_key.html',
            controller:'StudyKeyController',
            showHeader:false
        })
        //��׼��
        .when('/student/study_prepare',{
            templateUrl:'views/student/study_prepare.html',
            controller:'StudyPrepareController',
            showHeader:false
        })
        //������ʾ��
        .when('/student/study_prompt',{
            templateUrl:'views/student/study_prompt.html',
            controller:'StudyPromptController',
            showHeader:false
        })

        //����ѡ��
        .when('/student/study_keying',{
            templateUrl:'views/student/study_keying.html',
            controller:'StudyKeyingController',
            showHeader:false
        })

        //������ʾ
        .when('/student/study_error',{
            templateUrl:'views/student/study_error.html',
            controller:'StudyErrorController',
            showHeader:false
        })
        //���
        .when('/student/study_finish',{
            templateUrl:'views/student/study_finish.html',
            controller:'StudyFinishController',
            showHeader:false
        })
        //δ���
        .when('/student/study_unfinished',{
            templateUrl:'views/student/study_unfinished.html',
            controller:'StudyUnfinishedController',
            showHeader:false
        })
        //�Ƿ����
        .when('/student/study_continue',{
            templateUrl:'views/student/study_continue.html',
            controller:'StudyContinueController',
            showHeader:false
        })

        .otherwise({
            redirectTo: '/'
        });
    $httpProvider.interceptors.push('InterceptorService');
}]);

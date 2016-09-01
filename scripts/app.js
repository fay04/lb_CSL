var lbApp = angular.module('lbApp', ['ngRoute']);
// ��������ʱ
lbApp.run(['$rootScope', 'UtilsService', 'RequestService', function($rootScope, UtilsService, RequestService) {
    // �Ƿ���ʾloadingҳ��
    $rootScope.loading = false;
    // �Ƿ���ʾͷ��
    $rootScope.showHeader = false;
    $rootScope.showHeaderStudent = false;

    $rootScope.utils = UtilsService;

    $rootScope.s_logout = function() {
        RequestService.request({
            token: 's_logout',
            method: 'POST',
            success: function(data) {
                UtilsService.href('/');
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
        //��ʦ��¼
        .when('/t_login', {
            templateUrl: 'views/user/login.html',
            controller: 'LoginController',
            showHeader: false
        })
        //��ʦע��
        .when('/t_register',{
            templateUrl:'views/user/teacherReg.html',
            controller:'t_RegController',
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
        .when('/class/courseSetting/:courseID',{
            templateUrl:'views/class/course.html',
            controller:'CourseController',
            showHeader:true
        })
        .when('/class/courseSetting',{
            templateUrl:'views/class/course.html',
            controller:'CourseController',
            showHeader:true
        })
        //�½�����
        .when('/class/chapter/:chapterID/:classID',{
            templateUrl:'views/class/chapter.html',
            controller:'ChapterController',
            showHeader:true
        })
        //�½��½�
        .when('/class/create_chapter/:courseID',{
            templateUrl:'views/class/create_chapter.html',
            controller:'CreateChapterController',
            showHeader:true
        })
        //ϰ�����
        .when('/class/exercise/:chapterID',{
            templateUrl:'views/class/exercise.html',
            controller:'ExerciseController',
            showHeader:true
        })
        //���ϰ��
        .when('/class/exercise_add/:chapterID',{
            templateUrl:'views/class/exercise_add.html',
            controller:'ExerciseAddController',
            showHeader:true
        })
        //���ϰ�����
        .when('/class/exercise_add2',{
            templateUrl:'views/class/exercise_add2.html',
            controller:'ExerciseAdd2Controller',
            showHeader:true
        })
        //ѧ������
        .when('/class/student/:classID',{
            templateUrl:'views/class/student.html',
            controller:'StudentController',
            showHeader:true
        })
        //ѧ������
        .when('/class/studentDetail/:studentID',{
            templateUrl:'views/class/student_detail.html',
            controller:'StudentDetailController',
            showHeader:true
        })
        //ѧ������
        .when('/class/student/:classID/:studentID',{
            templateUrl:'views/class/student.html',
            controller:'StudentDetailController',
            showHeader:true
        })
        //ѧ��ϵͳ

        //ѧ����¼
        .when('/s_login', {
            templateUrl: 'views/user/login_student.html',
            controller: 's_LoginController',
            showHeader: false
        })
        //ѧ��ע��
        .when('/s_register',{
            templateUrl:'views/user/register.html',
            controller:'S_RegController',
            showHeader:false
        })
        //ѧ����������
        .when('/s_profile',{
            templateUrl:'views/student/student_profile.html',
            controller:'StudentProfileController',
            showHeaderStudent:true
        })
        //�޸�����
        .when('/s_changePwd',{
            templateUrl:'views/student/student_editPwd.html',
            controller:'StudentEditPwdController',
            showHeaderStudent:true
        })
        //�ҵĿγ�
        .when('/student/course',{
            templateUrl:'views/student/course.html',
            controller:'StudentCourseController',
            showHeaderStudent:true
        })
        //�γ�����
        .when('/student/course_detail/:courseID',{
            templateUrl:'views/student/course_detail.html',
            controller:'StudentCourseDetailController',
            showHeader:true
        })
        /*//�γ�����
        .when('/student/course_detail',{
            templateUrl:'views/student/course_detail.html',
            controller:'StudentCourseDetailController',
            showHeaderStudent:true
        })*/
        //�˳��γ�
        /*.when('/class/delCourse/:classID',{
            templateUrl:'views/student/course_del.html',
            controller:'delCourseController',
            showHeader:true
        })*/
        //��ʼѧϰ
        .when('/student/study/:chapterID',{
            templateUrl:'views/student/study.html',
            controller:'StudyController',
            showHeader:false
        })

        //��ʼѧϰ��һ��
        .when('/student/studyHelp',{
            templateUrl:'views/student/studyHelp.html',
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
        .when('/student/study_keying/:exerciseID',{
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
        .when('/student/study_finish/:exerciseID',{
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
        //�쳣
        .when('/exception',{
            templateUrl:'views/index/exception.html',
            controller:'exceptionController',
            showHeader:false
        })

        .otherwise({
            redirectTo: '/'
        });
    $httpProvider.interceptors.push('InterceptorService');
}]);

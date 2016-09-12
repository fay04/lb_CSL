var lbApp = angular.module('lbApp', ['ngRoute']);
// ��������ʱ
lbApp.run(['$rootScope', 'UtilsService', 'RequestService', function($rootScope, UtilsService, RequestService) {
    // �Ƿ���ʾloadingҳ��
    $rootScope.loading = false;
    // �Ƿ���ʾͷ��
    $rootScope.showHeader = false;
    //$rootScope.showHeaderStudent = false;
    //$rootScope.showHeaderTeacher = false;
    $rootScope.utils = UtilsService;
    //$rootScope.currentUserData = {};
    $rootScope.t_logout = function() {
        RequestService.request({
            token: 't_logout',
            method: 'POST',
            success: function(data) {
                UtilsService.href('/');
            }
        });
    };
    $rootScope.$on('$routeChangeStart', function(e, next, current) {
        if (next.$$route.showHeader === false) {
            $rootScope.showHeader = false;
            //$rootScope.showHeaderStudent = false;
            $rootScope.showHeaderTeacher = false;
        } else {
            $rootScope.showHeader = true;
            //$rootScope.showHeaderStudent = true;
            $rootScope.showHeaderTeacher = true;
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
        .when('/', {
            templateUrl: 'views/index/welcome.html',
            controller: 'WelcomeController',
            showHeader: false
        })
        //��ʦע��
        .when('/teacher/register',{
            templateUrl:'views/teacher/register.html',
            controller:'TeacherRegController',
            showHeader:false
        })
        //��ʦ��¼
        .when('/teacher/login', {
            templateUrl: 'views/teacher/login.html',
            controller: 'TeacherLoginController',
            showHeader: false
        })
        //��ʦ�޸�����
        .when('/teacher/edit_password', {
            templateUrl: 'views/teacher/edit_password.html',
            controller: 'TeacherEditPwdController',
            showHeader: true
        })
        //�½��༶
        .when('/teacher/createClass',{
            templateUrl:'views/teacher/create_class.html',
            controller:'CreateClassController',
            showHeader:true
        })
        //�༶����
        .when('/teacher/classList/:classID',{
            templateUrl:'views/teacher/class_list.html',
            controller:'ClassListController',
            showHeader:true
        })
        //�༶����
        .when('/teacher/classList',{
            templateUrl:'views/teacher/class_list.html',
            controller:'ClassListController',
            showHeader:true
        })
        //�༶����
        .when('/teacher/classSetting/:classID/:courseID',{
            templateUrl:'views/teacher/class_setting.html',
            controller:'ClassSettingsController',
            showHeader:true
        })
        //ɾ��
        .when('/teacher/delClass/:classID',{
            templateUrl:'views/class/class_del.html',
            controller:'classDelController',
            showHeader:true
        })
        //�γ�����
        .when('/teacher/course/:courseID',{
            templateUrl:'views/teacher/course.html',
            controller:'CourseController',
            showHeader:true
        })
        //�½�����
        .when('/teacher/chapter/:chapterID/:classID',{
            templateUrl:'views/teacher/chapter.html',
            controller:'ChapterController',
            showHeader:true
        })
        //�½��½�
        .when('/teacher/create_chapter/:courseID',{
            templateUrl:'views/teacher/create_chapter.html',
            controller:'CreateChapterController',
            showHeader:true
        })
        //ϰ�����
        .when('/teacher/exercise/:chapterID',{
            templateUrl:'views/teacher/exercise.html',
            controller:'ExerciseController',
            showHeader:true
        })
        //���ϰ��
        .when('/teacher/add_exercise/:chapterID',{
            templateUrl:'views/teacher/add_exercise.html',
            controller:'AddExerciseController',
            showHeader:true
        })
        //ѧ������
        .when('/teacher/student/:classesID',{
            templateUrl:'views/teacher/student.html',
            controller:'StudentController',
            showHeader:true
        })
        //ѧ��ϵͳ

        //ѧ����¼
        .when('/student/login', {
            templateUrl: 'views/student/login.html',
            controller: 'StudentLoginController',
            showHeader: false
        })
        //ѧ��ע��
        .when('/student/register',{
            templateUrl:'views/student/register.html',
            controller:'StudentRegController',
            showHeader:false
        })
        //ѧ����������
        .when('/student/profile',{
            templateUrl:'views/student/profile.html',
            controller:'StudentProfileController',
            showHeader:true
        })
        //�޸�����
        .when('/student/edit_password',{
            templateUrl:'views/student/edit_password.html',
            controller:'StudentEditPwdController',
            showHeader:true
        })
        //�ҵĿγ�
        .when('/student/course',{
            templateUrl:'views/student/course.html',
            controller:'StudentCourseController',
            showHeader:true
        })
        //�γ�����
        .when('/student/course_detail/:courseID',{
            templateUrl:'views/student/course_detail.html',
            controller:'StudentCourseDetailController',
            showHeader:true
        })
        //��ʼѧϰ
        .when('/student/study/:chapterID/:courseID',{
            templateUrl:'views/student/study_prepare.html',
            controller:'StudyPrepareController',
            showHeader:false
        })
        //����ѡ��
        .when('/student/study_keying/:exerciseID/:courseID',{
            templateUrl:'views/student/study_keying.html',
            controller:'StudyKeyingController',
            showHeader:false
        })
        //���
        .when('/student/study_finish/:exerciseID/:courseID',{
            templateUrl:'views/student/study_finish.html',
            controller:'StudyFinishController',
            showHeader:false
        })
        .otherwise({
            redirectTo: '/'
        });
    $httpProvider.interceptors.push('InterceptorService');
}]);

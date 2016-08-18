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
        //// welcome
        //.when('/welcome', {
        //    templateUrl: 'views/index/welcome.html',
        //    controller: 'WelcomeController',
        //    showHeader: false
        //})
        //// ѧ���˵�¼
        //.when('/student/login', {
        //    templateUrl: 'views/student/login.html',
        //    controller: 'StudentLoginController',
        //    /*showHeader: false*/
        //})
        // �½��б�
        .when('/', {
            templateUrl: 'views/class/class_list.html',
            controller: 'ClassListController',
            showHeader: true
        })
        //�༶����
        .when('/classList',{
            templateUrl:'views/class/class_list.html',
            controller:'ClassListController',
            showHeader:true
        })
        //�༶����
        .when('/classDetail',{
            templateUrl:'views/class/class_detail.html',
            controller:'ClassDetailController',
            showHeader:true
        })
        //�½��༶
        .when('/createClass',{
            templateUrl:'views/class/create_class.html',
            controller:'CreateClassController',
            showHeader:true
        })
        //�γ�����
        .when('/class/course',{
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
        //ע��
        .when('/register',{
            templateUrl:'views/user/teacher/teacher_reg.html',
            controller:'RegController',
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
        .when('/student/course',{
            templateUrl:'views/student/login.html',
            controller:'StudentDetailController',
            showHeaderStudent:true
        })
        //�γ�����
        .when('/student/course_detauk',{
            templateUrl:'views/student/login.html',
            controller:'StudentDetailController',
            showHeaderStudent:true
        })

        //// �༶����
        //.when('/class_list', {
        //    templateUrl: 'views/class/class_list.html',
        //    controller: 'ClassController',
        //    showHeader: true
        //})
        // �༶����
        //.when('/class_detail', {
        //    templateUrl: 'views/class/class_list.html',
        //    controller: 'ClassController',
        //    showHeader: true
        //})
        // ��ҳ
        //.when('/', {
        //    templateUrl: 'views/index/index.html',
        //    controller: 'IndexController',
        //    showHeader: false
        //})
        // ��¼
        //.when('/login', {
        //    templateUrl: 'views/user/login.html',
        //    controller: 'LoginController',
        //    showHeader: false
        //})
        //// ע��
        //.when('/reg', {
        //    templateUrl: 'views/user/reg.html',
        //    controller: 'RegController',
        //    showHeader: false
        //})
        //// ��֤����
        //.when('/verifyEmail', {
        //    templateUrl: 'views/user/verify_email.html',
        //    controller: 'VerifyEmailController',
        //    showHeader: false
        //})
        //// ��������
        //.when('/profile', {
        //    templateUrl: 'views/user/profile.html',
        //    controller: 'ProfileController'
        //})
        //// ��ɫ����
        //.when('/roleManage', {
        //    templateUrl: 'views/manage/role_manage.html',
        //    controller: 'RoleMangeController'
        //})
        //// �����˹���
        //.when('/robot', {
        //    templateUrl: 'views/task/robot.html',
        //    controller: 'RobotController'
        //})
        //// ����������
        //.when('/createRobot', {
        //    templateUrl: 'views/task/create_robot.html',
        //    controller: 'CreateRobotController'
        //})
        //// �����ض����͵Ļ�����
        //.when('/createRobot/:robotModel', {
        //    templateUrl: 'views/task/create_robot.html',
        //    controller: 'CreateRobotController'
        //})
        //// ���ƻ�����
        //.when('/customRobot', {
        //    templateUrl: 'views/task/custom_robot.html',
        //    controller: 'CustomRobotController'
        //})
        //// ����������
        //.when('/robot/:robotId', {
        //    templateUrl: 'views/task/robot_detail.html',
        //    controller: 'RobotDetailController'
        //})
        //// ��������
        //.when('/createTask', {
        //    templateUrl: 'views/task/create_or_edit_task.html',
        //    controller: 'CreateOrEditTaskController'
        //})
        //// ���ݻ�����id����������
        //.when('/createTask/:robotId', {
        //    templateUrl: 'views/task/create_or_edit_task.html',
        //    controller: 'CreateOrEditTaskController'
        //})
        //// �༭����
        //.when('/editTask/:taskId', {
        //    templateUrl: 'views/task/create_or_edit_task.html',
        //    controller: 'CreateOrEditTaskController'
        //})
        //// �����б�
        //.when('/taskList', {
        //    templateUrl: 'views/task/task_list.html',
        //    controller: 'TaskListController'
        //})
        //// ��������
        //.when('/task/:taskId', {
        //    templateUrl: 'views/task/task_detail.html',
        //    controller: 'TaskDetailController'
        //})
        //// ��������
        //.when('/schedule', {
        //    templateUrl: 'views/task/schedule.html',
        //    controller: 'ScheduleController'
        //})
        //// ʵʱ���
        //.when('/monitoring', {
        //    templateUrl: 'views/monitoring/index.html',
        //    controller: 'MonitoringController'
        //})
        //// ���ݷ���
        //.when('/statistics', {
        //    templateUrl: 'views/statistics/index.html',
        //    controller: 'StatisticsController'
        //})
        //// �Ǳ���
        //.when('/dashboard', {
        //    templateUrl: 'views/index/dashboard.html',
        //    controller: 'DashboardController'
        //})
        //// ���ƽ̨
        //.when('/monitoring', {
        //    templateUrl: 'views/monitoring/monitor.html',
        //    controller: 'MonitoringController'
        //})
        .otherwise({
            redirectTo: '/'
        });
    $httpProvider.interceptors.push('InterceptorService');
}]);

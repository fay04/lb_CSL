//// ��¼
//lbApp.controller('LoginController', ['$scope', 'UtilsService', 'RequestService', function($scope, UtilsService, RequestService) {
//    "use strict";
//    // �����¼��Ϣ
//    $scope.pwdLoginInfo = {
//        userName: '',
//        password: ''
//    };
//    // ��̬�����¼
//    $scope.verifyCodeInfo = {
//        phone: '',
//        code: ''
//    };
//
//    UtilsService.genTabs($scope, 'tabLogin');
//
//    $scope.getCodeText = '��ȡ������֤��';
//    $scope.isCalling = false;
//
//    /**
//     * ��ȡ��̬��֤��
//     */
//    $scope.getCode = function() {
//        if ($scope.isCalling) {
//            return;
//        }
//        $scope.isCalling = true;
//        RequestService.request({
//            token: 'tk_getCodeByLogin',
//            method: 'GET',
//            strParams: 'phone=' + $scope.verifyCodeInfo.phone,
//            success: function(data) {
//                UtilsService.delayTimer(60, function(sec) {
//                    $scope.$apply(function() {
//                        if (sec == 0) {
//                            $scope.getCodeText = '��ȡ������֤��';
//                            $scope.isCalling = false;
//                        } else {
//                            $scope.getCodeText = sec + 's';
//                        }
//                    });
//                });
//                alert('���ڸ�������绰����ע�����');
//            },
//            error: function() {
//                $scope.isCalling = false;
//            }
//        });
//    };
//    /**
//     * �����¼
//     */
//    $scope.loginByPwd = function() {
//        RequestService.request({
//            token: 'tk_login',
//            method: 'POST',
//            data: UtilsService.serialize($scope.pwdLoginInfo),
//            success: function(data) {
//                UtilsService.href('/profile');
//            }
//        });
//    };
//
//    /**
//     * ��̬�����¼
//     */
//    $scope.loginByCode = function() {
//        RequestService.request({
//            token: 'tk_loginByVV',
//            method: 'POST',
//            data: UtilsService.serialize($scope.verifyCodeInfo),
//            success: function(data) {
//                UtilsService.href('/profile');
//            }
//        })
//    };
//}]);
//
//// ע��
//lbApp.controller('RegController', ['$scope', '$rootScope', 'RequestService', 'UtilsService', function($scope, $rootScope, RequestService, UtilsService) {
//    "use strict";
//
//    // ע����Ϣ
//    $scope.t_regInfo = {
//        registEmail: '', // ����
//        password: '' // ����
//    };
//
//    /**
//     * ע��
//     */
//    $scope.reg = function() {
//        RequestService.request({
//            token: 't_reg',
//            method: 'POST',
//            data: UtilsService.serialize($scope.t_regInfo),
//            success: function(data) {
//                //$scope.step = 3;
//                console.log(data);
//            }
//        });
//    };
//}]);

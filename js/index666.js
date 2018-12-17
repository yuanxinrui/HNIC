var arrUrl = [
    {"id":"I8a3faf4701665cc55cc5aff90166b2ef353d7808","name":"综合概况","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf4701665cc55cc5aff90166be7bf7fd0416","name":"关键KPI","hasChild":false,"childIdList":[]},
            {"id":"I8a3faf470166e858e858c3930166e86cbc110118","name":"板块财务","hasChild":false,"childIdList":[]},
            {"id":"I8a3faf4701665cc55cc5aff90166be7d66c004bd","name":"投资情况","hasChild":false,"childIdList":[]},
            {"id":"I8a3faf4701665cc55cc5aff90166b9f83bce5015","name":"融资情况","hasChild":false,"childIdList":[]},
            {"id":"I8a3faf4701665cc55cc5aff90166b2f3dea87872","name":"上市股票","hasChild":false,"childIdList":[]},
            {"id":"I8a3faf470166f28ef28e0c410166f296ff1e00ac","name":"人力资源","hasChild":false,"childIdList":[]}
        ]
    },
    {"id":"I8a3faf4701665cc55cc5aff90166b2ef353d7806","name":"基础产业","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf4701665cc55cc5aff90166bde443a072c7","name":"电力板块","hasChild":false,"childIdList":[]}
            // {"id":"I8a3faf4701665cc55cc5aff90166bd943e756ffd","name":"板块概况","hasChild":false,"childIdList":[]}
        ]
    },
    {"id":"I8a3faf4701665cc55cc5aff90166b3327d9278c6","name":"基础设施","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf4701673a7b3a7b316c0167590efe964171","name":"板块概况","hasChild":false,"childIdList":[]}
        ]
    },
    {"id":"I8a3faf4701665cc55cc5aff90166b332aea978c8","name":"金融板块","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf4701673a7b3a7b316c01674f3c708c14e5","name":"板块概况","hasChild":false,"childIdList":[]}
        ]
    },
    {"id":"I8a3faf4701665cc55cc5aff90166b333a05f78d1","name":"水泥板块","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf4701673a7b3a7b316c0167590e03cd4158","name":"板块概况","hasChild":false,"childIdList":[]}
        ]
    },
    {"id":"I8a3faf4701665cc55cc5aff90166b333a05f78d2","name":"浆纸板块","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf4701673a7b3a7b316c0167590da9b34141","name":"板块概况","hasChild":false,"childIdList":[]}
        ]
    }
];

var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope,$sce) {
    //轮播图参数配置
    var upsSwiper = new Swiper('.swiper-container', {
        longSwipes: true,
        loop: false,
        // autoplay: {
        //     delay: 10000//10秒切换一次
        // },
        simulateTouch : true,//鼠标模拟
        allowTouchMove: true,
        followFinger : true,
        observer:true,
        hashNavigation: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChangeTransitionEnd: function(){
                alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                $scope.activeIndex = this.activeIndex;
            }
        }
    });
    $scope.isActive = 0;
    $scope.arr = arrUrl;
    $scope.arrChild = [];
    $scope.arrUrlFirstId=[];
    $scope.urlTest =[];
    arrUrl.forEach(function(item){
        $scope.arrChild.push({childIdList:item.childIdList});
        $scope.arrUrlFirstId.push({firstId:item.childIdList[0]});
    });
    console.log($scope.arrUrlFirstId);

    $scope.arrUrlFirstId.forEach(function(obj){
        console.log(obj,obj.firstId.id);
        var testId = 'http://10.191.47.199:28081/spreadsheet/vision/openresource.jsp?resid=' + obj.firstId.id + '&username=demo&password=demo&showtoolbar=false';
        var reportUrl = $sce.trustAs($sce.RESOURCE_URL,testId);
        $scope.urlTest.push({url:reportUrl});
    });
    console.log($scope.urlTest);
    $scope.reportTitleClick = function(index){

    };
    $scope.reportTitleClick(0);
    //点击子导航跳转到对应报表页面
    $scope.reportClick = function(index,outerIndex){
        //console.log(index,outerIndex);
        $scope.isActive = outerIndex;
        $("#swiper1").hide();
        $("#swiper2").show();
        document.getElementById("iframe-projects").height = document.documentElement.clientHeight - 54;
        var urlId = $scope.arr[outerIndex].childIdList[index].id;
        var urlTest = 'http://10.191.47.199:28081/spreadsheet/vision/openresource.jsp?resid=' + urlId + '&username=demo&password=demo&showtoolbar=false';
        $scope.reportUrl = $sce.trustAs($sce.RESOURCE_URL,urlTest);
        $("#nav_test").hide();
        $("dd").hide();
    };
    $("#nav_test").hide();
    $("dd").hide();
    $("#user_off").hide();
    $("#user_on").show();
    $("#user_button").hide();
    $("#swiper1").show();
    $("#swiper2").hide();
    //鼠标移入移出事件控制子导航出现与隐藏
    $("#nav").mouseover(function (){
        $("#nav_test").show();
        $("dd").show();
    }).mouseout(function (){
        $("#nav_test").hide();
        $("dd").hide();
    });
//点击首页显示轮播图
    $("#first").click(function(){
        $("#swiper1").show();
        $("#swiper2").hide();
    });
//用户图表点击切换
    $("#user_on").click(function(){
        $("#user_off").show();
        $("#user_on").hide();
        $("#user_button").show();
        $("#nav_test").hide();
        $("dd").hide();
    });
    $("#user_off").click(function(){
        $("#user_off").hide();
        $("#user_on").show();
        $("#user_button").hide();
    });
//联机帮助跳转V8帮助页面
    $("#help").click(function(){
        window.open("http://wiki.smartbi.com.cn/pages/viewpage.action?pageId=36372512");
    });   //使iframe根据窗口大小调整自身大小实现自适应
    function changeFrameHeight(){
        // $('iframe').each(function (index) {
        //     document.getElementById(index).height = document.documentElement.clientHeight - 54;
        // });
        document.getElementById("iframe-projects").height = document.documentElement.clientHeight - 54;
    }
    window.onresize=function(){
        changeFrameHeight();
    };
    window.onresize();
});



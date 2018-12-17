var arrUrl = [
    {"id":"I8a3faf47016771c471c462c801679add9ef00fd1","name":"综合概况","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf47016771c471c462c80167a5912f562d49","name":"关键KPI","hasChild":false,"childIdList":[]},
           {"id":"I8a3faf47016771c471c462c801679bff7d8a3040","name":"板块财务","hasChild":false,"childIdList":[]},
            {"id":"I8a3faf47016771c471c462c80167a6cc63a74d6d","name":"投资情况","hasChild":false,"childIdList":[]},
            {"id":"I8a3faf47016771c471c462c801679c04710e30a7","name":"融资情况","hasChild":false,"childIdList":[]},
            {"id":"I8a3faf47016771c471c462c801679c0495ec30b5","name":"上市股票","hasChild":false,"childIdList":[]},
            {"id":"I8a3faf47016771c471c462c80167aa8a9a416922","name":"人力资源","hasChild":false,"childIdList":[]}
        ]
    },
    {"id":"I8a3faf47016771c471c462c801679addc8a00fd4","name":"基础产业","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf47016771c471c462c801679ae18fd9117a","name":"电力板块","hasChild":false,"childIdList":[]},
            {"id":"I8a3faf47016771c471c462c80167aa7b406261d0","name":"板块概况","hasChild":false,"childIdList":[]},
            {"id":"I8a3faf47016771c471c462c801679ae1dd7c11a3","name":"企业生产","hasChild":false,"childIdList":[]}
        ]
    },
    {"id":"I8a3faf4701665cc55cc5aff90166b3327d9278c6","name":"基础设施","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf47016771c471c462c801679ae20ecd11b5","name":"板块概况","hasChild":false,"childIdList":[]}
        ]
    },
    {"id":"I8a3faf4701665cc55cc5aff90166b332aea978c8","name":"金融板块","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf47016771c471c462c801679ae27b2411cd","name":"板块概况","hasChild":false,"childIdList":[]}
        ]
    },
    {"id":"I8a3faf4701665cc55cc5aff90166b333a05f78d1","name":"水泥板块","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf47016771c471c462c801679ae47c14121a","name":"板块概况","hasChild":false,"childIdList":[]}
        ]
    },
    {"id":"I8a3faf4701665cc55cc5aff90166b333a05f78d2","name":"浆纸板块","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf47016771c471c462c801679ae49e131231","name":"板块概况","hasChild":false,"childIdList":[]}
        ]
    },
	 {"id":"I8a3faf47016771c471c462c801679afb830a12b3","name":"合并管报","hasChild":true,
        "childIdList":[
            {"id":"I8a3faf47016771c471c462c801679afbd79212b5","name":"国资快报","hasChild":false,"childIdList":[]},
			{"id":"I8a3faf47016771c471c462c801679afbf10612b9","name":"财政快报","hasChild":false,"childIdList":[]}
        ]
    }
];

var app = angular.module('myApp', []);

app.controller('myCtrl', function($sce,$scope) {

    //轮播图参数配置
    var upsSwiper = new Swiper('.swiper-container', {
        longSwipes: true,
        loop: false,

        simulateTouch : true,//鼠标模拟
        allowTouchMove: true,
        followFinger : true,
        observer:true,
        observerParents:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChangeTransitionEnd: function(){
               // alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
            }
        }
    });

    $scope.isActive = 0;
    $scope.arr = arrUrl;
    $scope.arrChild = [];
    $scope.arrTest=[];
    $scope.urlTest =[];
    arrUrl.forEach(function(item){
        $scope.arrChild.push({childIdList:item.childIdList});
    });
    console.log($scope.arrChild);
    $scope.loadingFrame = function(index){
        $scope.isActive = index;
        $scope.urlTest=[];
        $scope.arrChild[index].childIdList.forEach(function(obj){
            var testId = 'http://10.191.47.199:28081/spreadsheet/vision/openresource.jsp?resid=' + obj.id + '&username=admin&password=test&showtoolbar=false';
            var reportUrl = $sce.trustAs($sce.RESOURCE_URL,testId);
            $scope.urlTest.push({url:reportUrl});
            console.log($scope.urlTest);
        });
        // sessionStorage.setItem('urlTest',$scope.urlTest);
    };

    $scope.reportTitleClick = function(index){
        $scope.outerIndex = index;
        $scope.$watch(index,function(newValue,oldValue){
            if(newValue == oldValue){
                $scope.loadingFrame(index);
                $('html,body').animate({scrollTop: '0px'}, 800);
            }else{
                $('html,body').animate({scrollTop: '0px'}, 800);
            }
        });
    };
    $scope.click=function(){
       console.log( );
    }
    //点击子导航跳转到对应报表页面
    $scope.reportClick = function(index,outerIndex){
        $scope.loadingFrame(outerIndex);
        $scope.outerIndex = outerIndex;
        console.log(outerIndex,index);
        $scope.isActive = outerIndex;
        var num = "#"+outerIndex+ "-" + index;
        var iNum = $(num);
        var RequestExpired = setInterval(function(){
        if(iNum.context.readyState=="complete"){
            clearInterval(RequestExpired);
            if(index == 0){
                $('html,body').animate({scrollTop: '0px'}, 800);
            }else{
                $('html,body').animate({scrollTop: $(num).offset().top - 50}, 800);
            }
        }else if(iNum.context.readyState=="interactive"){
            // alert("loading......")
        }
        });

    };
    $scope.reportClick(0,0);




    $("#nav_test").hide();
    $("dd").hide();
    $("#user_off").hide();
    $("#user_on").show();
    $("#user_button").hide();

//鼠标移入移出事件控制子导航出现与隐藏
    $("#nav").mouseover(function (){
        $("#nav_test").show();
        $("dd").show();
    }).mouseout(function (){
        $("#nav_test").hide();
        $("dd").hide();
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
    });
    console.log(upsSwiper);

});


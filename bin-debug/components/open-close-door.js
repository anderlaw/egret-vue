var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var OpenCloseDoor = (function (_super) {
    __extends(OpenCloseDoor, _super);
    function OpenCloseDoor(app, router) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/BaseEnvelope.exml";
        _this.router = router;
        _this.app = app;
        _this.initUI();
        return _this;
    }
    OpenCloseDoor.prototype.initUI = function () {
        var _this = this;
        this.title.text = "面试前：招人，从定标准开始";
        this.tipsContent.text = "这个阶段是面试前的准备工作，作为管理者，需要提供精准的岗位信息，帮助描绘目标选才的“人才画像”。";
        this.startAnimation();
        this.app.changeBgImage("bg1_png");
        //居中
        this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            _this.initMC();
        }, this);
    };
    OpenCloseDoor.prototype.initMC = function () {
        var json = RES.getRes('open_envelop_json');
        var img = RES.getRes('open_envelop_png');
        var mcFactory = new egret.MovieClipDataFactory(json, img);
        this.opendoorMC = new egret.MovieClip(mcFactory.generateMovieClipData());
        this.titleGroup.addChild(this.opendoorMC);
        // 设置居中
        this.opendoorMC.anchorOffsetX = -(egret.MainContext.instance.stage.stageWidth / 2);
        // 设置动画下沉
        this.opendoorMC.y = 300;
    };
    OpenCloseDoor.prototype.startAnimation = function () {
        this.fromTop(this.topSection);
        this.fromBottom(this.bottomSection);
    };
    // 控制topSection向下运动
    OpenCloseDoor.prototype.fromTop = function (vm) {
        var _this = this;
        var tw = egret.Tween.get(vm);
        var getVmHeight = vm.height;
        // console.log(getVmHeight + 'this is getVmHeight')
        vm.y = -getVmHeight;
        tw.to({ y: 0 }, 700).call(function () {
            _this.openEnvelop();
        });
    };
    OpenCloseDoor.prototype.openEnvelop = function () {
        var stageNum = this.router.currentRoute.pathParams.stageNum;
        if (stageNum == 'part-one') {
            this.opendoorMC.gotoAndPlay('one', 1);
        }
        else if (stageNum == 'part-two') {
            this.opendoorMC.gotoAndPlay('two', 1);
        }
    };
    // 控制bottomSection向上运动
    OpenCloseDoor.prototype.fromBottom = function (vm) {
        var _this = this;
        var tw = egret.Tween.get(vm);
        vm.bottom = -vm.height;
        tw.to({ bottom: 0 }, 700).call(function () {
            _this.contentGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchTap, _this);
        });
    };
    // 控制topSection向上运动
    OpenCloseDoor.prototype.backTop = function (vm) {
        var tw = egret.Tween.get(vm);
        var getVmHeight = vm.height;
        console.log(getVmHeight);
        tw.to({ y: -getVmHeight }, 700);
    };
    // 控制bottomSection向下运动
    OpenCloseDoor.prototype.backBottom = function (vm) {
        var _this = this;
        var tw = egret.Tween.get(vm);
        tw.to({ bottom: -vm.height }, 700).call(function () {
            //跳转到下一个页面
            _this.goToNextPage();
        });
    };
    OpenCloseDoor.prototype.touchTap = function () {
        this.backTop(this.topSection);
        this.backBottom(this.bottomSection);
    };
    OpenCloseDoor.prototype.goToNextPage = function () {
        this.router.navigate("/part-one/label/one");
    };
    return OpenCloseDoor;
}(eui.Component));
__reflect(OpenCloseDoor.prototype, "OpenCloseDoor");

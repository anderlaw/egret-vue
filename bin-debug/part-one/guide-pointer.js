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
var GuidePointer = (function (_super) {
    __extends(GuidePointer, _super);
    function GuidePointer(app, router) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/GuidePointer.exml";
        _this.router = router;
        _this.app = app;
        _this.initUI();
        return _this;
    }
    GuidePointer.prototype.initUI = function () {
        var _this = this;
        this.app.changeBgImage("bg1_png");
        //居中
        this.tipLabel.text = "点击屏幕任意处可以进行下一步操作";
        this.bottom = 20;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            _this.startAnimation();
        }, this);
    };
    GuidePointer.prototype.startAnimation = function () {
        var _this = this;
        //初始化动画起点的left值
        this.left = -(this.width);
        //开始动画
        egret.Tween.get(this).to({ left: (this.stage.stageWidth - this.width) / 2 }, 400).call(function () {
            _this.stage.once(egret.TouchEvent.TOUCH_TAP, function () {
                //出场动画
                _this.outAnimation();
                //跳转下一页面
                _this.router.navigate("/part-one/open-close-door");
            }, _this);
        });
    };
    GuidePointer.prototype.outAnimation = function () {
        egret.Tween.get(this).to({ left: -this.width, alpha: 0 }, 400, egret.Ease.sineIn);
    };
    return GuidePointer;
}(eui.Component));
__reflect(GuidePointer.prototype, "GuidePointer");

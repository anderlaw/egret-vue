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
var PartOneHand = (function (_super) {
    __extends(PartOneHand, _super);
    function PartOneHand(app, router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.app = app;
        _this.initUI();
        _this.once(egret.TouchEvent.TOUCH_TAP, function () {
            //点击进入下一步
            _this.router.navigate("/part-one/label2");
        }, _this);
        return _this;
    }
    PartOneHand.prototype.initUI = function () {
        this.app.changeBgImage("bg1_png");
        var image = new eui.Image();
        image.source = "xuqiu_png";
        this.addChild(image);
        this.bottom = -935;
        this.horizontalCenter = 0;
        egret.Tween.get(this).to({ bottom: 0 }, 1000, egret.Ease.quartOut);
    };
    return PartOneHand;
}(eui.Component));
__reflect(PartOneHand.prototype, "PartOneHand");

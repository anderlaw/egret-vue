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
var PartOneCake = (function (_super) {
    __extends(PartOneCake, _super);
    function PartOneCake(app, router) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/cake.exml";
        _this.router = router;
        _this.app = app;
        _this.initUI();
        _this.once(egret.TouchEvent.TOUCH_TAP, function () {
            //点击进入下一步
            //   this.router.navigate("/part-one/hand")
        }, _this);
        return _this;
    }
    PartOneCake.prototype.initUI = function () {
        var _this = this;
        this.app.changeBgImage("bg1_png");
        this.tip_label.textFlow = new egret.HtmlTextParser().parse("\n      <font size=\"26\">\u9762\u8BD5\u524D\u660E\u786E\u5C97\u4F4D\u7684</font><font size=\"30\" b=\"true\">\u201C\u4EBA\u624D\u753B\u50CF\u201D</font><font>\uFF0C\u5F88\u91CD\u8981\u54E6</font>\n      ");
        this.bottom = 120;
        this.horizontalCenter = 0;
        this.btn_group.once(egret.TouchEvent.TOUCH_TAP, function () {
            _this.router.navigate('/part-one/hr-explain');
        }, this);
    };
    return PartOneCake;
}(eui.Component));
__reflect(PartOneCake.prototype, "PartOneCake");

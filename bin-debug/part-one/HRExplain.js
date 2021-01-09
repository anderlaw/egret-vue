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
var PartOneHrExplain = (function (_super) {
    __extends(PartOneHrExplain, _super);
    function PartOneHrExplain(app, router) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/hr_explain.exml";
        _this.router = router;
        _this.app = app;
        _this.initUI();
        _this.once(egret.TouchEvent.TOUCH_TAP, function () {
            _this.router.navigate('/part-one/hr-explain');
        }, _this);
        return _this;
    }
    PartOneHrExplain.prototype.initUI = function () {
        this.content_label.textFlow = new egret.HtmlTextParser().parse("\u65E9\uFF0C\u4E0A\u5468\u63A5\u5230\u4F60\u4EEC\u90E8\u95E8\u7684\u62DB\u8058\u9700\u6C42\uFF0C\u8FD9\u4E2A<font size=\"28\" b=\"true\">\u8D44\u6DF1\u9500\u552E\u7ECF\u7406</font>\u7684\u4EBA\u624D\u753B\u50CF\u3001<font size=\"28\" b=\"true\">\u77E5\u8BC6</font>\u548C<font size=\"28\" b=\"true\">\u7ECF\u9A8C</font>\u7684\u90E8\u5206\uFF0C\u6211\u4EEC\u5DF2\u7ECF\u6536\u5230\u4E86\u3002");
        this.app.changeBgImage("bg1_png");
        //居中
        this.horizontalCenter = 0;
        this.bottom = -100;
    };
    return PartOneHrExplain;
}(eui.Component));
__reflect(PartOneHrExplain.prototype, "PartOneHrExplain");

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
var ProgressBar = (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/progress_bar.exml";
        return _this;
    }
    ProgressBar.prototype.changePercent = function (percentNum) {
        this.percent_label.text = percentNum + '%';
    };
    return ProgressBar;
}(eui.Component));
__reflect(ProgressBar.prototype, "ProgressBar");

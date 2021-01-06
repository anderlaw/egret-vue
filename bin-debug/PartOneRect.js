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
var PartOneRect = (function (_super) {
    __extends(PartOneRect, _super);
    function PartOneRect() {
        var _this = _super.call(this) || this;
        //设置一个背景图
        var label = new eui.Label();
        label.text = "这里是partonerect页面";
        _this.addChild(label);
        return _this;
    }
    return PartOneRect;
}(eui.Component));
__reflect(PartOneRect.prototype, "PartOneRect");

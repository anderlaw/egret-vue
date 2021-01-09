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
var PartOneLabel2 = (function (_super) {
    __extends(PartOneLabel2, _super);
    function PartOneLabel2(app, router) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/label_pangbai.exml";
        _this.router = router;
        _this.app = app;
        _this.initUI();
        return _this;
    }
    PartOneLabel2.prototype.initUI = function () {
        var _this = this;
        this.app.changeBgImage("bg1_png");
        this.content_label.text =
            "今天，HR的同事来了解情况，请跟她一起确认这个岗位的人才画像吧！";
        //居中
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.bottom = 30;
        this.scaleX = this.scaleY = this.alpha = 0;
        var tweens = egret.Tween.get(this);
        tweens
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 600, egret.Ease.sineIn)
            .call(function () {
            _this.once(egret.TouchEvent.TOUCH_TAP, function () {
                //点击进入下一步
                _this.router.navigate("/part-one/cake");
            }, _this);
        });
    };
    return PartOneLabel2;
}(eui.Component));
__reflect(PartOneLabel2.prototype, "PartOneLabel2");

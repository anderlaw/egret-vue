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
var RectLabel = (function (_super) {
    __extends(RectLabel, _super);
    function RectLabel(app, router) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/label_pangbai.exml";
        _this.router = router;
        _this.app = app;
        _this.initUI();
        return _this;
    }
    RectLabel.prototype.initUI = function () {
        var _this = this;
        this.app.changeBgImage("bg1_png");
        var currentRoute = this.router.currentRoute;
        if (currentRoute.pathParams.stageNum === 'part-one') {
            switch (currentRoute.pathParams.index) {
                case 'one':
                    this.content_label.text = "你是一家数据服务公司的销售负责人，今年你们部门有一个【资深销售经理】的岗位急需招人。";
                    break;
                case 'two':
                    this.content_label.text = "今天，HR的同事来了解情况，请跟她一起确认这个岗位的人才画像吧！";
                    break;
            }
        }
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
                _this.router.navigate("/part-one/hand");
            }, _this);
        });
    };
    return RectLabel;
}(eui.Component));
__reflect(RectLabel.prototype, "RectLabel");

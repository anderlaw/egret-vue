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
var PartOneChat = (function (_super) {
    __extends(PartOneChat, _super);
    function PartOneChat() {
        var _this = _super.call(this) || this;
        //设置一个背景图
        var image = new eui.Image();
        image.source = "bg2_png";
        _this.addChild(image);
        //设置聊天组件
        var chatGroup = new eui.Group();
        _this.addChild(chatGroup);
        var rect = new eui.Rect();
        var contentLabel = new eui.Label();
        rect.fillColor = 0xffffff;
        rect.strokeWeight = 2;
        rect.ellipseWidth = 10;
        rect.ellipseHeight = 10;
        rect.strokeColor = 0x000000;
        chatGroup.bottom = 30;
        chatGroup.horizontalCenter = 0;
        contentLabel.percentWidth;
        chatGroup.addChild(rect);
        //按钮
        var btnGroup = new eui.Group();
        // btnGroup.height = 100;
        // btnGroup.width = 100;
        btnGroup.top = -30;
        btnGroup.right = 30;
        btnGroup.height = 60;
        var label = new eui.Label();
        label.text = " 方可哈哈哈哈可 ";
        label.size = 30;
        label.textColor = 0xff0000;
        label.verticalCenter = 0;
        var bgRect = new eui.Rect();
        bgRect.percentWidth = 100;
        bgRect.percentHeight = 100;
        bgRect.fillColor = 0xcccccc;
        bgRect.ellipseWidth = 10;
        bgRect.ellipseHeight = 10;
        btnGroup.addChild(bgRect);
        btnGroup.addChild(label);
        chatGroup.addChild(btnGroup);
        _this.once(egret.Event.ADDED_TO_STAGE, function () {
            image.width = _this.stage.stageWidth;
            image.height = _this.stage.stageHeight;
            rect.width = _this.stage.stageWidth * .8;
            rect.height = _this.stage.stageHeight * .3;
        }, _this);
        return _this;
    }
    return PartOneChat;
}(eui.Component));
__reflect(PartOneChat.prototype, "PartOneChat");

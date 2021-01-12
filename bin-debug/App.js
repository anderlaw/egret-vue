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
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._percentNum = 0;
        return _this;
    }
    App.prototype.componentWillMount = function () {
        //背景图
        this._bgImage = new eui.Image();
        this._bgImage.width = this.rootLayer.stage.stageWidth;
        this._bgImage.height = this.rootLayer.stage.stageHeight;
        this._bgImage.source = "bg1_png";
        this.rootLayer.addChild(this._bgImage);
        //页面容器
        this.rootLayer.addChild(this.pageLayer = new eui.UILayer());
        //进度条，放到上层（在页面容器的后面添加）
        this._progressBar = new ProgressBar();
        this.rootLayer.addChild(this._progressBar);
    };
    App.prototype.routerWillInit = function () {
        new Router({
            pageLayer: this.pageLayer,
            app: this,
            routes: Routes
        });
    };
    /**
     *
     * @param imgName 图片名称
     */
    App.prototype.changeBgImage = function (imgName) {
        this._bgImage.source = imgName;
    };
    return App;
}(DDI.App));
__reflect(App.prototype, "App");

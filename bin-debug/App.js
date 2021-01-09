var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App(layer, routes) {
        this._percentNum = 0;
        this.layer = layer;
        //背景图
        this._bgImage = new eui.Image();
        this._bgImage.width = layer.stage.stageWidth;
        this._bgImage.height = layer.stage.stageHeight;
        this.layer.addChild(this._bgImage);
        //页面容器
        this.layer.addChild(this.container = new eui.UILayer());
        new Router(this, routes);
        //进度条，放到上层（在页面容器的后面添加）
        this._progressBar = new ProgressBar();
        this.layer.addChild(this._progressBar);
    }
    /**
     *
     * @param imgName 图片名称
     */
    App.prototype.changeBgImage = function (imgName) {
        this._bgImage.source = imgName;
    };
    /**
     *
     * @param path 新页面的path
     */
    App.prototype.routeChanged = function (hashRoute) {
        this._percentNum += 4;
        this._progressBar.changePercent(this._percentNum);
        console.log(hashRoute);
    };
    return App;
}());
__reflect(App.prototype, "App");

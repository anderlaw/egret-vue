var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DDI;
(function (DDI) {
    //提供一些基类，封装既定的方法方便子类继承使用
    var App = (function () {
        function App(params) {
            this.rootLayer = params.rootLayer;
            this.DOMLayer = params.DOMLayer;
            this.global = params.global;
            //1
            this.componentWillMount();
            //2
            this.routerWillInit();
        }
        /**
         * 路由初始化入口
         */
        App.prototype.routerWillInit = function () {
        };
        /**
         * UI初始化入口
         */
        App.prototype.componentWillMount = function () {
        };
        return App;
    }());
    DDI.App = App;
    __reflect(App.prototype, "DDI.App");
})(DDI || (DDI = {}));

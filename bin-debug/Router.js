var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Router = (function () {
    function Router(app, routes) {
        this.app = app;
        this.routes = routes;
        this.init();
    }
    //路由配置入口
    Router.prototype.init = function () {
        var _this = this;
        this._cachedRouteMap = {};
        //根据url初始化页面
        var hashRoute = this.getHashRoute();
        console.log(hashRoute);
        //遍历查到到对应的第一个组件并加载执行
        if (hashRoute.path in this._cachedRouteMap) {
            this.app.container.addChild(this._cachedRouteMap[hashRoute.path]);
        }
        else {
            var currentRoute = this.routes.find(function (route) { return route.path === hashRoute.path; });
            if (currentRoute) {
                this.app.container.addChild((this._cachedRouteMap[hashRoute.path] = new currentRoute.component(this.app, this)));
            }
        }
        //监听变化，遍历执行
        window.addEventListener("hashchange", function () {
            var hashRoute = _this.getHashRoute();
            console.log(hashRoute);
            //删除所有界面元素
            _this.app.container.removeChildren();
            //遍历查到到对应的第一个组件并加载执行
            var currentComponent;
            if (hashRoute.path in _this._cachedRouteMap) {
                currentComponent = _this._cachedRouteMap[hashRoute.path];
            }
            else {
                var currentRoute = _this.routes.find(function (route) { return route.path === hashRoute.path; });
                if (currentRoute) {
                    currentComponent = (_this._cachedRouteMap[hashRoute.path] = new currentRoute.component(_this.app, _this));
                }
            }
            _this.app.routeChanged(hashRoute);
            currentComponent && _this.app.container.addChild(currentComponent);
        });
    };
    /**
     * 获取hash route(从location上获取)
     */
    Router.prototype.getHashRoute = function () {
        var hashUrl = location.hash.split("#")[1];
        var queryParams = null;
        if (!hashUrl) {
            //不存在hash
            return {
                path: "",
                queryParams: queryParams,
            };
        }
        else {
            //存在
            var path = hashUrl.split("?")[0];
            var queryString = hashUrl.split("?")[1];
            if (queryString) {
                var keyValueArr = queryString.split("&");
                keyValueArr.forEach(function (keyVItem) {
                    !queryParams && (queryParams = {});
                    var name = keyVItem.split("=")[0];
                    var value = keyVItem.split("=")[1];
                    queryParams[name] = value;
                });
            }
            return {
                path: path,
                queryParams: queryParams,
            };
        }
    };
    /**
     * 导航到路由对应的页面
     */
    Router.prototype.navigate = function (path, queryParams) {
        var queryString = "";
        if (queryParams) {
            for (var key in queryParams) {
                queryString += key + "=" + queryParams[key] + "&";
            }
            queryString.slice(0, queryString.length - 1);
        }
        location.hash = path + queryString;
    };
    return Router;
}());
__reflect(Router.prototype, "Router");

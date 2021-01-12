var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DDI;
(function (DDI) {
    var Router = (function () {
        function Router(param) {
            this.app = param.app;
            this.routes = param.routes;
            this.pageLayer = param.pageLayer;
            //初始化
            this.initRouter();
        }
        Router.prototype.initRouter = function () {
            var _this = this;
            //初始缓存对象
            this._cachedRouteComMap = {};
            this.routeRegExp = {};
            //遍历route配置表，为每个建立正则规则，方便后面匹配path
            this.routes.forEach(function (route) {
                var routeName = route.path;
                var regExpStr = "";
                if (routeName !== "") {
                    //去除前面的/，如果有
                    routeName.split("/").forEach(function (pathFragment) {
                        if (!pathFragment) {
                            return;
                        }
                        if (pathFragment[0] === ":") {
                            //路径参数
                            regExpStr += "/([\\w\\-]+)";
                        }
                        else {
                            regExpStr += "/" + pathFragment;
                        }
                    });
                }
                //记录
                regExpStr = "^" + regExpStr + "$";
                _this.routeRegExp[routeName] = new RegExp(regExpStr);
            });
            //显示当前path对应的界面
            this.pageInit();
            //路由初始化完毕！
            this.routerInited();
        };
        Router.prototype.renderRoute = function (path) {
            var parseRes = this.parseRoute(path);
            if (parseRes.route === null) {
                //没有匹配的
                return;
            }
            this.currentRoute = parseRes;
            var hashRoute = parseRes.route;
            console.log(hashRoute);
            //删除所有界面元素
            this.pageLayer.removeChildren();
            //遍历查到到对应的第一个组件并加载执行
            var currentComponent;
            if (hashRoute in this._cachedRouteComMap) {
                currentComponent = this._cachedRouteComMap[hashRoute];
            }
            else {
                var routeObject = this.routes.find(function (route) { return route.path === hashRoute; });
                routeObject &&
                    (currentComponent = this._cachedRouteComMap[hashRoute] = new routeObject.component(this.app, this));
            }
            currentComponent && this.pageLayer.addChild(currentComponent);
        };
        //路由
        Router.prototype.routerInited = function () { };
        Router.prototype.parseRoute = function (pathUrl) {
            var path = pathUrl;
            var route = null;
            var pathParams = {};
            var _loop_1 = function (itemRouteName) {
                var regOfRoute = this_1.routeRegExp[itemRouteName];
                var pathMatchRes = regOfRoute.exec(path);
                if (pathMatchRes) {
                    route = itemRouteName;
                    //匹配路径参数
                    var pathParamNames = route.match(/\/:[\w\-]+/g);
                    pathParamNames &&
                        pathParamNames.forEach(function (pathParamName, index) {
                            pathParams[pathParamName.slice(2)] = pathMatchRes[index + 1];
                        });
                    return "break";
                }
            };
            var this_1 = this;
            for (var itemRouteName in this.routeRegExp) {
                var state_1 = _loop_1(itemRouteName);
                if (state_1 === "break")
                    break;
            }
            return {
                path: path,
                route: route,
                pathParams: pathParams,
            };
        };
        /**
         * 获取search string
         */
        Router.prototype.getQueryString = function () {
            return location.search;
        };
        /**
         *
         * @param 页面初始化
         */
        Router.prototype.pageInit = function () {
            /**
             * 需要支持外链额外的#符，以pathname作为路由的起点。为pathname后补#号
             */
            if (location.href.indexOf(location.pathname + "#") === -1) {
                location.href = location.href.replace(location.pathname, location.pathname + "#");
            }
            var path = location.href.match(/index\.html#([^#\?]*)/)[1];
            this.navigate(path);
        };
        /**
         * 导航到路由对应的页面
         */
        Router.prototype.navigate = function (path) {
            var _this = this;
            this.routeWillChange(path, function () {
                //记录index.html 紧接的hash的非path部分（hash,后面的#作为片段符、？作为查询符全部保持）
                var findOldPathAndPostFix = location.href.match(/index\.html#([^\?\#]*)(.*)$/);
                // const oldPath = findOldPathAndPostFix[1];
                var postFix = findOldPathAndPostFix[2];
                location.hash = path + postFix;
                _this.renderRoute(path);
            });
        };
        Router.prototype.routeWillChange = function (path, next) { };
        return Router;
    }());
    DDI.Router = Router;
    __reflect(Router.prototype, "DDI.Router");
})(DDI || (DDI = {}));

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Router = (function () {
    function Router(routes) {
        var _this = this;
        this.routes = routes;
        //监听变化，遍历执行
        window.addEventListener("hashchange", function () {
            // console.log("The hash has changed!");
            _this.registers && _this.registers.forEach(function (fn) { return fn(); });
        });
    }
    /**
     * 负责改变url路径
     * @param route 路径数组
     */
    Router.prototype.navigate = function (route, queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        //处理query
        var queryStr = "?";
        for (var key in queryParams) {
            queryStr += key + "=" + queryParams[key] + "&";
        }
        queryStr = queryStr.slice(0, queryStr.length - 1);
        //拼接路径
        var routePath = route.join("/") + queryStr;
        location.href = location.href.split("#")[0] + routePath;
    };
    /**
     * 监听hash变化
     */
    Router.prototype.listen = function (callback) {
        //空校验
        !this.registers && (this.registers = []);
        //去重判断
        this.registers.indexOf(callback) === -1 && this.registers.push(callback);
    };
    return Router;
}());
__reflect(Router.prototype, "Router");
//注册路由组件
//根据路由导航到组件，然后将组件添加到layer里。

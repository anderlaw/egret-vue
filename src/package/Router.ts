namespace DDI {
  interface paramType {
    app: App;
    routes: Array<any>; //路由配置
    pageLayer: eui.UILayer; //页面节点
  }
  export class Router {
    protected routes: Array<any>;
    protected app: App;
    protected pageLayer: eui.UILayer;
    private _cachedRouteMap: { [pathName: string]: any };

    constructor(param: paramType) {
      this.app = param.app;
      this.routes = param.routes;
      this.pageLayer = param.pageLayer;

      this._cachedRouteMap = {}; //初始化
      this.registerHashChange();
      this.routerWillInit();
    }

    private registerHashChange() {
      window.addEventListener("hashchange", () => {
        this.renderRoute();
      });
    }
    private renderRoute() {
      const hashRoute = this.getRoutePath();
      //删除所有界面元素
      this.pageLayer.removeChildren();
      //遍历查到到对应的第一个组件并加载执行
      let currentComponent;
      if (hashRoute in this._cachedRouteMap) {
        currentComponent = this._cachedRouteMap[hashRoute];
      } else {
        const routeObject = this.routes.find(
          (route) => route.path === hashRoute
        );
        routeObject &&
          (currentComponent = this._cachedRouteMap[
            hashRoute
          ] = new routeObject.component(this.app, this));
      }
      currentComponent && this.pageLayer.addChild(currentComponent);
    }
    //路由配置入口
    protected routerWillInit() {}
    /**
     * 获取route path(从location上获取)
     */
    public getRoutePath(): string {
      const hashUrl = location.hash;
      const queryStr = location.search;
      if (!queryStr) return hashUrl.split("#")[1];
      return hashUrl.split("#")[1].split("?")[0];
    }
    /**
     * 获取search string
     */
    public getQueryString(): string {
      return location.search;
    }
    /**
     * 导航到路由对应的页面
     */
    public navigate(path: string) {
      const currHashRoute = this.getRoutePath();
      const newHashRoute = path;
      this.routeWillChange(path, () => {
        if (currHashRoute === newHashRoute) {
          this.renderRoute();
        }
        location.hash = path + this.getQueryString();
      });
    }
    protected routeWillChange(path: string, next: () => void) {}
  }
}

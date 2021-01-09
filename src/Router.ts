class Router {
  private routes: Array<any>;
  private app:App;
  private _cachedRouteMap: { [pathName: string]: any };

  constructor(app:App,routes:Array<any>) {
    this.app = app;
    this.routes = routes;
    this.init();
  }
  //路由配置入口
  private init() {
    this._cachedRouteMap = {};
    //根据url初始化页面
    const hashRoute = this.getHashRoute();
    console.log(hashRoute);

    //遍历查到到对应的第一个组件并加载执行
    if (hashRoute.path in this._cachedRouteMap) {
      this.app.container.addChild(this._cachedRouteMap[hashRoute.path]);
    } else {
      const currentRoute = this.routes.find(
        (route) => route.path === hashRoute.path
      );
      if (currentRoute) {
        this.app.container.addChild(
          (this._cachedRouteMap[hashRoute.path] = new currentRoute.component(this.app,this))
        );
      }
    }
    //监听变化，遍历执行
    window.addEventListener("hashchange", () => {
      const hashRoute = this.getHashRoute();
      console.log(hashRoute);

      //删除所有界面元素
      this.app.container.removeChildren();
      //遍历查到到对应的第一个组件并加载执行
      let currentComponent;
      if (hashRoute.path in this._cachedRouteMap) {
        currentComponent = this._cachedRouteMap[hashRoute.path]
      } else {
        const currentRoute = this.routes.find(
          (route) => route.path === hashRoute.path
        );
        if (currentRoute) {
          currentComponent = (this._cachedRouteMap[
            hashRoute.path
          ] = new currentRoute.component(this.app,this))
        }
      }
      this.app.routeChanged(hashRoute)
      currentComponent && this.app.container.addChild(currentComponent);
    });
  }
  /**
   * 获取hash route(从location上获取)
   */
  private getHashRoute(): {path:string,queryParams:any} {
    const hashUrl = location.hash.split("#")[1];
    let queryParams = null;
    if (!hashUrl) {
      //不存在hash
      return {
        path: "",
        queryParams: queryParams,
      };
    } else {
      //存在
      const path = hashUrl.split("?")[0];
      const queryString = hashUrl.split("?")[1];
      if (queryString) {
        const keyValueArr = queryString.split("&");
        keyValueArr.forEach((keyVItem) => {
          !queryParams && (queryParams = {});
          const name = keyVItem.split("=")[0];
          const value = keyVItem.split("=")[1];
          queryParams[name] = value;
        });
      }
      return {
        path: path,
        queryParams: queryParams,
      };
    }
  }
  /**
   * 导航到路由对应的页面
   */
  public navigate(path: string, queryParams?) {
    let queryString = "";
    if (queryParams) {
      for (let key in queryParams) {
        queryString += `${key}=${queryParams[key]}&`;
      }
      queryString.slice(0, queryString.length - 1);
    }
    location.hash = path + queryString;
  }
}

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
    //建立route对应的正则，只有当路径通过正则匹配后才展示页面
    private routeRegExp: { [routeName: string]: RegExp };
    private _cachedRouteComMap: {
      [routeName: string]: any;
    };
    //当前页面的路由snapshots
    public currentRoute: {
      route: string;
      path: string;
      pathParams: {
        [paraName: string]: string;
      };
    };
    constructor(param: paramType) {
      this.app = param.app;
      this.routes = param.routes;
      this.pageLayer = param.pageLayer;

      //初始化
      this.initRouter();
    }
    private initRouter() {
      //初始缓存对象
      this._cachedRouteComMap = {};
      this.routeRegExp = {};
      //遍历route配置表，为每个建立正则规则，方便后面匹配path
      this.routes.forEach((route) => {
        let routeName = route.path;
        let regExpStr = "";
        if (routeName !== "") {
          //去除前面的/，如果有
          routeName.split("/").forEach((pathFragment) => {
            if (!pathFragment) {
              return;
            }
            if (pathFragment[0] === ":") {
              //路径参数
              regExpStr += "/([\\w\\-]+)";
            } else {
              regExpStr += "/" + pathFragment;
            }
          });
 
        }
        //记录
        regExpStr = "^" + regExpStr + "$";
        this.routeRegExp[routeName] = new RegExp(regExpStr);
      });
      //初次渲染页面（默认渲染url中path对应的界面）
      this.pageFirstRender();
    }
    private renderRoute(path: string) {
      //记录index.html 紧接的hash的非path部分（hash,后面的#作为片段符、？作为查询符全部保持）
      const findOldPathAndPostFix = location.href.match(/index\.html#([^\?\#]*)(.*)$/)
      // const oldPath = findOldPathAndPostFix[1];
      const postFix = findOldPathAndPostFix[2];
      location.hash = path+postFix


      const parseRes = this.parseRoute(path);
      if (parseRes.route === null) {
        //没有匹配的
        return;
      }

      this.currentRoute = parseRes;
      const hashRoute = parseRes.route;
      //删除所有界面元素
      this.pageLayer.removeChildren();
      //遍历查到到对应的第一个组件并加载执行
      let currentComponent;
      if (hashRoute in this._cachedRouteComMap) {
        currentComponent = this._cachedRouteComMap[hashRoute];
      } else {
        const routeObject = this.routes.find(
          (route) => route.path === hashRoute
        );
        routeObject &&
          (currentComponent = this._cachedRouteComMap[
            hashRoute
          ] = new routeObject.component(this.app, this));
      }
      currentComponent && this.pageLayer.addChild(currentComponent);
    }

    private parseRoute(
      pathUrl: string
    ): {
      route: string;
      path: string;
      pathParams: { [pramName: string]: string };
    } {
      let path = pathUrl;
      let route = null;
      let pathParams = {};

      for (let itemRouteName in this.routeRegExp) {
        const regOfRoute = this.routeRegExp[itemRouteName];
        const pathMatchRes = regOfRoute.exec(path);

        if (pathMatchRes) {
          route = itemRouteName;
          //匹配路径参数
          const pathParamNames = route.match(/\/:[\w\-]+/g);
          pathParamNames &&
            pathParamNames.forEach((pathParamName, index) => {
              pathParams[pathParamName.slice(2)] = pathMatchRes[index + 1];
            });
          break;
        }
      }
      return {
        path,
        route,
        pathParams,
      };
    }
    /**
     * 获取search string
     */
    public getQueryString(): string {
      return location.search;
    }
    /**
     *
     * @param 页面初始渲染
     */
    private pageFirstRender() {
      /**
       * 补全index.html后的#
       */
      if (location.href.indexOf(location.pathname + "#") === -1) {
        location.href = location.href.replace(
          location.pathname,
          location.pathname + "#"
        );
      }
      const path = location.href.match(/index\.html#([^#\?]*)/)[1];
      this.routeWillInited(path,(replacedPath?:string)=>{
        //默认是location上的path，可以传入新path替代
        this.renderRoute(replacedPath || path)
      })
    }
    /**
     * 导航到路由对应的页面
     */
    public navigate(path: string) {
      this.routeWillChange(path, () => {
        this.renderRoute(path);
      });
    }
    //每次route间跳转回调
    protected routeWillChange(path: string, next: () => void) {}
    /**
     * 路由初次渲染
     */
    protected routeWillInit(path:string,next:(replacedPath?:string)=>void){

    }
  }
}

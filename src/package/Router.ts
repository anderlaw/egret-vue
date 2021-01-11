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
    private routeRegExp:{[routeName:string]:RegExp};
    private _cachedRouteComMap: { 
      [routeName: string]: any,
    };
    //当前页面的路由snapshots
    protected currentRoute:{ 
      route:string,
      path:string,
      pathParams:{
        [paraName:string]:string
      }
    };
    constructor(param: paramType) {
      this.app = param.app;
      this.routes = param.routes;
      this.pageLayer = param.pageLayer;

      //初始化
      this.initRouter();
      this.routerWillStart();
    }
    private initRouter(){
      //初始缓存对象
      this._cachedRouteComMap = {};
      this.routeRegExp = {};
      //遍历route配置表，为每个建立正则规则，方便后面匹配path
      this.routes.forEach(route=>{
        let routeName = route.path;
        let regExpStr = "";
        //去除前面的/，如果有
        routeName.split("/").forEach(pathFragment=>{
          if(!pathFragment){
            return;
          }
          if(pathFragment[0] === ":"){
            //路径参数
            regExpStr += "/([\\w\\-]+)"
          }else{
            regExpStr += "/"+pathFragment
          }
        });
        //记录
        regExpStr = "^"+regExpStr+"$";
        this.routeRegExp[routeName] = new RegExp(regExpStr)
      })
      
    }
    private renderRoute() {
      const parseRes = this.currentRoute = this.parseLocation()
      const hashRoute = parseRes.route;
      console.log(hashRoute)
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
    //路由
    protected routerWillStart() {}
    private parseLocation():{route:string,path:string,pathParams:{[pramName:string]:string}}{
      const hashUrl = location.hash;
      const queryStr = location.search;

      let path = "";
      let route = ""
      let pathParams = {}
      if (!queryStr){
        path = hashUrl.split("#")[1];
      }else{
        path = hashUrl.split("#")[1].split("?")[0];
      }


      for(let itemRouteName in this.routeRegExp){
        const regOfRoute = this.routeRegExp[itemRouteName]
        const pathMatchRes =  regOfRoute.exec(path);
        
        if(pathMatchRes){
          route= itemRouteName;
          const pathParamNames = route.match(/\/:[\w\-]+/g)
          pathParamNames.forEach((pathParamName,index)=>{
            pathParams[pathParamName.slice(2)] = pathMatchRes[index+1]
          })
          break;
        }
      }
      return {
        path,
        route,
        pathParams
      }
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
      this.routeWillChange(path, () => {
        location.hash = path + this.getQueryString();
        this.renderRoute();
      });
    }
    protected routeWillChange(path: string, next: () => void) {}
  }
}

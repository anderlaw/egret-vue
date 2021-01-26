namespace Base {
  interface paramType {
    app: App;
    routes: Array<any>; //路由配置
    el: eui.UILayer; //页面节点
  }
  export class Router {
    protected routes: Array<any>;
    protected $app: App;
    protected $el: eui.UILayer;

    //建立原始path（可能包含冒号+参数）对应的正则，只有当路径通过正则匹配后才展示页面
    private _originPathREGMap: { [originPath: string]: RegExp };
    private _cachedPageMap: {
      [originPath: string]: any;
    };
    //当前页面的路由snapshots
    public activeRoute: {
      originPath: string;
      path: string;
      pathParams: {
        [paraName: string]: string;
      };
    };
    constructor(param: paramType) {
      this.$app = param.app;
      this.$el = param.el;
      this.routes = param.routes;
      //1初始化路由配置表
      this.initRoutes();

      //执行App的生命周期
      //2.App初始化后
      (this.$app as any).AppInited && (this.$app as any).AppInited();
      //3.开始渲染首页
      this.renderFirstScreen();
    }
    private initRoutes() {
      //初始缓存对象
      this._cachedPageMap = {};
      this._originPathREGMap = {};
      //遍历route配置表，为每个建立正则规则，方便后面匹配path
      this.routes.forEach((route) => {
        const originPath = route.path;
        let regExpStr = "";
        if (originPath !== "") {
          //以/分组，处理路径片段
          originPath.split("/").forEach((pathFragment) => {
            if (!pathFragment) {
              return;
            }
            if (pathFragment[0] === ":") {
              if(!/^[\w\-]+$/.test(pathFragment.slice(1))){
                throw("路径片段只能为数字、字母、连接符")
              }
              regExpStr += "/([\\w\\-]+)";
            } else {
              //没有参数
              regExpStr += "/" + pathFragment;
            }
          });
        }
        //组装成完整的正则
        regExpStr = "^" + regExpStr + "$";
        //将每个原始路径对应的正则记录到map表里
        this._originPathREGMap[originPath] = new RegExp(regExpStr);
      });
    }
    private renderRoute(path: string, completeFn?: Function) {
      //记录index.html 紧接的hash的非path部分（hash,后面的#作为片段符、？作为查询符全部保持）
      const findOldPathAndPostFix = location.href.match(
        /index\.html#([^\?\#]*)(.*)$/
      );
      // const oldPath = findOldPathAndPostFix[1];
      const postFix = findOldPathAndPostFix[2];
      //modify hash string
      location.hash = path + postFix;

      const parseResult = this.activeRoute = this.parseRoute(path);
      if (parseResult.originPath === null) {
        //没有匹配的
        return;
      }

 
      //删除所有界面元素
      this.$el.removeChildren();
      //遍历查到到对应的第一个组件并加载执行
      const originPath = parseResult.originPath;
      let currentComponent;
      
      if (originPath in this._cachedPageMap) {
        currentComponent = this._cachedPageMap[originPath];
      } else {
        const routeObject = this.routes.find(
          (route) => route.path === originPath
        );
        routeObject &&
          (currentComponent = this._cachedPageMap[
            originPath
          ] = new routeObject.component(this.$app, this));
        //页面组件的生命周期钩子
        const curComp = currentComponent;
        curComp.componentWillInit && curComp.componentWillInit();
        curComp.mounted && curComp.addEventListener(egret.Event.ADDED_TO_STAGE, curComp.mounted, curComp);
        curComp.unmounted && curComp.addEventListener(
          egret.Event.REMOVED_FROM_STAGE,
          curComp.unmounted,
          curComp
        );

      }
      this.$el.addChild(currentComponent);
      completeFn && completeFn();
    }

    private parseRoute(
      pathUrl: string
    ): {
      path: string;
      originPath: string;
      pathParams: { [pramName: string]: string };
    } {
      let path = pathUrl;
      let originPath = null;
      let pathParams = {};

      for (const originPathItem in this._originPathREGMap) {
        const regOfItem = this._originPathREGMap[originPathItem];
        const pathMatchRes = regOfItem.exec(path);

        if (pathMatchRes) {
          originPath = originPathItem;
          //匹配路径参数
          const pathParamMathes = originPath.match(/\/:[\w\-]+/g);
          pathParamMathes &&
          pathParamMathes.forEach((pathParamName, index) => {
            //初始化正则表配置了捕获，捕获组从第二个元素开始（1）
            //so we should take from second item
              pathParams[pathParamName.slice(2)] = pathMatchRes[index + 1];
            });
          break;
        }
      }
      return {
        path,
        originPath,
        pathParams,
      };
    }
    /**
     *
     * @param 页面首屏渲染
     */
    public renderFirstScreen() {
      /**
       * 补全index.html后的#
       */
      if (location.href.indexOf(location.pathname + "#") === -1) {
        location.href = location.href.replace(
          location.pathname,
          location.pathname + "#"
        );
      }
      //匹配index.html#后不包含#、?的路径
      const path = location.href.match(/index\.html#([^#\?]*)/)[1];
      //执行App里首屏渲染的回调

      (this.$app as any).beforefirstScreenRender &&
      (this.$app as any).beforefirstScreenRender(path, (replacedPath?: string) => {
          //默认是location上的path，可以传入新path替代
          this.renderRoute(replacedPath === void 0 ? path : replacedPath);
        });
    }
    /**
     * 导航到路由对应的页面,可以携带载荷，供路由变化钩子捕获
     */
    public navigate(toPath: string, payload?: any) {
      (this.$app as any).beforeEach &&
      (this.$app as any).beforeEach(this.activeRoute.path,toPath,() => {
          this.renderRoute(toPath, () => {
            (this.$app as any).afterEach && (this.$app as any).afterEach(toPath);
          });
        },payload);
    }
  }
}

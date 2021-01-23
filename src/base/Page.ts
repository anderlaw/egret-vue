namespace DDI {
  export interface PageRequirements{
    /**
     * app应用实例
     */
    $app:App,
    /**
     * router实例
     */
    $router:Router,//
    /**
     * 界面准备工作（设置皮肤名称、创建元素、添加元素等）的钩子
     */
    componentWillInit:()=>void,
    /**
     * 组件添加到舞台（stage）时的钩子
     */
    mounted:()=>void,
    /**
     * 组件从舞台移除
     */
    unmounted:()=>void,

  }
  export class PageComponent extends eui.Component{
    $app: App;
    $router: Router;
    constructor(app: App, router: Router) {
      super();
      this.$router = router;
      this.$app = app;
    }
  }
}

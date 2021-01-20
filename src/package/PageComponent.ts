namespace DDI {
  export class PageComponent extends eui.Component {
    $app: App;
    $router: Router;
    constructor(app: App, router: Router) {
      super();
      this.$router = router;
      this.$app = app;
      this.componentWillInit();
      this.addEventListener(egret.Event.ADDED_TO_STAGE, this.mounted, this);
      this.addEventListener(
        egret.Event.REMOVED_FROM_STAGE,
        this.unmounted,
        this
      );
    }
    /**
     * 界面UI的准备工作（设置皮肤名称、创建元素、添加元素等）的钩子
     */
    public componentWillInit() {}
    /**
     * 组件添加到舞台（stage）时的钩子
     */
    public mounted() {}
    /**
     * 组件从舞台移除
     */
    public unmounted() {}
  }
}

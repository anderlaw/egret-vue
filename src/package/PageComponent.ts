namespace DDI {
    export class PageComponent extends eui.Component{
    app: App;
    router: Router;
    public content_label: eui.Label;
    constructor(app: App, router: Router) {
      super();
      this.router = router;
      this.app = app;
      this.UIWillInit();
      this.addEventListener(egret.Event.ADDED_TO_STAGE,this.mounted,this)
    }
    /**
     * 界面UI的准备工作（设置皮肤名称、创建元素、添加元素等）的钩子
     */
    public UIWillInit(){}
    /**
     * 组件添加到舞台（stage）时的钩子
     */
    public mounted(){}

}
}
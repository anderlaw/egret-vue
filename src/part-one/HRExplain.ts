class PartOneHrExplain extends eui.Component {
  app: App;
  router: Router;
  public content_label: eui.Label;
  constructor(app: App, router: Router) {
    super();
    this.skinName = "resource/skins/hr_explain.exml";
    this.router = router;
    this.app = app;
    this.initUI();
    this.once(egret.TouchEvent.TOUCH_TAP,()=>{
        this.router.navigate('/part-one/hr-explain')
    },this)
  }
  public initUI() {
    this.content_label.textFlow = new egret.HtmlTextParser().parse(
        `早，上周接到你们部门的招聘需求，这个<font size="28" b="true">资深销售经理</font>的人才画像、<font size="28" b="true">知识</font>和<font size="28" b="true">经验</font>的部分，我们已经收到了。`)
    this.app.changeBgImage("bg1_png");
    //居中
    this.horizontalCenter = 0;
    this.bottom = -100  
  }
}

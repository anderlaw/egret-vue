class PartOneCake extends eui.Component {
    app: App;
    router: Router;
    public tip_label: eui.Label;
    public btn_group: eui.Group;
    constructor(app: App, router: Router) {
      super();
      this.skinName = "resource/skins/cake.exml";
      this.router = router;
      this.app = app;
      this.initUI();
      this.once(egret.TouchEvent.TOUCH_TAP,()=>{
          //点击进入下一步
        //   this.router.navigate("/part-one/hand")
      },this)
    }
    public initUI() {
      this.app.changeBgImage("bg1_png");
      this.tip_label.textFlow = new egret.HtmlTextParser().parse(`
      <font size="26">面试前明确岗位的</font><font size="30" b="true">“人才画像”</font><font>，很重要哦</font>
      `)
      this.bottom = 120;
      this.horizontalCenter = 0;

      this.btn_group.once(egret.TouchEvent.TOUCH_TAP,()=>{
          this.router.navigate('/part-one/hr-explain')
      },this)
    }
  }
  
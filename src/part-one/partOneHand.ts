class PartOneHand extends eui.Component {
  app: App;
  router: Router;
  public constructor(app: App, router: Router) {
    super();
    this.router = router;
    this.app = app;
    this.initUI();
    this.once(
      egret.TouchEvent.TOUCH_TAP,
      () => {
        //点击进入下一步
        this.router.navigate("/part-one/label2");
      },
      this
    );
  }

  public initUI(): void {
    this.app.changeBgImage("bg1_png");
    const image = new eui.Image();
    image.source = "xuqiu_png";
    
    this.addChild(image);
    
    this.bottom = -935;
    this.horizontalCenter = 0;
    egret.Tween.get(this).to({ bottom: 0 }, 1000, egret.Ease.quartOut).call(()=>{
      //注册一次点击
      this.stage.once(egret.TouchEvent.TOUCH_TAP,()=>{

        egret.Tween.get(this).to({ bottom: -700, alpha: 0 }, 800, egret.Ease.sineIn).call(()=>{
          //进入下一页
          this.router.navigate('/part-one/label/two')
        })
      
      },this)
    });
  }
}

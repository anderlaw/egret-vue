class GuidePointer extends eui.Component {
  app: App;
  router: Router;
  public tipLabel: eui.Label;
  constructor(app: App, router: Router) {
    super();
    this.skinName = "resource/skins/GuidePointer.exml";

    this.router = router;
    this.app = app;
    this.initUI();
  }
  public initUI() {
    this.app.changeBgImage("bg1_png");
    //居中
    this.tipLabel.text = "点击屏幕任意处可以进行下一步操作";
    this.bottom = 20;
    this.addEventListener(egret.Event.ADDED_TO_STAGE,()=>{
      this.startAnimation();
    },this)
  }
  public startAnimation() {
    //初始化动画起点的left值
    this.left = -(this.width);
    //开始动画
    egret.Tween.get(this).to({ left: (this.stage.stageWidth-this.width)/2 }, 400).call(()=>{
      this.stage.once(egret.TouchEvent.TOUCH_TAP,()=>{
        //出场动画
        this.outAnimation();
        //跳转下一页面
        this.router.navigate("/part-one/open-close-door")
      },this)
    });
  }
  public outAnimation(){
    egret.Tween.get(this).to({ left:-this.width,alpha:0}, 400,egret.Ease.sineIn);
  }
}

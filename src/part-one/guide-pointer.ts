class GuidePointer extends DDI.PageComponent implements DDI.PageRequirements {
  public $app;
  public tipLabel: eui.Label;
  public mounted() {
    // console.log("加载了");
    
    this.startAnimation();
  }
  public unmounted() {
    // console.log("解除了");
    this.stage.removeEventListener(
      egret.TouchEvent.TOUCH_TAP,
      this.handleClick,
      this
    );
  }
  public componentWillInit() {
    console.log(this.$app)
    console.log(this.$router)
    this.skinName = "resource/skins/GuidePointer.exml";
    this.$app.changeBgImage("bg1_png");
    //居中
    this.tipLabel.text = "点击屏幕任意处可以进行下一步操作";
    this.bottom = 20;
  }
  public handleClick(){
    //出场动画
    this.outAnimation().call(()=>{
      //跳转下一页面
      this.$router.navigate("/part-one/open-close-door");
    });
    
  }
  public startAnimation() {
    //初始化动画起点的left值
    this.left = -this.width;
    //开始动画
    egret.Tween.get(this)
      .to({ left: (this.stage.stageWidth - this.width) / 2 }, 400)
      .call(() => {
        this.stage.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          this.handleClick,
          this
        );
      });
  }
  public outAnimation():egret.Tween {
    return egret.Tween.get(this).to(
      { left: -this.width, alpha: 0 },
      400,
      egret.Ease.sineIn
    );
  }
}

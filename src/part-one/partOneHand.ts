class PartOneHand extends DDI.PageComponent implements DDI.PageRequirements {
  $app: TS;
  $router: DDI.Router;
  public componentWillInit(): void {
    this.$app.changeBgImage("bg1_png");
    const image = new eui.Image();
    image.source = "xuqiu_png";

    this.addChild(image);

    this.bottom = -935;
    this.horizontalCenter = 0;
    egret.Tween.get(this)
      .to({ bottom: 0 }, 1000, egret.Ease.quartOut)
      .call(() => {
        //注册一次点击
        this.stage.once(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            egret.Tween.get(this)
              .to({ bottom: -700, alpha: 0 }, 800, egret.Ease.sineIn)
              .call(() => {
                //进入下一页
                this.$router.navigate("/part-one/cake");
              });
          },
          this
        );
      });
  }
  unmounted(){

  }
  mounted(){
    
  }
}

class PartOneLabel2 extends eui.Component {
  app: App;
  router: Router;
  public content_label: eui.Label;
  constructor(app: App, router: Router) {
    super();
    this.skinName = "resource/skins/label_pangbai.exml";
    this.router = router;
    this.app = app;
    this.initUI();
  }
  public initUI() {
    this.app.changeBgImage("bg1_png");
    this.content_label.text =
      "今天，HR的同事来了解情况，请跟她一起确认这个岗位的人才画像吧！";
    //居中
    this.horizontalCenter = 0;
    this.verticalCenter = 0;
    this.bottom = 30;

    this.scaleX = this.scaleY = this.alpha = 0;
    const tweens = egret.Tween.get(this);
    tweens
      .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 600, egret.Ease.sineIn)
      .call(() => {
        this.once(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            //点击进入下一步
            this.router.navigate("/part-one/cake");
          },
          this
        );
      });
  }
}

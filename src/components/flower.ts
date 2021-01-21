class Flower extends DDI.PageComponent {
  flowerMC: egret.MovieClip;
  animationGroup: eui.Group;
  buttonGroup: eui.Group;
  componentWillInit() {
    this.skinName = "resource/skins/EndFlowerSkin.exml";
    this.horizontalCenter = 0;
    this.buttonGroup.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      () => {
        if (this.$router.activeRoute.path.indexOf("part-one") != -1) {
          //第一阶段的撒花
          this.$router.navigate("/part-two/resume");
        }
      },
      this
    );
  }
  async mounted() {
    let json = RES.getRes(`flowerOneBottom_json`);
    let img = RES.getRes(`flowerOneBottom_png`);

    let mcFactory = new egret.MovieClipDataFactory(json, img);
    this.flowerMC = new egret.MovieClip(mcFactory.generateMovieClipData());

    this.flowerMC.scaleX = this.flowerMC.scaleY = 0.8;
    this.addChild(this.flowerMC);
    // this.animationGroup.horizontalCenter = 0;
    // 当flowerMC动画调用结束后之行label的添加
    // this.flowerMC.addEventListener(egret.Event.COMPLETE, this.MovieClipComplete, this)

    this.flowerMC.gotoAndPlay("flowerOneBottom", 1);
  }
}

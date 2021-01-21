class Resume extends DDI.PageComponent {
  crossGroup: eui.Group;
  componentWillInit() {
    this.skinName = "resource/skins/Resume.exml";
  }
  async mounted() {
    await RES.loadGroup("stage-two-animation", 0);
    // let mcStr = "resume0,resume1,resume3"
    let json = RES.getRes(`resume0_json`);
    let img = RES.getRes(`resume0_png`);
    let mcFactory = new egret.MovieClipDataFactory(json, img);
    let mc = new egret.MovieClip(mcFactory.generateMovieClipData());
    mc.anchorOffsetX = -this.stage.stageWidth / 2;
    this.crossGroup.addChild(mc);
    mc.addEventListener(
      egret.Event.COMPLETE,
      () => {
        this.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            this.$router.navigate("/part-two/long-tap");
          },
          this
        );
      },
      this
    );
    mc.gotoAndPlay("resume0", 1);
  }
}

class OpenCloseDoor extends DDI.PageComponent implements DDI.PageRequirements {
  $app;
  $router;

  // 上半部分
  public topSection: eui.Group;

  public title: eui.Label;

  // 动画group
  public mcGroup: eui.Group;
  public opendoorMC: egret.MovieClip;

  public titleGroup: eui.Group;

  // 下半部分
  public bottomSection: eui.Group;

  public topSectionImg: eui.Image;
  public bottomSectionImg: eui.Image;

  public contentGroup: eui.Group;

  public tips: eui.Label;
  public tipsContent: eui.Label;

  public tipsGroup: eui.Group;

  componentWillInit() {
    this.skinName = "resource/skins/BaseEnvelope.exml";
  }
  public unmounted() {}
  public async mounted() {
    this.title.text = "面试前：招人，从定标准开始";
    this.tipsContent.text =
      "这个阶段是面试前的准备工作，作为管理者，需要提供精准的岗位信息，帮助描绘目标选才的“人才画像”。";
    this.startAnimation();
    this.$app.changeBgImage("bg1_png");

    this.initMC();
  }
  public initMC(): void {
    let json = RES.getRes("open_envelop_json");
    let img = RES.getRes("open_envelop_png");

    let mcFactory = new egret.MovieClipDataFactory(json, img);
    this.opendoorMC = new egret.MovieClip(mcFactory.generateMovieClipData());

    this.titleGroup.addChild(this.opendoorMC);

    // 设置居中
    this.opendoorMC.anchorOffsetX = -(
      egret.MainContext.instance.stage.stageWidth / 2
    );
    // 设置动画下沉
    this.opendoorMC.y = 300;
  }
  public startAnimation() {
    this.fromTop(this.topSection);
    this.fromBottom(this.bottomSection);
  }

  // 控制topSection向下运动
  private fromTop(vm): void {
    let tw = egret.Tween.get(vm);

    const getVmHeight = vm.height;
    // console.log(getVmHeight + 'this is getVmHeight')

    vm.y = -getVmHeight;

    tw.to({ y: 0 }, 700).call(() => {
      this.openEnvelop();
    });
  }
  private openEnvelop() {
    const stageNum = this.$router.activeRoute.pathParams.stageNum;
    if (stageNum == "part-one") {
      this.opendoorMC.gotoAndPlay("one", 1);
    } else if (stageNum == "part-two") {
      this.opendoorMC.gotoAndPlay("two", 1);
    }
  }
  // 控制bottomSection向上运动
  private fromBottom(vm): void {
    let tw = egret.Tween.get(vm);

    vm.bottom = -vm.height;

    tw.to({ bottom: 0 }, 700).call(() => {
      this.contentGroup.addEventListener(
        egret.TouchEvent.TOUCH_TAP,
        this.touchTap,
        this
      );
    });
  }
  // 控制topSection向上运动
  private backTop(vm): void {
    let tw = egret.Tween.get(vm);

    const getVmHeight = vm.height;

    console.log(getVmHeight);

    tw.to({ y: -getVmHeight }, 700);
  }

  // 控制bottomSection向下运动
  private backBottom(vm): void {
    let tw = egret.Tween.get(vm);

    tw.to({ bottom: -vm.height }, 700).call(() => {
      //跳转到下一个页面
      this.goToNextPage();
    });
  }

  public touchTap(): void {
    this.backTop(this.topSection);
    this.backBottom(this.bottomSection);
  }
  public goToNextPage() {
    this.$router.navigate("/part-one/label/one");
  }
}

class RectLabel extends DDI.PageComponent implements DDI.PageRequirements {
  public $app;
  public $router;
  public content_label: eui.Label;
  async componentWillInit() {
    this.skinName = "resource/skins/label_pangbai.exml";
    console.log("初始化了！");
  }
  public unmounted() {
    console.log("移除！");
    this.content_label.removeEventListener(
      egret.TouchEvent.TOUCH_TAP,
      this.handleClick,
      this
    );
  }
  public mounted() {
    console.log("加载！");
    this.$app.changeBgImage("bg1_png");
    const currentRoute = this.$router.activeRoute;
    if (currentRoute.pathParams.index === "one") {
      this.content_label.text =
        "你是一家数据服务公司的销售负责人，今年你们部门有一个【资深销售经理】的岗位急需招人。";
    } else if (currentRoute.pathParams.index === "two") {
      this.content_label.text =
        "今天，HR的同事来了解情况，请跟她一起确认这个岗位的人才画像吧！";
    }
    //居中
    this.horizontalCenter = 0;
    this.verticalCenter = 0;
    this.bottom = 30;

    this.scaleX = this.scaleY = this.alpha = 0;
    const tweens = egret.Tween.get(this);
    tweens
      .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 600, egret.Ease.sineIn)
      .call(() => {
        this.content_label.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          this.handleClick,
          this
        );
      });
  }
  public handleClick() {
    console.log("点击触发---");
    //点击进入下一步
    if (this.$router.activeRoute.pathParams.index === "one") {
      this.$router.navigate("/part-one/label/two", {
        loveyou: true,
      });
    } else {
      this.$router.navigate("/part-one/hand", {
        hateYou: true,
      });
    }
  }
}

class RectLabel extends DDI.PageComponent {
  app: App;
  router: Router;
  public content_label: eui.Label;
  public UIWillInit(){
    this.skinName = "resource/skins/label_pangbai.exml";
  }
  public mounted(){
    this.app.changeBgImage("bg1_png");
    const currentRoute = this.router.currentRoute;
    if(currentRoute.pathParams.stageNum === 'part-one'){
      switch (currentRoute.pathParams.index){
        case 'one':
          this.content_label.text = "你是一家数据服务公司的销售负责人，今年你们部门有一个【资深销售经理】的岗位急需招人。";
          break;
        case 'two':
          this.content_label.text = "今天，HR的同事来了解情况，请跟她一起确认这个岗位的人才画像吧！";
          break;
      }
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
        this.once(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            //点击进入下一步
            this.router.navigate("/part-one/label/two");
          },
          this
        );
      });
  }
}

class LongTap extends DDI.PageComponent {
  //ui:支持多个项，
  //每个项支持长按，长按以后，执行长按项的动画
  private activeTapItem:any;//表示操作循环中的项（长按、动画、抬起、回退中）
  private activeTimeStamp:number;
  private tapSuccessed:boolean;//表示是否长按成功
  UIWillInit(){
    const label = new eui.Label();
    label.text = "长按文字提示";
    this.horizontalCenter = 0;
    this.verticalCenter = 0;
    this.addChild(label);

    //生成四个tapGroup
    const tapCount = 4;
    for (var i = 0; i < tapCount; i++) {
      const group = this.generateTapGroup();
      group.y = i* (66 + 10);
      this.addChild(group);
    }
    let startTap = false;
    this.addEventListener(
      egret.TouchEvent.TOUCH_BEGIN,
      (event) => {
          if(this.tapSuccessed){
              return;
          }
        if(this.activeTapItem){
            return;
        }
        if ((event.target.name = "cover-handle")) {
          //长按开始
          //记录开始时间：
          this.activeTimeStamp = Date.now();
            this.activeTapItem = event.target.$parent.$children[1]
          egret.Tween.get(this.activeTapItem)
            .to({ percentWidth: 100 }, 500, egret.Ease.sineIn).call(()=>{
                console.log('长按成功');
                this.touchSuccess(this.activeTapItem);
                this.tapSuccessed = true;
                this.activeTapItem = null;
            })
        }
      },
      this
    );
    this.addEventListener(
      egret.TouchEvent.TOUCH_END,
      (event) => {
          if(this.tapSuccessed){
              return;
          }
        if ((event.target.name = "cover-handle") && this.activeTapItem === event.target.$parent.$children[1]) {
            egret.Tween.removeTweens(this.activeTapItem);
          egret.Tween.get(this.activeTapItem)
            .to({ percentWidth: 0 }, (Date.now() - this.activeTimeStamp), egret.Ease.sineIn).call(()=>{
                console.log('取消长按')
                this.activeTapItem = null;
                this.activeTimeStamp = null;
            })
        }
      },
      this
    );  
  }
  mounted(){
    this.horizontalCenter = -(this.stage.stageWidth/2+this.width/2);
    this.startAnimation()
  }
  startAnimation(){
    egret.Tween.get(this).to({
      horizontalCenter:0
    },450,egret.Ease.sineIn)
  }
  touchSuccess(activeTapItem){
    const animateRectBg = activeTapItem.$parent.$children[2]
    const animateRect = activeTapItem.$parent.$children[3]
    animateRect.visible = animateRectBg.visible = true;
    // animateRect.left = animateRect.right = animateRect.bottom = animateRect.top = 0;

    const tw = egret.Tween.get(animateRect);
    const newRect = new eui.Rect();
    newRect.percentWidth = 100;
    newRect.percentHeight = 100;
      //分散隐蔽光圈
      tw.to({ left: -10, right: -10, bottom: -10, top: -10, alpha: 0 }, 500, egret.Ease.sineIn).call(() =>{
        // let tw = egret.Tween.get(backRect)
        // tw.to({ alpha: 1 }, 200, egret.Ease.sineIn)
        //设置临时的三个点
        const tempLabel = new eui.Label();
        
        activeTapItem.$parent.addChild(tempLabel)

        tempLabel.text = "."
        tempLabel.textColor = 0x000000;
        tempLabel.size = 50;
        tempLabel.left = 290 ;
        setTimeout(()=>{
          tempLabel.appendText(".");
          setTimeout(()=>{
            tempLabel.appendText(".");
            //通知上层隐去整个UI层
            // egret.Tween.get(this).to({ alpha: 0 }, 350, egret.Ease.sineIn)
          },300)
        },300)
      })
  }
  generateTapGroup() {
    const group = new eui.Group();
    group.width = 580;
    group.height = 66;
    this.addChild(group);

    const rect = new eui.Rect();
    rect.name = "background";
    rect.percentWidth = 100;
    rect.percentHeight = 100;
    rect.fillColor = 0x313548;

    const rectMove = new eui.Rect();
    rectMove.name = "mask";
    rectMove.percentWidth = 0;
    rectMove.percentHeight = 100;
    rectMove.fillColor = 0x5640BC;

    const rectAnimate = new eui.Rect();
    rectAnimate.name = "animate";
    rectAnimate.left = 0;
    rectAnimate.right = 0;
    rectAnimate.top = 0;
    rectAnimate.bottom = 0;
    rectAnimate.fillColor = 0xffffff;
    rectAnimate.visible = false

    const rectAnimateBg = new eui.Rect();
    rectAnimateBg.name = "animate-bg";
    rectAnimateBg.percentWidth = 100;
    rectAnimateBg.percentHeight = 100;
    rectAnimateBg.fillColor = 0xffffff;
    
    rectAnimateBg.visible = false
    //一个遮罩层
    const coverRect = new eui.Rect();
    coverRect.percentWidth = 100;
    coverRect.percentHeight = 100;
    coverRect.alpha = 0;
    coverRect.name = "cover-handle";
    group.addChild(rect);//0
    group.addChild(rectMove);//1
    group.addChild(rectAnimateBg);//2
    group.addChild(rectAnimate);//3
    group.addChild(coverRect);//4
    return group;
  }
}

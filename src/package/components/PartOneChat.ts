class PartOneChat extends eui.Component {
  constructor(layer:eui.UILayer,router:Router) {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE,()=>{
      this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        router.navigate("/part-one/rect-label")
      },this)
    },this)
    
    //设置一个背景图
    const image = new eui.Image();
    image.source = "bg2_png";
    this.addChild(image);

    //设置聊天组件
    const chatGroup = new eui.Group();
    // chatGroup.percentWidth = 100;
    // chatGroup.percentHeight = 100;
    chatGroup.width = 500;
    chatGroup.height = 400;
    this.addChild(chatGroup);
    const rect = new eui.Rect();
    rect.fillColor = 0xffffff;
    rect.strokeWeight = 2;
    rect.ellipseWidth = 10;
    rect.ellipseHeight = 10;
    rect.strokeColor = 0x000000;
    rect.percentWidth = 100;
    rect.percentHeight = 100;
    chatGroup.bottom = 30;
    chatGroup.horizontalCenter = 0;

    chatGroup.addChild(rect);

    //按钮
    const btnGroup = new eui.Group();
    // btnGroup.height = 100;
    // btnGroup.width = 100;
    btnGroup.top = -30;
    btnGroup.right = 30;
    btnGroup.height = 60;

    const label = new eui.Label();
    label.text = " 方可哈哈哈哈可 "
    
    
    label.size  = 30;
    label.textColor = 0xff0000;
    
    label.verticalCenter = 0;
    const bgRect = new eui.Rect();
    bgRect.percentWidth = 100;
    bgRect.percentHeight = 100;
    bgRect.fillColor = 0xcccccc;
    bgRect.ellipseWidth = 10;
    bgRect.ellipseHeight = 10;

    btnGroup.addChild(bgRect)
    btnGroup.addChild(label)
    chatGroup.addChild(btnGroup);


    //聊天内容框,egret.textField
    const contentLabel = new egret.TextField();
    contentLabel.width = 400;
    contentLabel.height = 300;
    contentLabel.wordWrap = true;
    contentLabel.textColor = 0xff0000;
    contentLabel.x = 50;
    contentLabel.text = '我是一个非常。。。，，，，,,,,..。。，，，，,,,,........优。。。秀。。。的。。。男人'
    chatGroup.addChild(contentLabel);
    this.once(
      egret.Event.ADDED_TO_STAGE,
      () => {
        image.width = this.stage.stageWidth;
        image.height = this.stage.stageHeight;
        // rect.width = this.stage.stageWidth*.8;
        // rect.height = this.stage.stageHeight*.3;
      },
      this
    );

    

  }
}

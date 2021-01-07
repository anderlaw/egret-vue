class Main extends eui.UILayer {
  constructor() {
    super();
  }
  protected createChildren(): void {
    super.createChildren();

    egret.lifecycle.addLifecycleListener((context) => {
      // custom lifecycle plugin
    });

    egret.lifecycle.onPause = () => {
      egret.ticker.pause();
    };

    egret.lifecycle.onResume = () => {
      egret.ticker.resume();
    };

    //inject the custom material parser
    //注入自定义的素材解析器
    let assetAdapter = new AssetAdapter();
    egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
    egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

    this.runGame().catch((e) => {
      console.log(e);
    });
  }

  private async runGame() {
    await this.loadResource();
    this.createGameScene();

    // const result = await RES.getResAsync("description_json");
    // this.startAnimation(result);


    await platform.login();
    const userInfo = await platform.getUserInfo();
    console.log(userInfo);
  }

  private async loadResource() {
    try {
      const loadingView = new LoadingUI();
      //添加loading组件
      this.stage.addChild(loadingView);
      //加载配置文件
      await RES.loadConfig("resource/default.res.json", "resource/");
      //加载皮肤
      await this.loadTheme();
      //加载资源
      await RES.loadGroup("preload", 0, loadingView);

      //加载完毕后移除loading组件
      this.stage.removeChild(loadingView);
    } catch (e) {
      console.error(e);
    }
  }

  private loadTheme() {
    return new Promise((resolve, reject) => {
      // load skin theme configuration file, you can manually modify the file. And replace the default skin.
      //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
      let theme = new eui.Theme("resource/default.thm.json", this.stage);
      theme.addEventListener(
        eui.UIEvent.COMPLETE,
        () => {
          resolve(0);
        },
        this
      );
    });
  }

  private textfield: egret.TextField;
  /**
   * 创建场景界面
   * Create scene interface
   */
  protected createGameScene(): void {
    //应用启动器
    new App(this,Routes)
    //背景图
    // let sky = this.createBitmapByName("bg_jpg");
    // this.addChild(sky);
    // let stageW = this.stage.stageWidth;
    // let stageH = this.stage.stageHeight;


    //图形
    // let topMask = new egret.Shape();
    // topMask.graphics.beginFill(0x000000, 0.5);
    // topMask.graphics.drawRect(0, 0, stageW, 172);
    // topMask.graphics.endFill();
    // topMask.y = 33;
    // this.addChild(topMask);

    //icon图标用法
    // let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
    // this.addChild(icon);
    // icon.x = 26;
    // icon.y = 33;

 




    //按钮用法
    // let button = new eui.Button();
    // button.label = "Click!";
    // button.horizontalCenter = 0;
    // button.verticalCenter = 0;
    // button.addEventListener(
    //   egret.TouchEvent.TOUCH_TAP,
    //   this.onButtonClick,
    //   this
    // );
  }
  /**
   * name
   */
  public openPartOneChat() {}
  /**
   * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
   * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
   */
  private createBitmapByName(name: string): egret.Bitmap {
    let result = new egret.Bitmap();
    let texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
  }
  /**
   * 描述文件加载成功，开始播放动画
   * Description file loading is successful, start to play the animation
   */
  private startAnimation(result: Array<any>): void {
    let parser = new egret.HtmlTextParser();

    let textflowArr = result.map((text) => parser.parse(text));
    let textfield = this.textfield;
    let count = -1;
    let change = () => {
      count++;
      if (count >= textflowArr.length) {
        count = 0;
      }
      let textFlow = textflowArr[count];

      // 切换描述内容
      // Switch to described content
      textfield.textFlow = textFlow;
      let tw = egret.Tween.get(textfield);
      tw.to({ alpha: 1 }, 200);
      tw.wait(2000);
      tw.to({ alpha: 0 }, 200);
      tw.call(change, this);
    };

    change();
  }

  /**
   * 点击按钮
   * Click the button
   */
  private onButtonClick(e: egret.TouchEvent) {
    let panel = new eui.Panel();
    panel.title = "Title";

    //表示中心偏移
    panel.horizontalCenter = 0;
    panel.verticalCenter = 0;
    this.addChild(panel);
  }
}

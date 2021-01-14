class App extends DDI.App {
    rootLayer:eui.UILayer;//根节点，承载公共组件
    pageLayer:eui.UILayer;//承载页面容器，放置页面
    private percent:number = 0
    private _bgImage:eui.Image;
    private _progressBar:ProgressBar;
    private _percentNum:number = 0;
    UIWillInit(){
        //背景图
        this._bgImage = new eui.Image();
        this._bgImage.width = this.rootLayer.stage.stageWidth;
        this._bgImage.height = this.rootLayer.stage.stageHeight;
        this._bgImage.source = "bg1_png"
        this.rootLayer.addChild(this._bgImage)
        //页面容器
        this.rootLayer.addChild(this.pageLayer = new eui.UILayer())

        //进度条，放到上层（在页面容器的后面添加）
        this._progressBar = new ProgressBar()
        this.rootLayer.addChild(this._progressBar)
    }
    routerWillInit(){
        new Router({
            pageLayer:this.pageLayer,
            app:this,
            routes:Routes
        })
    }
    /**
     * 
     * @param imgName 图片名称
     */
    public changeBgImage(imgName:string){
        this._bgImage.source = imgName
    }
    /**
     * 切换进度条
     */
    public toggleTopBarVisible(visible:boolean){
        this._progressBar.visible = visible
    }
    public async routeWillRender(path,next){
        //资源加载
        if(path.indexOf('part-one') != -1){
            await RES.loadGroup("stage-one-animation", 0);
        }else if(path.indexOf("part-two") !== -1){
            await RES.loadGroup("stage-two-animation", 0);
        }
        
        //初始化进度条

        //页面首次加载
        console.log(path);
        next()
    }
    public routeWillChange(path,next){
        this._progressBar.changePercent(this.percent+=4)
        console.log(path);
        next()
    }
}
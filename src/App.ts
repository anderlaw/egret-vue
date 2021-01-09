class App{
    public layer:eui.UILayer;//根节点，承载公共组件
    public container:eui.UILayer;//承载页面容器，放置页面
    private _bgImage:eui.Image;
    private _progressBar:ProgressBar;
    private _percentNum:number = 0;
    /**
     * 将实例化过的view缓存处理，方便下次直接打开
     */
    private _route:Array<any>;
    constructor(layer:eui.UILayer,routes:Array<any>){
        this.layer = layer;

        //背景图
        this._bgImage = new eui.Image();
        this._bgImage.width = layer.stage.stageWidth;
        this._bgImage.height = layer.stage.stageHeight;
        this.layer.addChild(this._bgImage)

        

        //页面容器
        this.layer.addChild(this.container = new eui.UILayer())
        new Router(this,routes)

        //进度条，放到上层（在页面容器的后面添加）
        this._progressBar = new ProgressBar()
        this.layer.addChild(this._progressBar)
        
    }
    /**
     * 
     * @param imgName 图片名称
     */
    public changeBgImage(imgName:string){
        this._bgImage.source = imgName
    }
    /**
     * 
     * @param path 新页面的path
     */
    public routeChanged(hashRoute){
        this._percentNum += 4;
        this._progressBar.changePercent(this._percentNum)
        console.log(hashRoute)
    }
}
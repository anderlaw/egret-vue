class App{
    public layer:eui.UILayer;
    public router:Router;
    /**
     * 将实例化过的view缓存处理，方便下次直接打开
     */
    private _route:Array<any>;
    constructor(layer:eui.UILayer,routes:Array<any>){
        this.layer = layer;
        this.router = new Router(layer,routes)
    }
}
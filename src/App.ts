class App extends DDI.App implements DDI.AppRequirements{
    $router:DDI.Router
    bgImg:eui.Image;
    beforeEach(from: string, to: string,next){
        console.log(from)
        console.log(to)
        next();
    }
    AppInited(){
        console.log(this.$router)
        //添加背景图
        this.bgImg = new eui.Image();
        this.bgImg.width = this.$baseLayer.stage.stageWidth
        this.bgImg.height = this.$baseLayer.stage.stageHeight
        this.bgImg.source = "bg2_png"
        this.$baseLayer.addChild(this.bgImg)
    }
    public beforefirstScreenRender(path,next){
        next();
    }

    afterEach(){

    }
    changeBgImage(imgName){
        this.bgImg.source = imgName
    }
}
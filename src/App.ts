class App extends DDI.App implements DDI.AppRequirements{

    beforeEach(from: string, to: string,next){
        console.log(from)
        console.log(to)
        next();
    }
    AppInited(){
        //添加背景图
        const bgImg = new eui.Image();
        bgImg.width = this.$baseLayer.stage.stageWidth
        bgImg.height = this.$baseLayer.stage.stageHeight
        bgImg.source = "bg2_png"
        this.$baseLayer.addChild(bgImg)
    }
    public beforefirstScreenRender(path,next){
        next();
    }

    afterEach(){

    }
}
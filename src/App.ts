class TS extends DDI.App implements DDI.AppRequirements{
    $baseLayer:eui.UILayer;//底层节点，承载低层级组件
    $pageLayer:eui.UILayer;//页面节点，承载页面组件
    $popLayer:eui.UILayer;//上层节点，承载高层级组件

    private percent:number = 0
    private _bgImage:eui.Image;
    private _progressBar:ProgressBar;
    private _percentNum:number = 0;

    //全局对象
    public global:{
        userId?:number,
        simulationId?:number,
        cardId?:number,
        [questionId:number]:any,//问题详情记录
    };
    public savePoint:{
        percentNum?:number,
        path?:string,
        sceneReviewString?:string,
    }
    public AppInited(){
        //初始化全局变量 
        this.global = {}
        this.savePoint = {
            percentNum:0,
            path:"",
            sceneReviewString:""
        }

        //底层容器：背景图

        this._bgImage = new eui.Image();
        this._bgImage.width = this.$baseLayer.stage.stageWidth;
        this._bgImage.height = this.$baseLayer.stage.stageHeight;

        this.$baseLayer.addChild(this._bgImage)


        //进度条，放到上层容器
        this._progressBar = new ProgressBar()
        this.$popLayer.addChild(this._progressBar)
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

    //获取location包含的元数据并缓存
    private mathSaveUserInfoInUrl() {
        //从location中获取用户元信息
        const url = location.href as any;
        const matchGroupIter = url.matchAll(/(\w+)=(\w*)/g);
        // matchGroupIter
        let nextRes: any;
        let userInfoObj = { userId: "", token: "", simulationId: "" };
        while ((nextRes = matchGroupIter.next()) && !nextRes.done) {
          const key = nextRes.value[1];
          const value = nextRes.value[2];
          //将捕获到的元信息记录到Global里
          this.global[key] = value;
        }
    }
    //check if there is an existing simulation card and save information，if not create it
    private checkThenCreateCard() {
        return new Promise((resolve,rej)=>{
            //检查流水卡
            const simulationId = this.global.simulationId;
            const userId = this.global.userId;
            Api.Simulation.checkCard(simulationId, userId).then((response) => {
                if (response) {
                    //存在，保存cardId,根据保存点跳转页面
                    let localRes = response as any;
                    this.global.cardId = localRes.id;

                    const savePoint = localRes.savePoint && JSON.parse(localRes.savePoint);
                    if (savePoint) {
                        //缓存从服务端获取的保存信息
                        this.savePoint.percentNum = savePoint.percentNum;
                        this.savePoint.path = savePoint.path;
                        this.savePoint.sceneReviewString = savePoint.sceneReviewString;
                    }

                    //完毕
                    resolve(0)
                } else {
                    //不存在。新建流水卡
                    Api.Simulation.createCard(simulationId,userId).then((response) => {
                        let localRes = response as any;
                        this.global.cardId = localRes.id;

                        //完毕
                        resolve(0)
                    });
                }
            });
        })
    }

    public async beforefirstScreenRender(path,next){
        //资源加载
        if(path.indexOf('/part-one') === 0){
            await RES.loadGroup("stage-one-animation", 0);
        }else if(path.indexOf("/part-two") === 0){
            await RES.loadGroup("stage-two-animation", 0);
        }
        //保存url里的元数据（simulationId,userId等）
        this.mathSaveUserInfoInUrl();
        //初始化保存点
        await this.checkThenCreateCard()
        //初始化进度条
        this._progressBar.changePercent(this.savePoint.percentNum)
        //页面首次加载
        // next(this.savePoint.path)
        next();
        console.log('首屏加载-->',path)
        this.changeBgImage("bg2_png")
    }
    /**
     * 每次路由变化前
     */
    public beforeEach(path:string,payload:any,next: () => void){
        console.log('beforeEach')
        console.log(path)
        console.log(payload)
        next()
    }
    /**
     * 路由变化后
     */
    public afterEach(path:string){
        console.log('afterEach')
        console.log(path)
    }
}
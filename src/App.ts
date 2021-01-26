class App extends Base.App implements Base.AppRequirements{
    bgImg:eui.Image;
      //全局对象
    public global: {
        userId?: number;
        simulationId?: number;
        cardId?: number;
        [questionId: number]: any; //问题详情记录
    };
    public savePoint: {
        percentNum?: number;
        path?: string;
        sceneReviewString?: string;
      };
    public AppInited(){
        //初始化全局变量
        this.global = {};
        this.savePoint = {
          percentNum: 0,
          path: "",
          sceneReviewString: "",
        };
        //应用初始化
        this.bgImg = new eui.Image();
        this.bgImg.source = "bg2_png";
        this.$baseLayer.addChild(this.bgImg);
    }
    public beforeEach(from,to,next,payload){
        console.log(from)
        console.log(to)
        console.log(payload);
        next()
    }
    public afterEach(path){

    }
    public async beforefirstScreenRender(path,next){

        //保存url里的元数据（simulationId,userId等）
        this.mathSaveUserInfoInUrl();
        //初始化保存点
        await this.checkThenCreateCard();
        console.log(path);
        // /part-one/label
        next()
    }
    public changeBgImage(bgSource){
        this.bgImg.source = bgSource;
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
  private async checkThenCreateCard() {
    return new Promise((resolve, rej) => {
      //检查流水卡
      const simulationId = this.global.simulationId;
      const userId = this.global.userId;
      Api.Simulation.checkCard(simulationId, userId).then((response) => {
        if (response) {
          //存在，保存cardId,根据保存点跳转页面
          let localRes = response as any;
          this.global.cardId = localRes.id;

          const savePoint =
            localRes.savePoint && JSON.parse(localRes.savePoint);
          if (savePoint) {
            //缓存从服务端获取的保存信息
            this.savePoint.percentNum = savePoint.percentNum;
            this.savePoint.path = savePoint.path;
            this.savePoint.sceneReviewString = savePoint.sceneReviewString;
          }

          //完毕
          resolve(0);
        } else {
          //不存在。新建流水卡
          Api.Simulation.createCard(simulationId, userId).then((response) => {
            let localRes = response as any;
            this.global.cardId = localRes.id;

            //完毕
            resolve(0);
          });
        }
      });
    });
  }

}
class HeartBeat extends SingtonClass {
  private testAppID: string = "1739e28a7bc100";
  private UATAppID: string = "";
  private host:string = "http://lrs-test.transtalent.cn"

  private appId: string = "";
  private durationSeconds: number;
  private heatBeatData:any = {};
  private Timer = null;
  public constructor() {
    super();
    //默认测试ID
    this.appId = this.testAppID;
    //初始化心跳数据
    this.initHeatData();

  }
  private initHeatData(){
    switch(ENV) {
      case "dev": this.host = "http://lrs-test.transtalent.cn"; break;
      case "uat": this.host = "http://lrs-uat.transtalent.cn"; break;
      case "debug": this.host = "http://lrs-test.transtalent.cn"; break;
      case "1": this.host = "http://lrs-pre.transtalent.cn"; break;
      default: console.log('here run default');
    }
    //正则 拿url中的userID和learningPathMetaId
    const takeUserIdReg = /userId=(\d+)/
    const takeLearningPathMetaIdReg = /learningPathMetaId=(\d+)/
    const userId = location.href.match(takeUserIdReg)[1];
    const learningPathMetaId = location.href.match(takeLearningPathMetaIdReg)[1];

    this.heatBeatData['appName'] = window['appName'] || "transtalent"; //appName
    this.heatBeatData['appId'] = this.appId; //appId
    this.heatBeatData['appVersion'] = window['appVersion'] || "ts-egret-v1.0.0"; //appName
    this.heatBeatData['actionId'] = "1000"; //心跳ID
    this.heatBeatData['actionContext'] = ""; //心跳上下文
    this.heatBeatData['actionContext'] = ""; //心跳上下文
    this.heatBeatData['objectIds'] = [location.pathname]; //路径
    this.heatBeatData['result'] = ""; //路径
    this.heatBeatData['userId'] = userId || ""; //userId
    this.heatBeatData['learningPathMetaId'] = learningPathMetaId || ""; //learningPathMetaId
    //客户端信息
    this.heatBeatData['clientInfo'] = {
      referrer:document.referrer,//来源
      timeOpened:new Date().getTime(), //客户端时间戳
      timezone:new Date().getTimezoneOffset(),//本地时间与 GMT 时间之间的时间差
      pageon: location.pathname,
      previousSites:history.length,//历史堆栈的数量
      browserName:navigator.appName,//浏览器名称
      browserEngine:navigator.product,//引擎
      browserVersion1a:navigator.appVersion,//浏览器版本
      browserVersion1b:navigator.userAgent,//用户代理
      browserLanguage:navigator.language,//语言
      browserOnline:navigator.onLine,//是否在线
      browserPlatform:navigator.platform,//平台
      javaEnabled:navigator.javaEnabled(),
      dataCookies:(document.cookie.match(/[^\s;]+/g) || []).map(item=>encodeURI(item)),//cookie
      sizeScreenW : screen.width, //显示器尺寸
      sizeScreenH : screen.height, //显示器尺寸
      sizeDocW : document.documentElement.clientWidth,//页面可视区的宽度
      sizeDocH : document.documentElement.clientHeight, //页面可视区的高度
      sizeInW :window.innerWidth, //窗口的宽度
      sizeInH : window.innerHeight,//窗口的高度
      
      sizeAvailW:screen.availWidth, //浏览器的屏幕的可用宽度
      sizeAvailH:screen.availHeight ,//浏览器的屏幕的可用高度
      scrColorDepth:screen.colorDepth,  //设备调色板比特深度
      scrPixelDepth: screen.pixelDepth,//屏幕色彩分辨率

      //地理位置信息
      latitude:"",
      longitude:"",
      accuracy:"",
      altitude:"",
      altitudeAccuracy:"",
      heading:"",
      speed:""
    }; 
    this.getLocation().then(geolocationResult =>{
      const geolocation = (geolocationResult as any);
      this.heatBeatData['clientInfo']['latitude'] = geolocation.coords.latitude.toString();//纬度
      this.heatBeatData['clientInfo']['longitude'] = geolocation.coords.longitude.toString() ;//经度
      this.heatBeatData['clientInfo']['accuracy'] = geolocation.coords.accuracy.toString() ;//精准度
      this.heatBeatData['clientInfo']['altitude'] = geolocation.coords.altitude.toString() ;//海拔
      this.heatBeatData['clientInfo']['altitudeAccuracy'] = geolocation.coords.altitudeAccuracy.toString() ;//海拔精准度
      this.heatBeatData['clientInfo']['heading'] = geolocation.coords.heading.toString() ;//方向
      this.heatBeatData['clientInfo']['speed'] = geolocation.coords.speed.toString() ;//速度
    })
  }
  private updateRealtimeData(){
    this.heatBeatData['clientInfo']['timestamp'] = new Date().getTime();
  }
  private getLocation(){
    return new Promise((resolve, reject )=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          resolve(position);
        }, error =>{
          reject(error);
        });
      }else{
        reject({
          "code": 1,
          "message": "当前浏览器不支持geolocation定位"
        });
      }
    });
  }
  private getDuration() {
    return HttpService.get(`${this.host}/v1/configuration/${this.appId}`, {}).then(
      (response) => {
        this.durationSeconds = (response as any).appTimeInterval;
      }
    );
  }
  private sendData(){
    HttpService.post(`${this.host}/v1/heartbeat/`,this.heatBeatData);
  }
  public begin() {
    //1.获取间隔
    //2.每隔间隔时间收集数据,并发送服务器

    this.getDuration().then(() => {
      this.Timer = setInterval(()=>{
        //更新即时数据
        this.updateRealtimeData();
        //发送数据
        this.sendData()
      },this.durationSeconds*1000)
    });
  }
  public stop(){
    clearInterval(this.Timer)
  }
}

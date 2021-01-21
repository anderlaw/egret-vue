/**
* 网络公共类
* Http.requestInterceptor     请求拦截钩子
* Http.responseInterceptor    响应拦截钩子
* Http.get                    
* Http.post
* Http.request                 
*/

declare let DDIBASEURL: string

DDIBASEURL = 'm-dev.transtalent.cn'

switch(ENV) {
  case "dev": DDIBASEURL = 'm-dev.transtalent.cn'; break;
  case "uat": DDIBASEURL = 'm-uat.transtalent.cn'; break;
  case "debug": DDIBASEURL = 'm-dev.transtalent.cn'; break;
  case "1": DDIBASEURL = 'm-1.transtalent.cn'; break;
  case "prod": DDIBASEURL = 'm.transtalent.cn'; break;
  default: console.log('here run default');
}
class HttpService {
  //钩子函数，推荐在main.ts初始化，可覆盖
  public static requestInterceptor(request) {
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Authentication", "40880f979abe4632be8dc24bb20f17e0");
    return request;
  };

  public static responseInterceptor(response) {
    return response;
  };

  public static index: number = 0;
  // public static BaseUrl: string = 'http://customer-1.transtalent.cn/ddimanage/ddi'
  // public static BaseUrl: string = 'http://192.168.101.236:9782'

  public static BaseUrl: string = `${location.protocol}//${DDIBASEURL}/sim`
  public static req: Array<egret.HttpRequest> = []

  public static timeOut: number = 10000;

  /**
       * GET请求
       * @param        {string}        url                                请求URL
       * @param        {object}        data                            请求数据``
       * @param        {function}        backFun(err, data)  回调函数
       */
  public static get(url: string, data: Object) {
    return this.request({
      url: url,
      data: data,
      type: egret.HttpMethod.GET
    })
  }

  /**
       * POST请求
       * @param        {string}        url                                请求URL
       * @param        {object}        data                            请求数据``
       * @param        {function}        backFun(err, data)  回调函数
       */
  public static post(url: string, data: Object) {
    return this.request({
      url: url,
      data: data,
      type: egret.HttpMethod.POST
    })
  }

  public static put(url: string, data: object) {
    return this.request({
      url: url,
      data: data,
      type: "put"
    })
  }

  /**
       * REQUEST请求
       * @param        {string}        url                                请求URL
       * @param        {object}        data                            请求数据
       * @param        {function}        backFun(err, data)  回调函数
   * @param        {string}        type                            请求方式
       */
  // public static request(url: string, data: Object, type: string = egret.HttpMethod.POST) {
  public static request(obj: any) {

    let index = this.index

    let time = {
      times: 0,
      success: false
    }
    return new Promise((resolve, reject) => {
      let req: egret.HttpRequest = new egret.HttpRequest();
      req.responseType = egret.HttpResponseType.TEXT;

      if (this.requestInterceptor && typeof this.requestInterceptor === 'function') {
        req = this.requestInterceptor(req)
      }

      this.switchType(obj, req, time, reject)
      req.addEventListener(egret.Event.COMPLETE, this.onComplete.bind(this,resolve, req, time), this);
      // req.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onComplete.bind(this,resolve, req, time), this);
      req.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError.bind(this, reject, req, obj, time), this);
      req.addEventListener(egret.ProgressEvent.PROGRESS, onProgress, this);

      function onProgress(event: egret.ProgressEvent): void {
        //console.log("request progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
      }

      this.index++;
    })
  }

  private static switchType(obj, req, time, reject): void {
    const isAbsoluteUrl = /^(http|https)/.test(obj.url)
    if (this.passService(obj.url) || isAbsoluteUrl) {
    } else {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        if (!req.response) {
          // App.PopUp.loading(App.StageUtils.getStage(), 'loading...', 0.00000001)
        }
      }, 1000);
    }

    let { url, data, type } = obj
    type = type.toUpperCase()
    switch (type) {
      case egret.HttpMethod.POST:
        req.open(isAbsoluteUrl ? url:this.BaseUrl + url, type);
        req.send(this.formatData(data, type));
        break;
      case egret.HttpMethod.GET:
        req.open( (isAbsoluteUrl ? url:this.BaseUrl + url ) + this.formatData(data, type), type);
        req.send();
        break;
      case "PUT":
        req.open(this.BaseUrl + url, type);
        req.send(this.formatData(data, type));
    }

    let timer: egret.Timer = new egret.Timer(this.timeOut, 1);
    timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
      if (!time.success && time.times < 3) {
        time.times++
        this.switchType(obj, req, time, reject)
      }
    }, this)
    timer.start()

  }

  private static formatData(data: Object, type: string): string {
    let params: string = '';
    for (let key of Object.keys(data)) {
      if (params.length > 0) {
        params = `${params}&`
      }
      params += `${key}=${data[key]}`
    }
    switch (type) {
      case egret.HttpMethod.POST:
        params = JSON.stringify(data);//json時启用
        break;
      case egret.HttpMethod.GET:
        if (params.length > 0)
          params = `?${params}`
        break;
      case "PUT": 
        params = JSON.stringify(data);//json時启用
        break;
    }
    return params
  }

  /**
   * 请求成功回调
   * @param resolve 
   */
  private static onComplete(resolve: any, req: egret.HttpRequest, time: any) {
    //兼容后端什么都不返回的case，JSON格式默认返回的是空字符串
    let localRes = req.response;
    localRes === "" && (localRes = "null")
    var Datas = JSON.parse(localRes);
    if (this.responseInterceptor && typeof this.responseInterceptor === 'function') {
      Datas = this.responseInterceptor(Datas)
    }
    time.success = true;
    // App.PopUp.hideLoadingfalse();
    resolve(Datas)
  }

  /**
   * 请求失败回调
   * @param reject 
   */
  private static onIOError(reject: any, req: egret.HttpRequest, obj: any, time: any) {
    // 请求失败重新请求
    if (time.times < 3) {
    } else {
      if (!this.passService(obj.url)) {
        // App.PopUp.hideLoading()
        // App.PopUp.poptips(App.StageUtils.getStage(), '网络信号差，请等待网络正常后点击页面即可刷新')
      }
    }
  }

  /**
   * 跳过请求拦截
   */

  public static passService(url): boolean {
    return ( (/^\/v1\/simulation\/card/).test(url) && !(/calc_ka$/).test(url) || /^\/v1\/simulation\/saveScenarioReview/.test(url)) || /^\/v1\/configuration\//.test(url) || /^\/v1\/simulation\/\d*\/currentCard/.test(url)
  }
}
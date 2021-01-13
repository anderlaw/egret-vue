class Router extends DDI.Router{
    routeWillChange(path,next){
        console.log(path);
        next()
    }
    routeWillInited(path,next){
        console.log('页面初始化',path)
        next("/part-one/label/one")
    }
}
class Router extends DDI.Router{
    routeWillChange(path,next){
        console.log(path);
        next()
    }
    routeWillInit(path,next){
        console.log('页面初始化',path)
        next()
        // next("/part-one/label/one")
    }
}
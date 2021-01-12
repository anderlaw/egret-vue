class Router extends DDI.Router{
    routeWillChange(path,next){
        console.log(path);
        next()
    }
    routerInited(){
    }
}
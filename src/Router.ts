class Router extends DDI.Router{
    routeWillChange(path,next){
        console.log(path);
        next()
    }
    routerWillInit(){
        this.navigate('/part-one/label1')
    }
}
class Router{
    private routes:Array<any>;
    private registers:Array<any>;
    constructor(routes){
        this.routes = routes;

        //监听变化，遍历执行
        window.addEventListener("hashchange", () => {
            // console.log("The hash has changed!");
            this.registers && this.registers.forEach(fn=>fn())
        });
    }
    /**
     * 负责改变url路径
     * @param route 路径数组
     */
    navigate(route:Array<string>,queryParams:any = {}){
        //处理query
        let queryStr = "?"
        for(let key in queryParams){
            queryStr += `${key}=${queryParams[key]}&`
        }
        queryStr = queryStr.slice(0,queryStr.length-1);


        //拼接路径
        const routePath = route.join("/")+queryStr;
        location.href = location.href.split("#")[0]+routePath
    }
    /**
     * 监听hash变化
     */
    listen(callback){
        //空校验
        !this.registers && (this.registers = [])

        //去重判断
        this.registers.indexOf(callback) === -1 && this.registers.push(callback);
    }
}
//注册路由组件
//根据路由导航到组件，然后将组件添加到layer里。


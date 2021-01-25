namespace DDI {
    interface paramType {
        el:eui.UILayer,//挂载节点
        routes:Array<any>,//路由配置集合
    }
    export interface AppRequirements{
        /**
         * APP初始化完成
         */
        AppInited:()=>void,
        /**
         * 页面首次加载之前
         */
        beforefirstScreenRender:(path:string,next:(replacedPath?:string)=>void)=>void,
        /**
         * 路由变化前
         * @from 当前路由
         * @to 目标路由
         * @next 执行函数
         * @payload 导航荷载
         */
        beforeEach:(from:string,to:string,next: () => void,payload?:any)=>void,
        /**
         * 路由变化后
         */
        afterEach:(path:string)=>void
    }
    //提供一些基类，封装既定的方法方便子类继承使用
    export class App{
        $baseLayer:eui.UILayer;//底层容器
        $pageLayer:eui.UILayer;//页面层容器
        $popLayer:eui.Group ;//上层容器

        constructor(params:paramType){
            //1.初始化视图层、路由配置
            params.el.addChild(this.$baseLayer = new eui.UILayer());
            params.el.addChild(this.$pageLayer = new eui.UILayer());
            params.el.addChild(this.$popLayer = new eui.Group());

            //将层级容器添加到根节点
            new DDI.Router({
                el:this.$pageLayer,
                app:this,
                routes:params.routes
            })
        }

    }
}
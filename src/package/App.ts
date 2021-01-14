namespace DDI {
    interface paramType {
        rootLayer:eui.UILayer,//根节点
        DOMLayer:HTMLElement,//DOM层
        global:{[propName:string]:any}
    }
    
    //提供一些基类，封装既定的方法方便子类继承使用
    export class App{
        rootLayer:eui.UILayer;
        DOMLayer:HTMLElement;
        global:{[propName:string]:any};//全局对象
        constructor(params:paramType){
            this.rootLayer = params.rootLayer;
            this.DOMLayer = params.DOMLayer;
            this.global = params.global;
            //1
            this.UIWillInit();
            //2
            this.routerWillInit();
        }
    
        /**
         * 路由初始化入口
         */
        routerWillInit(){
    
        }
        /**
         * UI初始化入口
         */
        UIWillInit(){
    
        }
        /**
         * 路由变化的钩子
         */
        public routeWillChange(path: string, next: () => void) {}
        /**
         * 页面首次加载时渲染路由
         */
        public routeWillRender(path:string,next:(replacedPath?:string)=>void){

        }
    }
}
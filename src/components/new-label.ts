class RectLabel extends DDI.PageComponent implements DDI.PageRequirements{
    public $router;
    public content_label: eui.Label;
    componentWillInit(){
        console.log(this.$router.activeRoute)
        this.skinName = "resource/skins/label_pangbai.exml";
        //居中
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
        this.bottom = 30;


        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handleTapEvent,this)
    }
    mounted(){
        if(this.$router.activeRoute.pathParams['stage-num'] === 'part-one'){
            this.content_label.text = "part-one!"
        }else{
            this.content_label.text = "part-two!"
        }
    }
    unmounted(){

    }
    handleTapEvent(){
        if(this.$router.activeRoute.pathParams['stage-num'] === 'part-one'){
            alert('第一阶段')
            this.$router.navigate('/part-two/label/one')
        }else{
            
        }
    }
}
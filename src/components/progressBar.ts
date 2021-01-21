class ProgressBar extends eui.Component {
    private percent_label:eui.Label;
  constructor() {
    super();
    this.skinName = "resource/skins/progress_bar.exml";
  }
  public changePercent(percentNum:number){
      this.percent_label.text = percentNum + '%';
  }
}

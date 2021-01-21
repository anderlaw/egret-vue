class Repeat extends DDI.PageComponent {
  public $router;
  public $app;
  public group: eui.Group;
  public placeHolderLabel: eui.Label;
  public contentLabel: eui.Label;
  public content: string;
  private timer: any;

  private questionId: number | string;
  private optionId: number | string;
  componentWillInit() {}
  startTypeEffect(content) {
    const textArr = content.split("");
    let letter = "";
    this.timer = setInterval(() => {
      letter = textArr.splice(0, 1);
      if (letter !== "") {
        this.contentLabel.appendText(letter);
      } else {
        clearInterval(this.timer);
      }
    }, 80);
    //添加点击快速填满文字效果
    this.group.once(
      egret.TouchEvent.TOUCH_TAP,
      () => {
        clearInterval(this.timer);
        this.contentLabel.text = this.content;
        //第二次点击跳转页面
        this.group.once(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            this.$router.navigate(
              `/part-one/npc/${this.questionId}/${this.optionId}`
            );
          },
          this
        );
      },
      this
    );
  }
  async mounted() {
    this.$app.changeBgImage("bg2_png");
    //根据路径参数mock答题，获取详情
    const questionId = (this.questionId = this.$router.activeRoute.pathParams.questionId);
    const optionId = (this.optionId = this.$router.activeRoute.pathParams.optionId);
    console.log(questionId, optionId);

    //先检查回答详情的缓存，没有则调取mock接口
    if (!this.$app.global[questionId]) {
      this.$app.global[questionId] = await Api.Simulation.mockAnswerQuestion(
        {
          simulationId: this.$app.global.simulationId,
          cardId: this.$app.global.cardId,
          questionId: questionId,
        },
        {
          answers: [optionId],
        }
      );
    }

    //根据答题详情，渲染聊天框
    const answerDetail = this.$app.global[questionId];
    console.log(answerDetail);
    const content = answerDetail.thisQuestion.yySimulationOptionsList.find(
      (item) => item.id == answerDetail.yourAnswers[0]
    ).optionDesc;
    this.initChatBox(content);
  }
  public initChatBox(content) {
    //remove all existing child nodes
    this.removeChildren();

    this.content = content;

    this.bottom = 50;
    this.horizontalCenter = 0;

    //创建元素,580
    const group = (this.group = new eui.Group());
    group.width = 580;
    group.horizontalCenter = 0;

    //占位文本
    const placeHolderLabel = (this.placeHolderLabel = new eui.Label());
    placeHolderLabel.name = "placeholder-label";
    placeHolderLabel.width = 540;
    placeHolderLabel.wordWrap = true;
    placeHolderLabel.left = placeHolderLabel.top = placeHolderLabel.right = placeHolderLabel.bottom = 50;
    placeHolderLabel.lineSpacing = 20;
    placeHolderLabel.size = 28;
    placeHolderLabel.textColor = 0x4a4a4a;
    placeHolderLabel.text = content;
    group.addChild(placeHolderLabel);

    //矩形
    const rect = new eui.Rect();
    rect.percentWidth = 100;
    rect.percentHeight = 100;
    rect.fillColor = 0xffffff;
    rect.ellipseWidth = 20;
    rect.ellipseHeight = 20;
    group.addChild(rect);

    //真正的文本标签
    const contentLabel = (this.contentLabel = new eui.Label());
    contentLabel.name = "content-label";
    contentLabel.width = 540;
    contentLabel.wordWrap = true;
    contentLabel.left = contentLabel.top = contentLabel.right = contentLabel.bottom = 50;
    contentLabel.lineSpacing = 20;
    contentLabel.size = 28;
    contentLabel.textColor = 0x4a4a4a;
    group.addChild(contentLabel);

    //namegroup
    const nameGroup = new eui.Group();
    nameGroup.left = 20;
    nameGroup.top = -20;
    const nameRect = new eui.Rect();
    nameRect.percentWidth = 100;
    nameRect.percentHeight = 100;
    nameRect.fillColor = 0x5ab8c4;
    nameRect.ellipseWidth = 10;
    nameRect.ellipseHeight = 10;
    nameGroup.addChild(nameRect);
    const nameLabel = new eui.Label();
    nameLabel.left = nameLabel.top = nameLabel.right = nameLabel.bottom = 10;
    nameLabel.text = "我";
    nameGroup.addChild(nameRect);
    nameGroup.addChild(nameLabel);
    group.addChild(nameGroup);

    this.addChild(group);

    //延迟600ms 等待占位符渲染完毕后，采集其渲染结果，实现单词折行（不排除不成功的可能性）
    setTimeout(() => {
      const linesExecptLastLine = (this
        .placeHolderLabel as any).textNode.drawData.filter(
        (key) => typeof key === "string"
      );
      console.log(linesExecptLastLine);
      const originWords = linesExecptLastLine.join("");
      const changedWords = linesExecptLastLine.join("\n");

      let realContent = this.content.replace(originWords, changedWords);
      if (linesExecptLastLine.length === 0) {
        realContent = this.content;
      }
      this.startTypeEffect(realContent);
    }, 600);
  }
  unmounted() {
    //移除监听
  }
}

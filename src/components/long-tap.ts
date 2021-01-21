class LongTap extends DDI.PageComponent {
  //ui:支持多个项，
  //每个项支持长按，长按以后，执行长按项的动画
  private activeTapItem: any; //表示操作循环中的项（长按、动画、抬起、回退中）

  private tapSuccessed: boolean; //表示是否长按成功

  private itemGroup: eui.Group; //盛放长按项的组
  private tapStatus: "ready" | "tapping" | "cancel" | "succeed" = "ready";
  private maskInTapping: eui.Rect; //长按中的矩形
  private tapTimeStamp: number;

  public $app;
  public $router;

  private currentQuestionId: number | string;
  private optionList: Array<any>;
  componentWillInit() {
    this.$app.changeBgImage("bg2_png");
    const label = new eui.Label();
    label.text = "长按文字提示";
    this.horizontalCenter = 0;
    this.addChild(label);

    this.itemGroup = new eui.Group();
    this.bottom = 50;
    this.addChild(this.itemGroup);

    this.addEventListener(
      egret.TouchEvent.TOUCH_BEGIN,
      (event) => {
        console.log("事件触发");
        console.log(this.tapStatus);
        //if in tapping Or tapped succeed ,then return
        if (this.tapStatus !== "ready") {
          return;
        }
        if ((event.target.name = "handler")) {
          //长按开始并记录开始时间：
          this.tapStatus = "tapping";
          this.tapTimeStamp = Date.now();
          //计算长按的索引号
          const index = this.itemGroup.$children.indexOf(event.target.$parent);

          const maskRect = (this.maskInTapping = event.target.$parent.$children.find(
            (rect) => rect.name === "mask"
          ));
          const contentLabel = event.target.$parent.$children.find(
            (rect) => rect.name === "content-label"
          );
          egret.Tween.get(maskRect)
            .to({ percentWidth: 100 }, 500, egret.Ease.sineIn)
            .call(() => {
              maskRect.visible = false;
              contentLabel.visible = false;
              this.tapStatus = "succeed";
              this.typeSucceed(index);
              this.afterTypedAnimationStart(maskRect, index);
            });
        }
      },
      this
    );
    this.addEventListener(
      egret.TouchEvent.TOUCH_END,
      (event) => {
        //处理取消长按
        if (
          (event.target.name = "cover-handle") &&
          this.tapStatus === "tapping"
        ) {
          this.tapStatus = "cancel"; //取消中
          egret.Tween.removeTweens(this.maskInTapping);
          egret.Tween.get(this.maskInTapping)
            .to(
              { percentWidth: 0 },
              Date.now() - this.tapTimeStamp,
              egret.Ease.sineIn
            )
            .call(() => {
              this.tapStatus = "ready";
              this.maskInTapping = null;
            });
        }
      },
      this
    );
  }
  async mounted() {
    //判断是根节点还是
    console.log(this.$router.activeRoute.pathParams);
    if (this.$router.activeRoute.pathParams.questionId === "stage-1") {
      const questionInfo = await Api.Simulation.getRootQuestion(
        this.$app.global.simulationId,
        1
      );
      this.currentQuestionId = questionInfo.simulationQuestionId;
    } else if (this.$router.activeRoute.pathParams.questionId === "stage-2") {
      const questionInfo = await Api.Simulation.getRootQuestion(
        this.$app.global.simulationId,
        3
      );
      this.currentQuestionId = questionInfo.simulationQuestionId;
    } else {
      this.currentQuestionId = this.$router.activeRoute.pathParams.questionId;
    }
    //题干
    const detailRes = await Api.Simulation.getQuestionDetail(
      this.currentQuestionId
    );
    const optionList = (this.optionList = detailRes.yySimulationOptionsList);

    // this.questionId = questionInfo.simulationQuestionId;
    this.initLongTapItems(optionList, "optionDesc");
    //入场动画
    this.enterAnimationStart();
  }
  async typeSucceed(typeItemIndex) {
    console.log("长按成功的索引号");
    console.log(typeItemIndex);
    //处理完答题逻辑后，开始立场动画
    let res = await Api.Simulation.answerQuestion(
      {
        simulationId: this.$app.global.simulationId,
        cardId: this.$app.global.cardId,
        questionId: this.currentQuestionId,
      },
      {
        answers: [this.optionList[typeItemIndex].id],
      }
    );
    //离场动画
    this.leaveAnimationStart(() => {
      this.tapStatus = "ready";
      this.$router.navigate(
        `/part-one/repeat/${this.currentQuestionId}/${this.optionList[typeItemIndex].id}`
      );
    });
  }
  /**
   * 入场动画（启动动画）
   */
  enterAnimationStart() {
    egret.Tween.get(this).to(
      {
        horizontalCenter: 0,
      },
      450,
      egret.Ease.sineIn
    );
  }
  /**
   * 离场动画
   */
  public leaveAnimationStart(callback): void {
    egret.Tween.get(this)
      .to(
        {
          alpha: 0,
        },
        400,
        egret.Ease.sineIn
      )
      .call(callback);
  }
  /**
   * 
    长按成功后执行的动画
   */
  afterTypedAnimationStart(maskRect, index) {
    const animaterRect = maskRect.$parent.$children.find(
      (rect) => rect.name === "animater"
    );
    const animaterRectBg = maskRect.$parent.$children.find(
      (rect) => rect.name === "animater-bg"
    );
    const dotLabel = maskRect.$parent.$children.find(
      (child) => child.name === "dot-label"
    );
    //修改动画矩形元素的visible，ready for animation to start
    animaterRect.visible = animaterRectBg.visible = true;

    animaterRect.left = animaterRect.top = animaterRect.right = animaterRect.bottom = 0;
    const tw = egret.Tween.get(animaterRect);
    const newRect = new eui.Rect();
    newRect.percentWidth = 100;
    newRect.percentHeight = 100;
    //分散隐蔽光圈
    tw.to(
      { left: -10, right: -10, bottom: -10, top: -10, alpha: 0 },
      500,
      egret.Ease.sineIn
    ).call(() => {
      //设置三个点
      dotLabel.text = ".";
      setTimeout(() => {
        dotLabel.appendText(".");
        setTimeout(() => {
          dotLabel.appendText(".");
        }, 300);
      }, 300);
    });
  }

  /**
   *
   * @param dataArr 数据数组
   * @param keyName 显示的字段名
   */
  initLongTapItems(dataArr, keyName) {
    this.itemGroup.removeChildren();

    for (let i = 0; i < dataArr.length; i++) {
      const group = this.generateTapGroup(dataArr[i], keyName);
      console.log(group);
      this.itemGroup.addChild(group);
    }

    let currentTop = 0;
    //设置间距
    this.itemGroup.once(
      egret.Event.RENDER,
      () => {
        this.itemGroup.$children.forEach((group) => {
          console.log(group.height);
          group.y = currentTop;
          currentTop += 20 + group.height;
        });
      },
      this
    );
    this.horizontalCenter = -(this.stage.stageWidth / 2 + this.width / 2);
    this.alpha = 1;
  }
  /**
   *
   * @param dat 数据项(对象)
   * @param fieldName 数据项中显示内容的字段名称
   */
  generateTapGroup(data: any, fieldName: string) {
    const group = new eui.Group();
    group.width = 580;

    const bg = new eui.Rect();
    bg.name = "background";
    bg.percentWidth = 100;
    bg.percentHeight = 100;
    bg.fillColor = 0x313548;

    const mask = new eui.Rect();
    mask.name = "mask";
    mask.percentWidth = 0;
    mask.percentHeight = 100;
    mask.fillColor = 0x5640bc;

    //文字内容label
    // const contentLabel = new eui.Label();

    const contentLabel = new eui.Label();
    contentLabel.wordWrap = true;
    contentLabel.name = "content-label";
    contentLabel.top = contentLabel.right = contentLabel.left = contentLabel.bottom = 20;
    contentLabel.text = data[fieldName];
    contentLabel.textColor = 0xffffff;
    contentLabel.lineSpacing = 14;
    contentLabel.size = 26;

    //负责动画的矩形默认隐藏。长按成功后显示并执行动画
    const animaterBg = new eui.Rect();
    animaterBg.name = "animater-bg";
    animaterBg.percentWidth = 100;
    animaterBg.percentHeight = 100;
    animaterBg.fillColor = 0xffffff;
    animaterBg.visible = false;

    const animater = new eui.Rect();
    animater.name = "animater";
    animater.left = 0;
    animater.right = 0;
    animater.top = 0;
    animater.bottom = 0;
    animater.fillColor = 0xffffff;
    animater.visible = false;

    //显示三个点的空label
    const dotLabel = new eui.Label();
    dotLabel.textColor = 0x000000;
    dotLabel.size = 50;
    dotLabel.left = 290;
    dotLabel.name = "dot-label";
    dotLabel.text = "";
    // dotLabel.horizontalCenter = 0 ;
    dotLabel.verticalCenter = 0;

    //承载事件的透明容器 handler
    const handler = new eui.Rect();
    handler.percentWidth = 100;
    handler.percentHeight = 100;
    handler.alpha = 0;
    handler.name = "handler";

    group.addChild(bg); //0
    group.addChild(mask); //1
    group.addChild(contentLabel); //1
    // group.addChild(textField);//1

    group.addChild(animaterBg); //2
    group.addChild(animater); //3

    group.addChild(dotLabel); //3

    group.addChild(handler); //4
    return group;
  }
}

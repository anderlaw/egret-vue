const Routes = [
  //第一阶段
  {
    path: "",
    component: GuidePointer,
  },{
    path:"/:stageNum/label/:index",
    component:RectLabel
  },{
    path:"/:stageNum/flower",
    component:Flower
  },{
    path: "/:stageNum/open-close-door",
    component: OpenCloseDoor,
  },{
    path: "/part-one/hand",
    component: PartOneHand,
  },{
    path: "/part-one/cake",
    component: PartOneCake,
  },{
    path: "/part-one/hr-explain",
    component: PartOneHrExplain,
  },{
    path:"/:stageNum/flower",
    component:Flower
  },{
    path:"/:stageNum/long-tap/:questionId",
    component:LongTap
  },{
    path:"/:stageNum/repeat/:questionId/:optionId",
    component:Repeat
  },{
    path:"/:stageNum/npc/:questionId/:optionId",
    component:Npc
  }
];

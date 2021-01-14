const Routes = [
  //第一阶段
  {
    path: "",
    component: GuidePointer,
  },
  {
    path:"/:stageNum/long-tap",
    component:LongTap
  },
  {
    path: "/:stageNum/open-close-door",
    component: OpenCloseDoor,
  },
  //label
  {
    path: "/:stageNum/label/:index",
    component: RectLabel,
  },
  //需求
  {
    path: "/part-one/hand",
    component: PartOneHand,
  },
  {
    path: "/part-one/cake",
    component: PartOneCake,
  },
  {
    path: "/part-one/hr-explain",
    component: PartOneHrExplain,
  },{
    path:"/:stageNum/flower",
    component:Flower
  },
  //第二阶段
  {
    path:"/part-two/resume",
    component:Resume
  }
];

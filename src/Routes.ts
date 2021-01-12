const Routes = [
  {
    path: "",
    component: GuidePointer,
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
  },
];

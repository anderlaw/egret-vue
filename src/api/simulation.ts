class Simulation extends SingtonClass {
  public constructor() {
    super();
  }

  public createCard(simulationId, userId): any {
    return HttpService.post(
      `/v1/simulation/${simulationId}/card?userId=${userId}`,
      {}
    );
  }
  public checkCard(simulationId, userId): any {
    return HttpService.get(`/v1/simulation/${simulationId}/currentCard`, {
      userId: userId,
    });
  }
  public updateSavePoint(cardId,savePoint): any {
    return HttpService.put(`/v1/simulation/card/${cardId}`,{
      savePoint:JSON.stringify(savePoint)
    })
  }
  public updateSceneReview(cardId,sceneReview){
    return HttpService.put(`/v1/simulation/saveScenarioReview/${cardId}`,{
      scenarioReview:sceneReview
    })
  }
  public getSceneReview(cardId){
    return HttpService.get(`/v1/simulation/getScenarioReview/${cardId}`,{})
  }
  public setStatus(cardId, status) {
    return HttpService.put(`/v1/simulation/card/${cardId}`, {
      cardStatus: status
    })
  }
  public updateSavePointSceneReview(cardId,savePoint,sceneReview){
    return HttpService.put(`/v1/simulation/card/${cardId}`,{
      scenarioReview:sceneReview,
      savePoint:JSON.stringify(savePoint)
    })
  }
  public getRootQuestion(simulationId, phaseNum): any {
    return HttpService.request({
      url: `/v1/simulation/${simulationId}/simulation_root_map/${phaseNum}`,
      type: "get",
      data: {},
    });
  }
  /**
   * 获取问题详情
   * @param questionId 问题id
   */
  public getQuestionDetail(questionId):any{
    return HttpService.request({
      url: `/v1/simulation/simulation_question/${questionId}`,
      type: "get",
      data: {},
    });
  }
  /**
   * 回答问题
   * @param param0 {情景模拟id，流水卡id，问题id}
   * @param body 请求体
   */
  public answerQuestion({simulationId,cardId,questionId},body):any{
    
    return HttpService.request({
      url: `/v1/simulation/${simulationId}/card/${cardId}/question/${questionId}/answer`,
      type: "post",
      data: body,
    });
  }
  public mockAnswerQuestion({ simulationId, cardId, questionId }, body) {
    return HttpService.request({
      url: `/v1/simulation/${simulationId}/card/${cardId}/question/${questionId}/mockanswer`,
      type: "post",
      data: body,
    });
  }

  /**
   * 发送保存点
   */
  public querySavePoint(cardId, data): any {
    return HttpService.request({
      url: `/sim/v1/simulation/card/${cardId}`,
      type: 'put',
      data: data
    })
  }
  /**
   * 
   */
  public getPhaseConfig(simulationId){
    return HttpService.request({
      url: `/v1/simulation/${simulationId}/phase_config`,
      type: 'get',
      data: {}
    })
  }
  //这个是重复的方法，作测试dist变更用，没用其他意义
  public getPhaseConfig1(simulationId){
    return HttpService.request({
      url: `/v1/simulation/${simulationId}/phase_config`,
      type: 'get',
      data: {}
    })
  }

  // 算分接口
  public calcKa(cardId: number) {
    return HttpService.request({
      url: `/v1/simulation/card/${cardId}/calc_ka`,
      type: 'post',
      data: {}
    })
  }
}

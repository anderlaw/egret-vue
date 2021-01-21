class Test extends SingtonClass {
  public constructor() {
    super();
  }

  public req(data): any {
    return HttpService.request({
      url: '/customer/queryCompaniesList',
      type: 'get',
      data: data
    })
  }
}
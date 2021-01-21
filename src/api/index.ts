class Api {
  /**
   * test 请求
   */
  public static get Test(): Test {
    return Test.getSingtonInstance()
  }

  public static get Simulation(): Simulation {
    return Simulation.getSingtonInstance();
  }
  public static get HeartBeat():HeartBeat {
    return HeartBeat.getSingtonInstance();
  }
}
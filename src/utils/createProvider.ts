export class NestjsProvider {
  private static instance: NestjsProvider;
  private constructor(private readonly token: symbol) {}

  static provideTo(token: symbol) {
    if (!NestjsProvider.instance || NestjsProvider.instance.token != token) {
      NestjsProvider.instance = new NestjsProvider(token);
    }

    return NestjsProvider.instance;
  }

  theClass(classToBeUsed: any) {
    return {
      provide: this.token,
      useClass: classToBeUsed,
    };
  }
}

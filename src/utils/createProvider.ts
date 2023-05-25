export class NestjsProvider {
  private static instance: NestjsProvider;
  private constructor(private readonly token: symbol) {}

  static provide(token: symbol) {
    if (!NestjsProvider.instance || NestjsProvider.instance.token != token) {
      NestjsProvider.instance = new NestjsProvider(token);
    }

    return NestjsProvider.instance;
  }

  useClass(classToBeUsed: any) {
    return {
      provide: this.token,
      useClass: classToBeUsed,
    };
  }
}

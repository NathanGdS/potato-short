export class NestjsProvider {
  private static instance: NestjsProvider;
  private constructor(private readonly token: symbol) {}

  static provide(token: symbol) {
    if (!this.instance) {
      this.instance = new NestjsProvider(token);
    }

    return this.instance;
  }

  useClass(classToBeUsed: any) {
    return {
      provide: this.token,
      useClass: classToBeUsed,
    };
  }
}

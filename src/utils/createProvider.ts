export class NestjsProvider {
  private constructor(private readonly token: symbol) {}

  static create(token: symbol) {
    return new NestjsProvider(token);
  }

  useClass(classToBeUsed: any) {
    return {
      provide: this.token,
      useClass: classToBeUsed,
    };
  }
}

// export function createSimpleProvider(
//   token: symbol,
// ): Provider {
// ;
// }

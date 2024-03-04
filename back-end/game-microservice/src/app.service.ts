import { Injectable } from '@nestjs/common';

import { DataValidationService, LanguageService } from '@birdgang/lib-common';

@Injectable()
export class AppService {
  constructor(
    private readonly languageService: LanguageService,
    private dataValidationService: DataValidationService,
  ) {}

  async validateData() {
    const data = {
      /* 데이터 객체 */
    };
    await this.dataValidationService.validate(data);
  }

  getHello() {
    return this.languageService.getHello();
  }
}

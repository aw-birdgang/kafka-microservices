import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      ) {}



  @Get('validate')
  validateData() {
    this.appService.validateData();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

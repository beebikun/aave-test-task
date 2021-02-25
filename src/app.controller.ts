import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Token } from './token.entity';

@Controller('tokens')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll(): Promise<{ tokens: Token[] }> {
    const tokens = await this.appService.getAll();
    return { tokens };
  }
}

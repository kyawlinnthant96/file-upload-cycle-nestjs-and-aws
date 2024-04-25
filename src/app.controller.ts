import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from './config/types';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService<EnvVars>) {}

  @Get()
  getStatus() {
    const nodeEnv = this.configService.get('NODE_ENV');
    return { env: nodeEnv };
  }
}

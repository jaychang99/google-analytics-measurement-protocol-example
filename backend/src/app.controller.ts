import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GaEventResponseDto } from 'src/common/dtos/ga-event-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // This is not a real endpoint, just an example
  @Post('/ga-events')
  async sendGaEvent(): Promise<GaEventResponseDto> {
    // Send the event to Google Analytics
    return await this.appService.sendGaEvent();
  }
}

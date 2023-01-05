import { Controller, Post } from '@nestjs/common';
import { HftradingService } from './hftrading.service';

@Controller('hftrading')
export class HftradingController {
  constructor(private readonly hftrading: HftradingService) {}

}

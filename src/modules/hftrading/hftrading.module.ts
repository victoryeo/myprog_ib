import { Module } from '@nestjs/common';
import { HftradingController } from './hftrading.controller';
import { HftradingService } from './hftrading.service';

@Module({
  controllers: [HftradingController],
  providers: [HftradingService],
})

export class HftradingModule {}

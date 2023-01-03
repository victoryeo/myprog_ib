import { Controller, Post } from '@nestjs/common';
import { IbexService } from './ibex.service';

@Controller('ibex')
export class IbexController {
  constructor(private readonly ibexService: IbexService) {}

  @Post()
  sendIBOrder() {
    this.ibexService.sendOrder();
  }
}

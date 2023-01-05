import { Injectable, Logger } from '@nestjs/common';
import { IBApi, EventName, ErrorCode, Contract } from "@stoqey/ib";
import { SecType, OrderType, OrderAction, Order } from '@stoqey/ib';

@Injectable()
export class HftradingService {
  ib: IBApi;
}
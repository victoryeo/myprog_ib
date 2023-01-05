import { Injectable, Logger } from '@nestjs/common';
import { IBApi, EventName, ErrorCode, Contract } from "@stoqey/ib";
import { SecType, OrderType, OrderAction, Order } from '@stoqey/ib';
import { IbexService } from '../ibex/ibex.service';

@Injectable()
export class HftradingService {
  ib: IBApi;
  df_hist: any;
  volatility_ratio: number;
  beta: number;

  constructor(
    private ibexService: IbexService,
    ) {
    this.df_hist = null;
    this.volatility_ratio = 1;
    this.beta = 0;
    
    try {
      this.df_hist = this.initialise_data_frame();
      this.ib = this.ibexService.getIbInstance();
    } catch (err) {
      console.warn('Error in HftradingService constructor.', err);
    }
  }

  initialise_data_frame() {
    let twod_array = [
      [2.3, 3.5, 4.5],['Jan-03-2023','Jan-04-2023','Jan-05-2023']];
    return twod_array;
  }
}
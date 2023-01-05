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
      this.ib.connect();

      this.ib.on(EventName.error, (err: Error, code: ErrorCode, 
        reqId: number) => {
        console.error(`${err.message} - code: ${code} - reqId: ${reqId}`);
      })
      .on(
        // recalculate account updates at intervals
        EventName.position,
        (account: string, contract: Contract, pos: number, 
          avgCost?: number) => {
          console.log(`${account}: ${pos} x ${contract.symbol} @ ${avgCost}`);
          this.recalculate_strategy_params();
        }
      )

    } catch (err) {
      console.warn('Error in HftradingService constructor.', err);
    }
  }

  initialise_data_frame() {
    let twod_array = [
      [2.3, 3.5, 4.5],['Jan-03-2023','Jan-04-2023','Jan-05-2023']];
    return twod_array;
  }

  recalculate_strategy_params() {
    // calculate beta and vol ratio for signal indicators
    let resampled = this.df_hist.map(
      elem=>({...elem[0] + Math.random()})
    );
    console.log(resampled)
    let mean = resampled.mean();
    this.beta = mean[0]/mean[1];
  }
}
import { Injectable, Logger } from '@nestjs/common';
import { IBApi, EventName, ErrorCode, Contract } from "@stoqey/ib";
import { SecType, OrderType, OrderAction, Order } from '@stoqey/ib';
import { IbexService } from '../ibex/ibex.service';

@Injectable()
export class HftradingService {
  ib: IBApi;
  df_hist: any;
  // vol ratio: the std dev of pct changes of A over B
  volatility_ratio: number;
  // beta: the mean prices of A over B
  beta: number;
  symbols: Array<string>; 

  constructor(
    private ibexService: IbexService,
    ) {
    this.df_hist = null;
    this.volatility_ratio = 1;
    this.beta = 0;
    this.symbols = ['AAPL','GOOG'];
    
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

      //this.recalculate_strategy_params();
    } catch (err) {
      console.warn('Error in HftradingService constructor.', err);
    }
  }

  initialise_data_frame() {
    let twod_array = [
      [2.3, 3.5, 4.5, 3.4, 4.5, 3.5],   //AAPL
      [3.1, 6.3, 5.2, 11.2, 12.3, 10.5] //GOOG
    ];
    return twod_array;
  }

  recalculate_strategy_params() {
    let sum_a: number = 0, sum_b: number = 0;
    let mean_a: number = 0, mean_b: number = 0;
    let [symbol_a, symbol_b] = this.symbols;
    console.log(this.df_hist)
    // calculate beta and vol ratio for signal indicators
    this.df_hist.map(
      (elem, index)=>{
        console.log(index, elem)
        elem.map((mele, counter)=>{
          if (index == 0) {
            sum_a += mele;
            mean_a = sum_a/(counter+1);
          }
          else if (index == 1) 
            sum_b += mele;
            mean_b = sum_b/(counter+1);
        })
      }
    );
    console.log(sum_a, sum_b)
    console.log(mean_a, mean_b)
    this.beta = mean_a/mean_b;
  }
}
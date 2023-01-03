import { Injectable, Logger } from '@nestjs/common';
import { IBApi, EventName, ErrorCode, Contract } from "@stoqey/ib";
import { SecType } from '@stoqey/ib';
import { OrderType, OrderAction, Order } from '@stoqey/ib';

@Injectable()
export class IbexService {
  ib: IBApi;

  constructor(
  ) {
    try {
      Logger.log('IbexService started');
      // create IBApi object
       this.ib = new IBApi({
        // clientId: 0,
        // host: '127.0.0.1',
        port: 4002,
      });

      // register event handler
      let positionsCount = 0;

      this.ib.on(EventName.error, (err: Error, code: ErrorCode, 
        reqId: number) => {
        console.error(`${err.message} - code: ${code} - reqId: ${reqId}`);
      })
        .on(
          EventName.position,
          (account: string, contract: Contract, pos: number, 
            avgCost?: number) => {
            console.log(`${account}: ${pos} x ${contract.symbol} @ ${avgCost}`);
            positionsCount++;
          }
        )
        .once(EventName.positionEnd, () => {
          console.log(`Total: ${positionsCount} positions.`);
          this.ib.disconnect();
        });

      // call API functions
      this.ib.connect();
      this.ib.reqPositions();
    } catch (err) {
      console.warn('Error in IbexService constructor.', err);
    } 
  }

  async sendOrder() {
    this.ib.once(EventName.nextValidId, (orderId: number) => {
      const contract: Contract = {
        symbol: "AMZN",
        exchange: "SMART",
        currency: "USD",
        secType: SecType.STK,
      };
    
      const order: Order = {
        orderType: OrderType.LMT,
        action: OrderAction.BUY,
        lmtPrice: 1,
        orderId,
        totalQuantity: 1,
        account: "YOUR_ACCOUNT_ID",
      };
    
      this.ib.placeOrder(orderId, contract, order);
    });
    
    this.ib.connect();
    let retVal = this.ib.reqIds();
    Logger.log("return value", this.objToString(retVal));
  }

  objToString(obj) {
    let str = '';
    for (let p in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, p)) {
            str += p + '::' + '\n';
        }
    }
    return str;
  }
}

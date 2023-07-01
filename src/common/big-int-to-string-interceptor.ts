import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class BigIntToStringInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.convertBigIntToString(data)));
  }

  convertBigIntToString(data: any): any {
    if (data instanceof Array) {
      return data.map((item) => this.convertBigIntToString(item));
    } else if (data instanceof Object) {
      return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, this.convertBigIntToString(value)]));
    } else if (typeof data === "bigint") {
      return data.toString();
    } else {
      return data;
    }
  }
}

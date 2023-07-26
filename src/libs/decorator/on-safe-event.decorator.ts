import { applyDecorators, Logger } from "@nestjs/common";
import { OnEvent, OnEventType } from "@nestjs/event-emitter";

import { OnEventOptions } from "@nestjs/event-emitter/dist/interfaces";

function _OnSafeEvent() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    // 오버라이딩 되기 전의 메소드의 메타데이터를 저장
    const metaKeys = Reflect.getOwnMetadataKeys(descriptor.value);
    const metas = metaKeys.map((key) => [key, Reflect.getMetadata(key, descriptor.value)]);

    descriptor.value = async function (...args: any[]) {
      try {
        await originalMethod.call(this, ...args);
      } catch (e) {
        if (e instanceof Error) Logger.error(e, e.stack, "OnSafeEvent");
      }
    };

    // 오버라이딩 된 메소드에 메타데이터를 복구
    metas.forEach(([k, v]) => Reflect.defineMetadata(k, v, descriptor.value));
  };
}

export function OnSafeEvent(event: OnEventType, options?: OnEventOptions | undefined) {
  // 데코레이터를 합성
  return applyDecorators(OnEvent(event, options), _OnSafeEvent());
}

//
//  Counter.m
//  VNTinder
//
//  Created by Vuong Toan Chung on 2/18/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
// Counter.m
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

//define module
@interface RCT_EXTERN_MODULE(Counter, RCTEventEmitter)
//define normal method
  RCT_EXTERN_METHOD(increment)
//define callback method
RCT_EXTERN_METHOD(getCount: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getMulCount: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(
                  decrement: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
@end

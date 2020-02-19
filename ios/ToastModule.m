//
//  ToastModule.m
//  VNTinder
//
//  Created by Vuong Toan Chung on 2/19/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

//define module
@interface RCT_EXTERN_MODULE(ToastModule, RCTEventEmitter)
//define normal method
//define callback method
RCT_EXTERN_METHOD(getMulCount:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(doCallbackTask:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(
                  doPromiseTask:(RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
@end

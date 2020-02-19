//
//  ToastModule.swift
//  VNTinder
//
//  Created by Vuong Toan Chung on 2/19/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
@objc(ToastModule)
class ToastModule: RCTEventEmitter {
  
  private var count = 0
  
  // export value
  @objc
  override func constantsToExport() -> [AnyHashable : Any]! {
    return [
      "number": 123.9,
      "string": "foo",
      "boolean": true,
      "array": [1, 22.2, "33"],
      "object": ["a": 1, "b": 2]
    ]
  }
  
  //required func
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func supportedEvents() -> [String]! {
    return ["doPromiseTask"]
  }
  
  //define func
  @objc
  func increment() {
    count += 1
    print("count is \(count)")
    sendEvent(withName: "onIncrement", body: ["count": count])
    
  }
  
  //call back
  @objc
  func doCallbackTask(_ callback: RCTResponseSenderBlock) {
    let name = "nguyen van A"
    let email = "abc@gmail.com"
    callback([name, email])
  }
  
  // Passing multiple arguments to a callback
  @objc
  func getMulCount(_ callback: RCTResponseSenderBlock) {
    callback([
      count,               // variable
      123.9,               // int or float
      "third argument",    // string
      [1, 2.2, "3"],       // array
      ["a": 1, "b": 2]     // object
      ])
  }
  
  @objc
  func doPromiseTask(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
    ) -> Void {
    if (count == 0) {
      let error = NSError(domain: "", code: 200, userInfo: nil)
      reject("E_COUNT", "Exception doPromiseTask bla bvla", error)
    } else {
      resolve("my number is: \(count)")
    }
  }
}

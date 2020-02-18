package com.vntinder;


import android.widget.Toast;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.util.HashMap;
import java.util.Map;

public class ToastModule extends ReactContextBaseJavaModule {

    private static final String LENGTH_SHORT = "LENGTH_SHORT";
    private static final String LENGTH_LONG = "LENGTH_LONG";

    public ToastModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "ToastModule";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final  Map<String, Object> constants = new HashMap<>();
        constants.put(LENGTH_SHORT, Toast.LENGTH_SHORT);
        constants.put(LENGTH_LONG, Toast.LENGTH_LONG);
        return constants;
    }

    //define method
    @ReactMethod
    public void showText(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }


    //define call back function
    @ReactMethod
    public void doCallbackTask(int aNumber,
                               Callback successCallback,
                               Callback failedCallback) {
        try {
            if (aNumber == 100) {
                throw new Exception("Exception bla bvla");
            }
            String name = "nguyen van A";
            String email = "abc@gmail.com";
            successCallback.invoke(name, email);
        } catch (Exception e) {
            failedCallback.invoke(e.getMessage());
        }
    }


    //define promise func => async/ await
    @ReactMethod
    public void doPromiseTask(int aNumber, Promise promise) {
        try {
            if (aNumber == 100) {
                throw new Exception("Exception doPromiseTask bla bvla");
            }
            WritableMap mapResult = Arguments.createMap();
            mapResult.putString("name", "Nguyen Van B");
            mapResult.putInt("Age", 40);
            promise.resolve(mapResult);
        } catch (Exception e) {
            promise.reject("An error occured", e);
        }
    }

}


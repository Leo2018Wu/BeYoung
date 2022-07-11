package com.zyxsnet.mobile.young.softinput;

import android.util.Log;
import android.view.WindowManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class SoftInputModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;


    public SoftInputModule(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }


    @NonNull
    @Override
    public String getName() {
        return "SoftInputModule";
    }


    @ReactMethod
    public void changeSoftInputMode(int modeValue, Callback successCallback, Callback errorCallback){

        try {
            setSoftInputValue(modeValue);
            successCallback.invoke("success");
        }
        catch (Exception e){
            Log.e("ERROR_TAG", e.getMessage());
            errorCallback.invoke(e.getMessage());
        }
    }


    public void setSoftInputValue(final int value){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if(value==1){
                    getCurrentActivity().getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
                }
                else{
                    getCurrentActivity().getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
                }
            }
        });
    }

}

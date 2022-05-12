package com.zyxsnet.mobile.young.nim_push;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class NimPushModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    public NimPushModule(ReactApplicationContext reactContext) {
        super(reactContext);

        // handle new intent
        reactContext.addActivityEventListener(this);
    }
    @Override
    public String getName() {
        return "NIMPushModule";
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}

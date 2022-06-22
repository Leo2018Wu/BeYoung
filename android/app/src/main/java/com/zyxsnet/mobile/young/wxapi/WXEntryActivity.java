package com.zyxsnet.mobile.young.wxapi;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.theweflex.react.WechatModule;


public class WXEntryActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WechatModule.handleIntent(getIntent());
        finish();
    }
}

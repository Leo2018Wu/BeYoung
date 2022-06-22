package com.zyxsnet.mobile.young.wxapi;

import android.app.Activity;
import android.os.Bundle;

import com.theweflex.react.WechatModule;

public class WXPayEntryActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WechatModule.handleIntent(getIntent());
    finish();
  }
}
package com.zyxsnet.mobile.young;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;

import com.alibaba.sdk.android.push.CloudPushService;
import com.alibaba.sdk.android.push.CommonCallback;
import com.alibaba.sdk.android.push.huawei.HuaWeiRegister;
import com.alibaba.sdk.android.push.noonesdk.PushServiceFactory;
import com.alibaba.sdk.android.push.register.MeizuRegister;
import com.alibaba.sdk.android.push.register.MiPushRegister;
import com.alibaba.sdk.android.push.register.OppoRegister;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import org.wonday.aliyun.push.AliyunPushPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.shell.MainReactPackage;
import com.reactlibrary.RNAliyunOssPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.zoontek.rnpermissions.RNPermissionsPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.reactnativepagerview.PagerViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Packages that cannot be autolinked yet can be added manually here, for example:
            // packages.add(new MyReactNativePackage());
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

      //下面是添加的代码
      this.initCloudChannel(this);
      //添加结束
  }

    // 下面是添加的代码
    /**
     * 初始化阿里云推送通道
     * @param applicationContext
     */
    private void initCloudChannel(MainApplication applicationContext) {
        // 创建notificaiton channel
        this.createNotificationChannel();
        PushServiceFactory.init(this.getApplicationContext());
        CloudPushService pushService = PushServiceFactory.getCloudPushService();
        pushService.setNotificationSmallIcon(R.mipmap.ic_launcher);//设置通知栏小图标， 需要自行添加
        pushService.register(this.getApplicationContext(), "333706060", "730a8be985db41d18d6fb55ae6c00eab", new CommonCallback() {
            @Override
            public void onSuccess(String responnse) {
                // success
            }
            @Override
            public void onFailed(String code, String message) {
                // failed
            }
        });

        // 关于第三方推送通道的设置，请仔细阅读阿里云文档
        // https://help.aliyun.com/document_detail/30067.html?spm=a2c4g.11186623.6.589.598b7fa8vf9qWF

        // 注册方法会自动判断是否支持小米系统推送，如不支持会跳过注册。
         MiPushRegister.register(applicationContext, "2882303761520156613", "5972015665613");

        // 注册方法会自动判断是否支持华为系统推送，如不支持会跳过注册,需要在清单文件中加入相应的元信息
         HuaWeiRegister.register(this);

        // 接入FCM/GCM初始化推送
        // GcmRegister.register(applicationContext, "933450626095", "1:933450626095:android:75022c708a862bc1e182da");

        // OPPO通道注册
        OppoRegister.register(applicationContext, "dbbde312c1264239a39fc77c2e8eb37b", "985f04144c8a49b89fedc4539ab8f5e4"); // appKey/appSecret在OPPO通道开发者平台获取

        // 魅族通道注册
         MeizuRegister.register(applicationContext, "336274", "75PQUlRbc1sCGxMhHWdW"); // appId/appkey在魅族开发者平台获取

        // VIVO通道注册,这个要等企业级认证通过,   需要在清单文件中加入相应的元信息
        //VivoRegister.register(applicationContext);
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            // 通知渠道的id
            String id = "1";
            // 用户可以看到的通知渠道的名字.
            CharSequence name = "youngMsgNotificationChannel";
            // 用户可以看到的通知渠道的描述
            String description = "youngMsgNotificationDescription";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel mChannel = new NotificationChannel(id, name, importance);
            // 配置通知渠道的属性
            mChannel.setDescription(description);
            // 设置通知出现时的闪灯（如果 android 设备支持的话）
            mChannel.enableLights(true);
            mChannel.setLightColor(Color.RED);
            // 设置通知出现时的震动（如果 android 设备支持的话）
            mChannel.enableVibration(true);
            mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
            //最后在notificationmanager中创建该通知渠道
            mNotificationManager.createNotificationChannel(mChannel);
        }
    }
    // 添加结束

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.zyxsnet.mobile.young.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}

import RNIap from 'react-native-iap';

export default class Iap {
  constructor() {
    this.purchaseUpdateCallback = null; // 支付回调通知
    this.purchaseErrorCallback = null; // 支付请求失败回调
    this.itemSkus = null; //充值项 ID
    this.rechargeId = null;
  }
  async init(itemSkus, rechargeId) {
    this.itemSkus = itemSkus;
    this.rechargeId = rechargeId;
    try {
      await RNIap.initConnection();
      // if (Platform.OS === 'ios') {
      await RNIap.clearTransactionIOS();
      // }
    } catch (err) {
      console.error(err.code, err.message);
    }
  }
  async getProducts() {
    try {
      if (!this.itemSkus) {
        return new Error('请先选要充值的项目！');
      }
      const products = await RNIap.getProducts(this.itemSkus);
      // await this.requestPurchase()
      return products;
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  // 恢复购买 可能用户支付了费用但是没有在数据库中记录
  async getAvailablePurchases() {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      if (purchases && purchases.length > 0) {
      }
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  async requestPurchase() {
    try {
      if (!this.itemSkus) {
        return new Error('未获取到充值项ID，请稍后重试！');
      }
      await RNIap.requestPurchase(this.itemSkus[0]); // 发出的支付请求在
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }
}

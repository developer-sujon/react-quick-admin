class SessionHelper {
  static clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
    // localStorage.getItem("ndAccessToken") ? window.location.href='/account/login':''
    return true;
  }
  static setLayout(layout) {
    return localStorage.setItem("layout", JSON.stringify(layout));
  }
  static getLayout() {
    return JSON.parse(localStorage.getItem("layout"));
  }

  static setLastLocation(location) {
    return localStorage.setItem("lastLocation", location);
  }
  static getLastLocation() {
    return JSON.parse(localStorage.getItem("location"));
  }

  static initLayout(layout) {
    return localStorage.setItem("layout", JSON.stringify(layout));
  }

  static getLanguage() {
    return localStorage.getItem("i18nextLng");
  }
  static setLanguage(language) {
    return localStorage.setItem("i18nextLng", language);
  }
  static getAccessToken() {
    return localStorage.getItem("ndAccessToken");
  }
  static setAccessToken(accessToken) {
    if (!accessToken) return undefined;
    return localStorage.setItem("ndAccessToken", accessToken);
  }
  static getRefreshToken() {
    return localStorage.getItem("hnfeRefreshToken");
  }
  static setRefreshToken(refreshToken) {
    if (!refreshToken) return undefined;
    return localStorage.setItem("hnfeRefreshToken", refreshToken);
  }
  static removeTokens() {
    localStorage.removeItem("ndAccessToken");
    localStorage.removeItem("activeStore");
    localStorage.removeItem("lastLocation");
  }
  static getActiveStore() {
    return JSON.parse(localStorage.getItem("activeStore"));
  }
  static setActiveStore(activeStore) {
    if (typeof activeStore === "object") {
      return localStorage.setItem("activeStore", JSON.stringify(activeStore));
    }
  }
  static removeActiveStore() {
    localStorage.removeItem("activeStore");
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {
          grandTotal: 0,
          total: 0,
          discount: 0,
          tax: 0,
          products: [],
        };
  }
  static setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getPurchaseCart() {
    return JSON.parse(localStorage.getItem("purchaseCart"));
  }
  static setPurchaseCart(cart) {
    localStorage.setItem("purchaseCart", JSON.stringify(cart));
  }
  static clearPurchaseCart() {
    localStorage.removeItem("purchaseCart");
  }
  static removePurchaseCart() {
    localStorage.removeItem("purchaseCart");
  }
  static getSaleCart() {
    return JSON.parse(localStorage.getItem("saleCart"));
  }
  static setSaleCart(cart) {
    localStorage.setItem("saleCart", JSON.stringify(cart));
  }
  static clearSaleCart() {
    localStorage.removeItem("saleCart");
  }
  static removeSaleCart() {
    localStorage.removeItem("saleCart");
  }
  static getPaymentInfo() {
    return sessionStorage.getItem("paymentInfo")
      ? JSON.parse(sessionStorage.getItem("paymentInfo"))
      : {};
  }
  static setPaymentInfo(paymentInfo) {
    return (
      paymentInfo &&
      sessionStorage.setItem("paymentInfo", JSON.stringify(paymentInfo))
    );
  }
  static removePaymentInfo() {
    sessionStorage.removeItem("paymentInfo");
  }
}

export default SessionHelper;

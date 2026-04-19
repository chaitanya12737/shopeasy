import CartTypes "../types/cart";
import CartLib "../lib/cart";
import CatalogLib "../lib/catalog";
import Map "mo:core/Map";
import List "mo:core/List";

mixin (
  carts : Map.Map<CartLib.SessionId, CartLib.Cart>,
  products : List.List<CatalogLib.Product>,
) {
  public query func getCart(sessionId : CartTypes.SessionId) : async CartTypes.CartSummary {
    CartLib.getCart(carts, sessionId);
  };

  public func addToCart(sessionId : CartTypes.SessionId, productId : CartTypes.ProductId, quantity : Nat) : async Bool {
    switch (CatalogLib.getProduct(products, productId)) {
      case null false;
      case (?product) {
        if (product.stock == 0) {
          false;
        } else {
          CartLib.addItem(carts, sessionId, product, quantity);
          true;
        };
      };
    };
  };

  public func updateCartItem(sessionId : CartTypes.SessionId, productId : CartTypes.ProductId, quantity : Nat) : async Bool {
    CartLib.updateItem(carts, sessionId, productId, quantity);
  };

  public func removeFromCart(sessionId : CartTypes.SessionId, productId : CartTypes.ProductId) : async Bool {
    CartLib.removeItem(carts, sessionId, productId);
  };

  public func clearCart(sessionId : CartTypes.SessionId) : async () {
    CartLib.clearCart(carts, sessionId);
  };
};

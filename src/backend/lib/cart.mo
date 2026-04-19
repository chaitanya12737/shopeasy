import CartTypes "../types/cart";
import CatalogTypes "../types/catalog";
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";

module {
  public type CartItem = CartTypes.CartItem;
  public type CartSummary = CartTypes.CartSummary;
  public type SessionId = CartTypes.SessionId;
  public type ProductId = CartTypes.ProductId;
  public type Cart = List.List<CartItem>;

  public func getCart(
    carts : Map.Map<SessionId, Cart>,
    sessionId : SessionId,
  ) : CartSummary {
    switch (carts.get(sessionId)) {
      case null {
        { items = []; totalItems = 0; totalPrice = 0 };
      };
      case (?cart) {
        let items = cart.toArray();
        let totalItems = items.foldLeft(0, func(acc, item) = acc + item.quantity);
        let totalPrice = items.foldLeft(0, func(acc, item) = acc + item.price * item.quantity);
        { items; totalItems; totalPrice };
      };
    };
  };

  public func addItem(
    carts : Map.Map<SessionId, Cart>,
    sessionId : SessionId,
    product : CatalogTypes.Product,
    quantity : Nat,
  ) : () {
    let cart = switch (carts.get(sessionId)) {
      case null {
        let newCart = List.empty<CartItem>();
        carts.add(sessionId, newCart);
        newCart;
      };
      case (?c) c;
    };
    // Check if item already in cart
    switch (cart.findIndex(func(item : CartItem) : Bool { item.productId == product.id })) {
      case (?idx) {
        let existing = cart.at(idx);
        cart.put(idx, { existing with quantity = existing.quantity + quantity });
      };
      case null {
        cart.add({
          productId = product.id;
          quantity;
          name = product.name;
          price = product.price;
          imageUrl = product.imageUrl;
        });
      };
    };
  };

  public func updateItem(
    carts : Map.Map<SessionId, Cart>,
    sessionId : SessionId,
    productId : ProductId,
    quantity : Nat,
  ) : Bool {
    switch (carts.get(sessionId)) {
      case null false;
      case (?cart) {
        switch (cart.findIndex(func(item : CartItem) : Bool { item.productId == productId })) {
          case null false;
          case (?idx) {
            if (quantity == 0) {
              // Remove by rebuilding the list
              let newCart = cart.filter(func(item : CartItem) : Bool { item.productId != productId });
              carts.add(sessionId, newCart);
            } else {
              let existing = cart.at(idx);
              cart.put(idx, { existing with quantity });
            };
            true;
          };
        };
      };
    };
  };

  public func removeItem(
    carts : Map.Map<SessionId, Cart>,
    sessionId : SessionId,
    productId : ProductId,
  ) : Bool {
    switch (carts.get(sessionId)) {
      case null false;
      case (?cart) {
        let sizeBefore = cart.size();
        let newCart = cart.filter(func(item : CartItem) : Bool { item.productId != productId });
        if (newCart.size() < sizeBefore) {
          carts.add(sessionId, newCart);
          true;
        } else {
          false;
        };
      };
    };
  };

  public func clearCart(
    carts : Map.Map<SessionId, Cart>,
    sessionId : SessionId,
  ) : () {
    switch (carts.get(sessionId)) {
      case null ();
      case (?cart) cart.clear();
    };
  };
};

import CatalogLib "lib/catalog";
import CartLib "lib/cart";
import OrderLib "lib/orders";
import CatalogApi "mixins/catalog-api";
import CartApi "mixins/cart-api";
import OrdersApi "mixins/orders-api";
import List "mo:core/List";
import Map "mo:core/Map";
import CartTypes "types/cart";
import CatalogTypes "types/catalog";
import OrderTypes "types/orders";

actor {
  let products = List.empty<CatalogLib.Product>();
  var nextProductId : Nat = CatalogLib.seedProducts(products);

  let carts = Map.empty<CartLib.SessionId, CartLib.Cart>();

  let orders = List.empty<OrderLib.Order>();
  var nextOrderId : Nat = 1;

  include CatalogApi(products);
  include CartApi(carts, products);
  include OrdersApi(orders, carts);

  public func addProduct(
    name : Text,
    price : Nat,
    description : Text,
    imageUrl : Text,
    category : Text,
    stock : Nat,
  ) : async CatalogTypes.Product {
    let product = CatalogLib.addProduct(products, nextProductId, name, price, description, imageUrl, category, stock);
    nextProductId += 1;
    product;
  };

  public func createOrder(
    sessionId : CartTypes.SessionId,
    shippingAddress : OrderTypes.ShippingAddress,
  ) : async ?OrderTypes.Order {
    let cartSummary = CartLib.getCart(carts, sessionId);
    if (cartSummary.items.size() == 0) {
      return null;
    };
    let orderItems : [OrderTypes.OrderItem] = Array.tabulate<OrderTypes.OrderItem>(
      cartSummary.items.size(),
      func(i) {
        let item = cartSummary.items[i];
        {
          productId = item.productId;
          name = item.name;
          price = item.price;
          quantity = item.quantity;
        };
      }
    );
    let order = OrderLib.createOrder(orders, nextOrderId, orderItems, shippingAddress, cartSummary.totalPrice);
    nextOrderId += 1;
    CartLib.clearCart(carts, sessionId);
    ?order;
  };
};

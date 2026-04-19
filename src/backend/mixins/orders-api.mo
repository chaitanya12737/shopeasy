import OrderTypes "../types/orders";
import CartTypes "../types/cart";
import OrderLib "../lib/orders";
import CartLib "../lib/cart";
import Map "mo:core/Map";
import List "mo:core/List";

mixin (
  orders : List.List<OrderLib.Order>,
  carts : Map.Map<CartLib.SessionId, CartLib.Cart>,
) {
  public query func getOrder(id : OrderTypes.OrderId) : async ?OrderTypes.Order {
    OrderLib.getOrder(orders, id);
  };
};

import OrderTypes "../types/orders";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type Order = OrderTypes.Order;
  public type OrderId = OrderTypes.OrderId;
  public type OrderItem = OrderTypes.OrderItem;
  public type ShippingAddress = OrderTypes.ShippingAddress;

  public func createOrder(
    orders : List.List<Order>,
    nextId : Nat,
    items : [OrderItem],
    shippingAddress : ShippingAddress,
    totalPrice : Nat,
  ) : Order {
    let orderNumber = "ORD-" # nextId.toText();
    let order : Order = {
      id = nextId;
      orderNumber;
      items;
      shippingAddress;
      totalPrice;
      status = #confirmed;
      createdAt = Time.now();
    };
    orders.add(order);
    order;
  };

  public func getOrder(
    orders : List.List<Order>,
    id : OrderId,
  ) : ?Order {
    orders.find(func(o : Order) : Bool { o.id == id });
  };
};

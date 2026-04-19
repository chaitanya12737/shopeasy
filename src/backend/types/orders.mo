import Common "common";

module {
  public type OrderId = Common.OrderId;
  public type ProductId = Common.ProductId;
  public type Timestamp = Common.Timestamp;

  public type OrderStatus = {
    #pending;
    #confirmed;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type OrderItem = {
    productId : ProductId;
    name : Text;
    price : Nat;
    quantity : Nat;
  };

  public type ShippingAddress = {
    fullName : Text;
    street : Text;
    city : Text;
    state : Text;
    zipCode : Text;
    country : Text;
  };

  public type Order = {
    id : OrderId;
    orderNumber : Text;
    items : [OrderItem];
    shippingAddress : ShippingAddress;
    totalPrice : Nat;
    status : OrderStatus;
    createdAt : Timestamp;
  };
};

import Common "common";

module {
  public type SessionId = Common.SessionId;
  public type ProductId = Common.ProductId;

  public type CartItem = {
    productId : ProductId;
    quantity : Nat;
    name : Text;
    price : Nat;
    imageUrl : Text;
  };

  public type CartSummary = {
    items : [CartItem];
    totalItems : Nat;
    totalPrice : Nat;
  };
};

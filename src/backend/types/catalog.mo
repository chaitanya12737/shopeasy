import Common "common";

module {
  public type ProductId = Common.ProductId;

  public type Product = {
    id : ProductId;
    name : Text;
    price : Nat;
    description : Text;
    imageUrl : Text;
    category : Text;
    stock : Nat;
  };
};

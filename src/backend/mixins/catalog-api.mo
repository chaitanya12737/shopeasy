import Types "../types/catalog";
import CatalogLib "../lib/catalog";
import List "mo:core/List";

mixin (
  products : List.List<CatalogLib.Product>,
) {
  public query func listProducts(searchTerm : ?Text, category : ?Text) : async [Types.Product] {
    CatalogLib.listProducts(products, searchTerm, category);
  };

  public query func getProduct(id : Types.ProductId) : async ?Types.Product {
    CatalogLib.getProduct(products, id);
  };
};

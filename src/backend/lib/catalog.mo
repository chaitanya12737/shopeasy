import Types "../types/catalog";
import List "mo:core/List";
import Text "mo:core/Text";

module {
  public type Product = Types.Product;
  public type ProductId = Types.ProductId;

  public func listProducts(
    products : List.List<Product>,
    searchTerm : ?Text,
    category : ?Text,
  ) : [Product] {
    let filtered = products.filter(func(p : Product) : Bool {
      let matchesSearch = switch (searchTerm) {
        case null true;
        case (?term) {
          let lowerName = p.name.toLower();
          let lowerDesc = p.description.toLower();
          let lowerTerm = term.toLower();
          lowerName.contains(#text lowerTerm) or lowerDesc.contains(#text lowerTerm);
        };
      };
      let matchesCategory = switch (category) {
        case null true;
        case (?cat) p.category == cat;
      };
      matchesSearch and matchesCategory;
    });
    filtered.toArray();
  };

  public func getProduct(
    products : List.List<Product>,
    id : ProductId,
  ) : ?Product {
    products.find(func(p : Product) : Bool { p.id == id });
  };

  public func addProduct(
    products : List.List<Product>,
    nextId : Nat,
    name : Text,
    price : Nat,
    description : Text,
    imageUrl : Text,
    category : Text,
    stock : Nat,
  ) : Product {
    let product : Product = {
      id = nextId;
      name;
      price;
      description;
      imageUrl;
      category;
      stock;
    };
    products.add(product);
    product;
  };

  public func updateStock(
    products : List.List<Product>,
    id : ProductId,
    delta : Int,
  ) : Bool {
    switch (products.findIndex(func(p : Product) : Bool { p.id == id })) {
      case null false;
      case (?idx) {
        let p = products.at(idx);
        let newStock : Int = p.stock.toInt() + delta;
        if (newStock < 0) {
          false;
        } else {
          products.put(idx, { p with stock = newStock.toNat() });
          true;
        };
      };
    };
  };

  // Seed sample products into the list, returns next available id after seeding
  public func seedProducts(products : List.List<Product>) : Nat {
    let sampleProducts : [(Text, Nat, Text, Text, Text, Nat)] = [
      // (name, price_cents, description, imageUrl, category, stock)
      ("Wireless Bluetooth Headphones", 7999, "Premium noise-cancelling headphones with 30hr battery life", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", "Electronics", 50),
      ("Smartphone Stand & Charger", 2499, "Adjustable phone stand with built-in 15W wireless charging", "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=400", "Electronics", 75),
      ("USB-C Laptop Hub", 4999, "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader", "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400", "Electronics", 40),
      ("Classic White T-Shirt", 1999, "100% organic cotton, relaxed fit, available in all sizes", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", "Clothing", 200),
      ("Slim Fit Jeans", 5999, "Modern slim fit denim jeans with stretch fabric", "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", "Clothing", 120),
      ("Running Sneakers", 8999, "Lightweight breathable running shoes with cushioned sole", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", "Clothing", 80),
      ("Ceramic Plant Pot Set", 3499, "Set of 3 handcrafted ceramic pots, perfect for succulents", "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400", "Home & Garden", 60),
      ("Bamboo Cutting Board", 2999, "Extra-large eco-friendly bamboo cutting board with juice groove", "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400", "Home & Garden", 90),
      ("LED Desk Lamp", 4499, "Adjustable brightness desk lamp with USB charging port", "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400", "Home & Garden", 55),
      ("The Art of Clean Code", 1999, "A practical guide to writing elegant, maintainable software", "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400", "Books", 150),
      ("Yoga Essentials: Mind & Body", 1499, "Comprehensive guide to yoga practices for beginners", "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400", "Books", 100),
      ("Adjustable Dumbbell Set", 12999, "Space-saving adjustable dumbbells from 5 to 52.5 lbs", "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400", "Sports", 30),
      ("Yoga Mat Premium", 3999, "Non-slip 6mm thick eco-friendly yoga mat with carry strap", "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400", "Sports", 70),
    ];

    var id = 1;
    for ((name, price, description, imageUrl, category, stock) in sampleProducts.values()) {
      let product : Product = { id; name; price; description; imageUrl; category; stock };
      products.add(product);
      id += 1;
    };
    id;
  };
};

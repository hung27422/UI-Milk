class Product {
  constructor(
    productId,
    productName,
    category,
    sku,
    description,
    price,
    images,
    brand,
    discountPrice,
    availability,
    ratingAndReviews,
    productVariants,
    productSpecifications,
    shippingInformation,
    relatedProducts
  ) {
    this.productId = productId;
    this.productName = productName;
    this.category = category;
    this.sku = sku;
    this.description = description;
    this.price = price;
    this.images = images;
    this.brand = brand;
    this.discountPrice = discountPrice;
    this.availability = availability;
    this.ratingAndReviews = ratingAndReviews;
    this.productVariants = productVariants;
    this.productSpecifications = productSpecifications;
    this.shippingInformation = shippingInformation;
    this.relatedProducts = relatedProducts;
  }
}
export default Product;
// // Sử dụng lớp Product để tạo một sản phẩm cụ thể
// const product1 = new Product(
//   "123456",
//   "Smartphone",
//   "Electronics",
//   "SKU123",
//   "A high-quality smartphone with advanced features.",
//   499.99,
//   ["image1.jpg", "image2.jpg"],
//   "BrandX",  
//   449.99,
//   true,
//   { rating: 4.5, reviews: 100 },
//   ["Size: 64GB", "Color: Black"],
//   'Weight: 150g, Dimensions: 5.7" x 2.8" x 0.3"',
//   "Standard Shipping",
//   ["Related Product 1", "Related Product 2"]
// );

// console.log(product1); // In thông tin sản phẩm ra màn hình

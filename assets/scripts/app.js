class Product {
  title;
  imageUrl;
  price;
  description;

  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

class ElementAttribute {
  constructor(attributeName, attributeValue) {
    this.name = attributeName;
    this.value = attributeValue;
  }
}

class Component {
  constructor(renderHook) {
    this.renderHookId = renderHook;
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }

    if (attributes && attributes.length > 0) {
      attributes.forEach(attribute => {
        rootElement.setAttribute(attribute.name, attribute.value);
      });
    }

    document.getElementById(this.renderHookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];
  constructor(renderHookId) {
    super(renderHookId);
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.price;
    }, 0);
    return sum;
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  orderBtnHandler() {
    console.log('Ordering All The Products!');
    console.log(this.items);
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</h2>
    `;
    const orderBtn = cartEl.querySelector('button');
    orderBtn.addEventListener('click', this.orderBtnHandler.bind(this));
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addToCartHandler() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
          <img src='${this.product.imageUrl}' alt = '${this.product.title}' >
          <div class='product-item__content'>
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart!</button>
          </div>
        </div>
      `;
    const addToCartBtn = prodEl.querySelector('button');
    addToCartBtn.addEventListener('click', this.addToCartHandler.bind(this));
  }
}

class ProductList extends Component {
  constructor(renderHookId) {
    super(renderHookId);
  }
  products = [
    new Product(
      'A pillow',
      'http://www.shophome2.com/images/products/lrg/home2-feather-and-down-pillow-HOM-108-F_lrg.jpg',
      39.99,
      'A soft and cozy pillow for you!'
    ),
    new Product(
      'A carpet',
      'https://cnet4.cbsistatic.com/img/Fxx6Wbb8WOl8MPpcMVOteDTiu38=/756x425/2018/04/30/d00eb37b-54a7-41a4-b50b-33d5de7113dc/img-20180429-185906.jpg',
      99.99,
      'An Armenian handcrafted carpet!'
    )
  ];

  render() {
    const prodList = this.createRootElement('ul', 'product-list');
    prodList.id = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod, prodList.id);
      productItem.render();
    }
  }
}

class Shop {
  render() {
    this.cart = new ShoppingCart('app');
    this.cart.render();
    const productList = new ProductList('app');
    productList.render();
  }
}

class App {
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

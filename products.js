const products = [
  { id: 1, name: "LV coat", price: 1000.00, category: "Clothing", image: "LV.png" },
  { id: 2, name: "Gucci pullover", price: 500.00, category: "Clothing", image: "gucci.png"  },
  { id: 3, name: "Supreme Hoodie", price: 60.00, category: "Clothing", image: "Supreme.png"  },
  { id: 4, name: "PDM Haltane", price: 330.00, category: "Fragrances", image: "Haltane.png"  },
  { id: 5, name: "Asus 5090 GPU", price: 4000.00, category: "Electronics", image: "5090.png"  },
  { id: 6, name: "Green Irish Tweet", price: 280.00, category: "Fragrances", image: "Tweet.png"  },
  { id: 7, name: "Asus monitor", price: 350.00, category: "Electronics", image: "Asus.png"  },
  { id: 8, name: "Beats solo 2", price: 250.00, category: "Electronics", image: "Beats.png"  },
  { id: 9, name: "Megamare", price: 150.00, category: "Fragrances", image: "Megamare.png"  },
  { id: 10, name: "Sony PlayStation 5", price: 600.00, category: "Electronics", image: "ps5.png"  }
];

function displayProducts() {
  const clothing = document.getElementById("clothing-products");
  const electronics = document.getElementById("electronics-products");
  const fragrances = document.getElementById("fragrance-products");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card mb-3";
    card.innerHTML = `
      <div class="card-content">
        <div class="img-container">
          <img src="${product.image}" alt="${product.name}" class="product-img">
        </div>
        <h1>${product.name}</h1>
        <p>£${product.price.toFixed(2)}</p>
        <button class="btn btn-danger" data-id="${product.id}">Add to Basket</button>
      </div>`;
    
    card.querySelector("button").addEventListener("click", () => addToBasket(product.id));

    // Only append if the container exists
    if (product.category === "Clothing" && clothing) {
      clothing.appendChild(card);
    } else if (product.category === "Electronics" && electronics) {
      electronics.appendChild(card);
    } else if (product.category === "Fragrances" && fragrances) {
      fragrances.appendChild(card);
    }
  });
}

function addToBasket(productId) {
  let basket = JSON.parse(localStorage.getItem('basket')) || [];
  const product = products.find(p => p.id === productId);
  const existing = basket.find(p => p.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    basket.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('basket', JSON.stringify(basket));
  alert(`${product.name} added to your basket!`);
  updateBasketCounter();
}

 // Counter for shopping basket
function updateBasketCounter() {
  const basket = JSON.parse(localStorage.getItem('basket')) || [];
  const count = basket.reduce((sum, item) => sum + item.quantity, 0);
  const counterEl = document.getElementById('basket-count');
  if (counterEl) counterEl.textContent = count;
}


displayProducts();

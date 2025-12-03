import { html, component, useState } from "https://unpkg.com/@pionjs/pion?module";
import "./components/SearchBar.js";
import "./components/QueryResult.js";
import "./components/ShoppingList.js";
import "./components/Toaster.js";
import { showToast } from "./components/Toaster.js";

function App(el) {
  const [cocktails, setCocktails] = useState([]);
  const [shoppingList, setShoppingList] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(0);

  const getIngredients = (cocktail) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      if (ingredient) ingredients.push(ingredient);
    }
    return ingredients;
  };

  const addToShoppingList = (cocktail) => {
    const ingredients = getIngredients(cocktail);
    let newItems = 0;

    const updatedList = new Set(shoppingList);
    ingredients.forEach((item) => {
      if (!updatedList.has(item)) {
        updatedList.add(item);
        newItems++;
      }
    });

    setShoppingList(updatedList);

    if (newItems > 0) {
      showToast(`${newItems} ingredient${newItems > 1 ? "s" : ""} added to shopping list.`);
    } else {
      showToast("All ingredients already added.");
    }
  };

  const removeFromShoppingList = (item) => {
    const updatedList = new Set(shoppingList);
    if (updatedList.delete(item)) {
      setShoppingList(updatedList);
      showToast("Ingredient removed from shopping list.");
    }
  };

  const nextPage = () => {
    if ((currentPage + 1) * 3 < cocktails.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const start = currentPage * 3;
  const visibleCocktails = cocktails.slice(start, start + 3);

  return html`
    <div class="app-container">
      <h1 class="app-title">Cocktail Shopper</h1>

      <search-bar
        @results=${(e) => {
          setCocktails(e.detail);
          setCurrentPage(0);
          showToast(e.detail.length ? "Here are the results." : "No results found.");
        }}
      ></search-bar>

      <div class="results-container">
        ${cocktails.length
          ? html`
              ${visibleCocktails.map(
                (c) =>
                  html`<query-result
                    .cocktail=${c}
                    @add=${() => addToShoppingList(c)}
                  ></query-result>`
              )}
              <div class="pagination-buttons">
                ${currentPage > 0
                  ? html`<button class="prev-button" @click=${prevPage}>← Prev</button>`
                  : ""}
                ${(currentPage + 1) * 3 < cocktails.length
                  ? html`<button class="next-button" @click=${nextPage}>Next →</button>`
                  : ""}
              </div>
            `
          : ""}
      </div>

      <shopping-list
        .items=${[...shoppingList]}
        @remove=${(e) => removeFromShoppingList(e.detail)}
      ></shopping-list>
    </div>
    
    <style>
        body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.app-container {
  max-width: 600px;
  margin: 80px auto;
  text-align: center;
  position: relative;
}

.app-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.prev-button,
.next-button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #0e98d4;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.prev-button:hover,
.next-button:hover {
  background-color: #0c82b6;
}

.prev-button:hover,
.next-button:hover {
  background-color: #0c82b6;
}
@media (max-width: 1024px) {
  .app-container {
    margin: 60px auto;
    max-width: 90%;
  }

  .shopping-list {
    position: relative;
    width: 100%;
    max-height: 300px;
    margin-top: 20px;
    right: auto;
  }

  .print-button-container {
    text-align: center;
  }

  .pagination-buttons {
    margin-right: 0;
  }

}

@media (max-width: 768px) {
  .app-container {
    margin: 60px auto;
    max-width: 90%;
  }

  .shopping-list {
    position: relative;
    width: 100%;
    max-height: 300px;
    margin-top: 20px;
    right: auto;
  }

  .print-button-container {
    text-align: center;
  }

  .pagination-buttons {
    margin-right: 0;
  }
}


@media (max-width: 480px) {
  .app-container {
    margin: 40px auto;
    padding: 0 10px;
  }

  .app-title {
    font-size: 1.6rem;
  }

  .search-bar {
    flex-direction: column;
    gap: 10px;
  }

  .search-input {
    width: 100%;
    border-radius: 6px;
  }

  .search-button {
    width: 100%;
    border-radius: 6px;
  }

  .shopping-list {
    width: 100%;
    max-height: 280px;
    top: auto;
    position: relative;
  }

  .pagination-buttons {
    flex-direction: column;
    gap: 8px;
    margin-right: 0;
  }

  .prev-button,
  .next-button {
    width: 100%;
  }
}

    </style>

  `;
}

customElements.define("my-app", component(App));

import { html, component, useState, useEffect } from "https://unpkg.com/@pionjs/pion?module";
import { showToast } from "./Toaster.js";

function SearchBar(el) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    showToast("Searching...");

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`)
      .then(res => res.json())
      .then(data => {
        const drinks = data.drinks || [];

        const resultsEvent = new CustomEvent("results", {
          detail: drinks,
          bubbles: true,
          composed: true,
        });
        el.dispatchEvent(resultsEvent);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleSearch("margarita");
  }, []);

  return html`
    <div class="search-container">
      <div class="search-bar">
        <input
          class="search-input"
          type="text"
          placeholder="Search cocktails..."
          value=${query}
          @input=${e => setQuery(e.target.value)}
          @keydown=${e => e.key === "Enter" && handleSearch()}
        />
        <button class="search-button" @click=${() => handleSearch()}>
          Search
        </button>
      </div>
    </div>

    <style>
      .search-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 40px auto;
        width: 100%;
      }

      .search-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 0px;
        max-width: 800px;
        width: 100%;
      }

      .search-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 6px 0 0 6px;
        font-size: 1rem;
        min-width: 200px;
      }

      .search-button {
        padding: 11px 16px;
        border: none;
        background-color: #0E98D4;
        color: white;
        border-radius: 0 6px 6px 0;
        cursor: pointer;
      }
    </style>
  `;
}

customElements.define("search-bar", component(SearchBar));

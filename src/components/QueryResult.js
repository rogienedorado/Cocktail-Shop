import { html, component } from "https://unpkg.com/@pionjs/pion?module";

function QueryResult(el) {
  const { cocktail } = el;

  const handleAdd = () => {
    const addEvent = new CustomEvent("add", {
      detail: cocktail,
      bubbles: true,
      composed: true,
    });
    el.dispatchEvent(addEvent);
  };

  return html`
    <div class="cocktail-item">
      <img
        src="${cocktail.strDrinkThumb || "cocktail.png"}"
        alt="${cocktail.strDrink}"
        class="cocktail-thumbnail"
      />
      <div class="cocktail-info">
        <h3 class="cocktail-name">${cocktail.strDrink}</h3>
        <p class="cocktail-instructions">
          ${cocktail.strInstructions || "No instructions available."}
        </p>
        <button class="add-button" @click=${handleAdd}>+</button>
      </div>
    </div>

    <style>
      .cocktail-item {
        display: flex;
        gap: 10px;
        border: 1px solid #ccc;
        border-radius: 6px;
        padding: 10px;
        margin: 23px 0 12px -100px;
        background-color: #bce2f5;
        width: 470px;
        min-height: 200px;
        box-sizing: border-box;
        transition: all 0.3s ease;
      }

      .cocktail-thumbnail {
        width: 150px;
        height: 180px;
        object-fit: cover;
        border-radius: 6px;
      }

      .cocktail-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
      }

      .cocktail-name {
        margin: 0 0 5px;
        font-size: 1.2rem;
      }

      .cocktail-instructions {
        margin: 0 0 8px;
        font-size: 0.95rem;
        color: #555;
      }

      .add-button {
        padding: 6px 12px;
        border-radius: 6px;
        border: none;
        background-color: #0e98d4;
        color: #fff;
        cursor: pointer;
        font-size: 0.9rem;
        margin: 10px 0 0 auto;
      }

      @media (max-width: 1024px) {
        .cocktail-item {
          width: 100%;
          margin: 20px auto;
          max-width: 600px;
        }

        .cocktail-thumbnail {
          width: 130px;
          height: 160px;
        }
      }

      @media (max-width: 768px) {
        .cocktail-item {
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 90%;
          margin: 20px auto;
        }

        .cocktail-thumbnail {
          width: 80%;
          height: auto;
          max-height: 250px;
        }

        .cocktail-info {
          align-items: center;
        }

        .add-button {
          margin: 10px auto 0;
          width: 60%;
        }
      }

      @media (max-width: 480px) {
        .cocktail-name {
          font-size: 1rem;
        }

        .cocktail-instructions {
          font-size: 0.85rem;
        }

        .add-button {
          width: 80%;
          font-size: 0.85rem;
          padding: 8px 12px;
        }
      }
    </style>
  `;
}

customElements.define("query-result", component(QueryResult));

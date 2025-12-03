import { html, component } from "https://unpkg.com/@pionjs/pion?module";

function ShoppingList(el) {
  const { items = [] } = el;

  const handleRemove = (item) => {
    const removeEvent = new CustomEvent("remove", {
      detail: item,
      bubbles: true,
      composed: true,
    });
    el.dispatchEvent(removeEvent);
  };

  const handlePrint = () => window.print();

  return html`
    <section class="shopping-list">
      <div class="h2-container">
        <h2>Shopping List</h2>
      </div>
      <hr />
      <div class="list-container">
        <ul>
          ${items.length > 0
            ? items.map(
                (item) => html`
                  <li>
                    ${item}
                    <button
                      class="remove-button"
                      @click=${() => handleRemove(item)}
                    >
                      ×
                    </button>
                  </li>
                `
              )
            : html`<li>No ingredients yet.</li>`}
        </ul>
      </div>

      <div class="print-button-container">
        <button class="print-button" @click=${handlePrint}>Print</button>
      </div>
    </section>

    <style>
      .shopping-list {
        position: absolute;
        background-image: url("/src/images/cocktail3.jpg");
        background-size: cover;
        top: 154px;
        right: -80px;
        width: 250px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        text-align: left;
        height: auto;
        max-height: 397px;
        transition: all 0.3s ease;
      }

      .list-container {
        height: 400px; /* adjust as needed */
        max-width: 210px;
        overflow-y: auto; /* scroll when items exceed height */
        transition: all 0.3s ease;
      }

      .shopping-list .h2-container {
        margin-top: 20px;
        text-align: center;
        align-items: center;
      }
      
      .shopping-list .list-container {
        margin-left: 20px;
        max-height: 250px;
      }

      .shopping-list ul {
        list-style-type: none;
        padding: 0;
        margin: 0 0 20px 0;
      }

      .shopping-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 10px;
        padding-top: 8px;
      }

      .remove-button {
  background-color: white;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 2px 4px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 10px;
}

      .print-button-container {
        position: sticky;
        bottom: 10px;
        padding-top: 13px;
        padding-left: 14px;
        text-align: left;
      }
      .print-button {
        background: #0e98d4;
        border: none;
        color: #fff;
        padding: 12px 20px;
        border-radius: 6px;
        cursor: pointer;
      }

      .print-button:hover {
        background: #0c82b6;
      }
    </style>
  `;
}

customElements.define("shopping-list", component(ShoppingList));

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
      <h2>Shopping List</h2>
      <hr />
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

      <div class="print-button-container">
        <button class="print-button" @click=${handlePrint}>Print</button>
      </div>
    </section>

    <style>
      .shopping-list {
        position: absolute;
        top: 160px;
        right: -80px;
        width: 250px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
        text-align: left;
        height: auto;
        max-height: 500px;
        overflow-y: auto;
        transition: all 0.3s ease;
      }

      .shopping-list h2 {
        margin-top: 0;
      }

      .shopping-list ul {
        list-style-type: none;
        padding: 0;
        margin: 0 0 60px 0;
      }

      .shopping-list li {
        padding-bottom: 10px;
      }

      .remove-button {
        margin-left: 10px;
        background-color: white;
        color: black;
        border: none;
        border-radius: 4px;
        padding: 2px 6px;
        cursor: pointer;
        font-weight: bold;
      }

      .print-button-container {
        position: sticky;
        bottom: 10px;
        background-color: #fff;
        padding-top: 10px;
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
    </style>
  `;
}

customElements.define("shopping-list", component(ShoppingList));

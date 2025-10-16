import { html, render } from "https://unpkg.com/lit-html?module";

let message = "";
let visible = false;
let autoHideTimeout = null;

export const showToast = (text) => {
  message = text;
  visible = true;
  renderToast();

  clearTimeout(autoHideTimeout);
  autoHideTimeout = setTimeout(() => {
    visible = false;
    renderToast();
  }, 3000);
};

export const hideToast = () => {
  visible = false;
  renderToast();
};

export const Toaster = () => html`
  <div class="toaster ${visible ? "show" : ""}">${message}</div>

  <style>
    .toaster {
      position: fixed;
      bottom: 40px;
      right: 500px;

      background-color: #0e98d4;
      color: #fff;
      font-weight: 600;
      padding: 16px 24px;
      border-radius: 6px;

      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
      pointer-events: none;

      z-index: 1000;
    }

    .toaster.show {
      opacity: 1;
      visibility: visible;
    }

    @media (max-width: 768px) {
      .toaster {
        bottom: 30px;
        right: 20px;
        font-size: 0.9rem;
        padding: 14px 20px;
      }
    }

    @media (max-width: 480px) {
      .toaster {
        bottom: 20px;
        right: 10px;
        left: 10px;
        text-align: center;
        font-size: 0.85rem;
        padding: 12px 16px;
      }
    }
  </style>
`;

function renderToast() {
  const container = document.querySelector("#toaster");
  if (!container) return;
  render(Toaster(), container);
}

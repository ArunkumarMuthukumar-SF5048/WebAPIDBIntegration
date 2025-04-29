
import { renderHome } from "../pages/home";
import { renderReturnBook } from "../pages/ReturnBook";
import { renderWallet } from "../pages/wallet";
import { renderBooks } from "../pages/books";
import { renderBorrowBook } from "../pages/BorrowBook";
import * as APICALLS from "../api/apicalls";
export function renderNavbar(container: HTMLElement, rerenderApp: () => void) {
    const nav = document.createElement("div");
    nav.className = "navbar";
    nav.innerHTML = `
      <button data-page="home">Home</button>
      <button data-page="books">Books</button>
      <button data-page="BorrowBook">BorrowBook</button>
      <button data-page="ReturnBook">Return Book</button>
      <button data-page="wallet">Wallet</button>
      <button id="logout">Logout</button>
    `;
  
    nav.querySelectorAll("button[data-page]").forEach(btn =>
      btn.addEventListener("click", () => {
        const page = btn.getAttribute("data-page")!;
        renderPage(container, page);
      })
    );
  
    nav.querySelector("#logout")!.addEventListener("click", async () => {
      await APICALLS.logout();
      rerenderApp();
    });
  
    container.appendChild(nav);
  }
  
  export function renderPage(container: HTMLElement, page: string) {
    const content = document.createElement("div");
    content.className = "page";
  
    switch (page) {
      case "home":
        renderHome(content);
        break;
      case "books":
        renderBooks(content);
        break;
      case "BorrowBook":
        renderBorrowBook(content);
        break;
      case "ReturnBook":
        renderReturnBook(content);
        break;
      case "wallet":
        renderWallet(content);
        break;
      default:
        content.innerText = "Page not found.";
    }
  
    const oldPage = container.querySelector(".page");
    if (oldPage) container.removeChild(oldPage);
    container.appendChild(content);
  }
  
import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import { UserProvider, UserConsumer } from "./UserContext";
import { EmailProvider } from "./EmailContext";
import "./index.css";

function Root() {
  return (
    <UserConsumer>
      {({ user }) => (user ? <MainPage /> : <LoginPage />)}
    </UserConsumer>
  );
}

window.addEventListener("DOMContentLoaded", () => {
  let el = document.createElement("div");
  el.id = "app";
  document.body.appendChild(el);
  ReactDOM.render(
    <UserProvider>
      <EmailProvider>
        <Root />
      </EmailProvider>
    </UserProvider>,
    el
  );
});

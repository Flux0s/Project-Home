import { MDCRipple } from "@material/ripple";
import { MDCTextField } from "@material/textfield";

const username = new MDCTextField(document.querySelector(".login-username"));
const password = new MDCTextField(document.querySelector(".login-password"));

new MDCRipple(document.querySelector(".login-next"));
new MDCRipple(document.querySelector(".config-logout"));

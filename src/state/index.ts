import CompareStore from "./stores/CompareStore";
import AuthStore from "./stores/AuthStore";


export const stores = {
    authStore: new AuthStore(),
    compareStore: new CompareStore()
}
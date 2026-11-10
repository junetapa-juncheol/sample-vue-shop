import { createStore } from 'vuex';
import { products } from '../catalog';

export const storageKey = 'sowol-cart-v1';
function readCart() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return { cart: [], storageWarning: '' };
    const parsed = JSON.parse(saved);
    if (
      !Array.isArray(parsed) ||
      !parsed.every(
        (line) =>
          line &&
          products.some((product) => product.id === line.id) &&
          Number.isInteger(line.quantity) &&
          line.quantity >= 1 &&
          line.quantity <= 9,
      ) ||
      new Set(parsed.map((line) => line.id)).size !== parsed.length
    )
      throw new Error('Invalid cart');
    return {
      cart: parsed.map(({ id, quantity }) => ({ id, quantity })),
      storageWarning: '',
    };
  } catch {
    return {
      cart: [],
      storageWarning:
        '저장된 장바구니를 읽을 수 없어 비어 있는 장바구니로 시작합니다.',
    };
  }
}

export default createStore({
  strict: true,
  state: readCart,
  getters: {
    items: (state) =>
      state.cart.map((line) => ({
        ...products.find((product) => product.id === line.id),
        quantity: line.quantity,
      })),
    count: (state) => state.cart.reduce((sum, line) => sum + line.quantity, 0),
    total: (_state, getters) =>
      getters.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  mutations: {
    add(state, id) {
      if (!products.some((product) => product.id === id)) return;
      const line = state.cart.find((item) => item.id === id);
      if (line) line.quantity = Math.min(9, line.quantity + 1);
      else state.cart.push({ id, quantity: 1 });
    },
    quantity(state, { id, quantity }) {
      const line = state.cart.find((item) => item.id === id);
      if (!line || !Number.isInteger(quantity)) return;
      if (quantity <= 0)
        state.cart = state.cart.filter((item) => item.id !== id);
      else line.quantity = Math.min(9, quantity);
    },
    remove(state, id) {
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    storageProblem(state) {
      state.storageWarning =
        '브라우저에 저장할 수 없습니다. 이번 화면에서만 장바구니가 유지됩니다.';
    },
  },
  plugins: [
    (store) =>
      store.subscribe((mutation, state) => {
        if (mutation.type === 'storageProblem') return;
        try {
          localStorage.setItem(storageKey, JSON.stringify(state.cart));
        } catch {
          if (!state.storageWarning) store.commit('storageProblem');
        }
      }),
  ],
});

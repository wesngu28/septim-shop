import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type RootState } from "./store";

type Item = {
  name: string
  image: string
  price: number
  qty: number
}

interface CartState {
  cart: Array<Item>
}

const initialState: CartState = {
  cart: [] as Array<Item>
}

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const item = action.payload;
      const index = state.cart.findIndex((cartItem) => cartItem.name === item.name);

      if (index !== -1 && state.cart[index]) {
        (state.cart[index] as Item).qty += 1;
      } else {
        state.cart.push(item);
      }
    },
    changeQty: (state, action: PayloadAction<[string, boolean]>) => {
      const [itemName, change] = action.payload;
      const item = state.cart.find(item => item.name === itemName);
      if (item) {
        item.qty += change ? 1 : -1;
        if (item.qty === 0) {
          state.cart = state.cart.filter(item => item.name !== itemName);
        }
      }
      return state;
    }
  },
})

export const { addItem, changeQty } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer
import {
  RESET_CART,
  SET_CART,
  SET_ORDERS,
  SET_ORDERS_LOADING,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_COUNT,
  TOGGLE_CART_ITEM,
  SET_ADDRESSES,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  SET_SELECTED_ADDRESS,
  SET_ADDRESS_LOADING,
  SET_CARDS,
  ADD_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  SET_SELECTED_CARD,
  SET_CARD_LOADING,
} from '../actions/actionTypes';

/*
  cart shape:
  [
    { count: 1, checked: true, product: { id: "1235", ... } },
    { count: 3, checked: true, product: { id: "1236", ... } },
  ]
*/

const initialState = {
  cart:            [],
  payment:         {},
  address:         {},
  addresses:       [],
  selectedAddress: null,
  addressLoading:  false,
  cards:           [],
  selectedCard:    null,
  cardLoading:     false,
  orders:          [],
  ordersLoading:   false,
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_CART:
      return {
        ...state,
        cart:            [],
        selectedAddress: null,
        selectedCard:    null,
      };

    case SET_CART:
      return { ...state, cart: action.payload };

    case ADD_TO_CART: {
      const existing = state.cart.findIndex((item) => item.product.id === action.payload.id);
      if (existing !== -1) {
        /* Increase count of existing item */
        const updated = state.cart.map((item, i) =>
          i === existing ? { ...item, count: item.count + 1 } : item
        );
        return { ...state, cart: updated };
      }
      /* Add new item */
      return {
        ...state,
        cart: [...state.cart, { count: 1, checked: true, product: action.payload }],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };

    case UPDATE_CART_COUNT: {
      const { productId, count } = action.payload;
      if (count < 1) {
        return { ...state, cart: state.cart.filter((item) => item.product.id !== productId) };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === productId ? { ...item, count } : item
        ),
      };
    }

    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        ),
      };

    case SET_PAYMENT:
      return { ...state, payment: action.payload };

    case SET_ADDRESS:
      return { ...state, address: action.payload };

    case SET_ADDRESSES:
      return { ...state, addresses: action.payload };

    case ADD_ADDRESS:
      return { ...state, addresses: [...state.addresses, action.payload] };

    case UPDATE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };

    case DELETE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter((a) => a.id !== action.payload),
        selectedAddress:
          state.selectedAddress === action.payload ? null : state.selectedAddress,
      };

    case SET_SELECTED_ADDRESS:
      return { ...state, selectedAddress: action.payload };

    case SET_ADDRESS_LOADING:
      return { ...state, addressLoading: action.payload };

    case SET_CARDS:
      return { ...state, cards: action.payload };

    case ADD_CARD:
      return { ...state, cards: [...state.cards, action.payload] };

    case UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((c) => c.id !== action.payload),
        selectedCard:
          state.selectedCard === action.payload ? null : state.selectedCard,
      };

    case SET_SELECTED_CARD:
      return { ...state, selectedCard: action.payload };

    case SET_CARD_LOADING:
      return { ...state, cardLoading: action.payload };

    case SET_ORDERS:
      return { ...state, orders: action.payload };

    case SET_ORDERS_LOADING:
      return { ...state, ordersLoading: action.payload };

    default:
      return state;
  }
}

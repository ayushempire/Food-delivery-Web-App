import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();

const CartDispacthContext = createContext();

const reducer = (state, action) => {
  // switch case
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(
            food.qty,
            parseInt(action.qty),
            action.price + food.price
          );
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;

    case "DROP":
      let empArray = [];
      return empArray;

    default:
      console.log("error in Reducer");
  }
};

export const CartProvider = ({ children }) => {
  // initial value is empty array to append and delete values
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispacthContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispacthContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispacthContext);

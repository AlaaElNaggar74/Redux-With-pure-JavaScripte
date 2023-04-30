// document.getElementsByTagName("h1")[0].addEventListener("click",(e)=>{
//   e.target.style.cssText="color:orange"
// });

// console.log("x");
// console.log(Redux);
console.log(ReduxThunk);

let withdrawvalue = "withdraw";
let depositvalue = "deposit";
let addproductvalue = "addproduct";
let removeproducvaluet = "removeproduct";
let getproductvaluet = "getproduct";

let banckaction = {
  type: "withdraw",
};

// Actions Creator  Start

let withdraw = (value) => {
  return {
    type: withdrawvalue,
    payload: value,
  };
};
let deposit = (value) => {
  return {
    type: depositvalue,
    payload: value,
  };
};
let addproduct = (value) => {
  return {
    type: addproductvalue,
    payload: value,
  };
};
let removeproduct = (value) => {
  return {
    type: removeproducvaluet,
    payload: value,
  };
};
let getproduct = (value) => {
  return {
    type: getproductvaluet,
    payload: value,
  };
};
// store.dispatch(fetchproduct());

let fetchproduct=  ()=>{
  return async (dispatch)=>{
    let res=await fetch('https://fakestoreapi.com/products');
    let data=await res.json();
    console.log(data);
    store.dispatch(getproduct(data));

  }

}
// let fetchproduct=()=>{
//   return async (dispatch)=>{
//     let res=await fetch('https://fakestoreapi.com/products');
//     let data=await res.json();
//     console.log(data);
//     store.dispatch(getproduct(data));

//   }
// }

// Actions Creator  End

let bankreducer = (state = 1000, action) => {
  switch (action.type) {
    case withdrawvalue:
      return state - action.payload;

    case depositvalue:
      return state + action.payload;
    default:
      return state;
  }
};
let producteducer = (state = [], action) => {
  switch (action.type) {

    case getproductvaluet:
      return [...state,...action.payload];

    case addproductvalue:
      return [...state,action.payload];

    case depositvalue:
      return state;

    default:
      return state;
  }
};

let allreducer = Redux.combineReducers({
  bank: bankreducer,
  product: producteducer,
});
// let store = Redux.createStore(allreducer,Redux);
let store = Redux.createStore(allreducer,Redux.applyMiddleware(ReduxThunk));

// let store=Redux.createStore(bankreducer);

store.dispatch(withdraw(500));
store.dispatch(deposit(500));
store.dispatch(addproduct("500"));
store.dispatch(addproduct(["500","hhhhhhh","ghghgghghg"]));

console.log(store.getState());



console.log(store);
console.log(Redux);



let dispalytotal=document.querySelector("#dispalytotal");
let input=document.querySelector("#input");
let widthdrawbtn=document.querySelector("#widthdraw");
let depositbtn=document.querySelector("#deposit");

widthdrawbtn.addEventListener("click",()=>{
// console.log(input.value);
  store.dispatch(withdraw(+input.value));

});
depositbtn.addEventListener("click",()=>{
// console.log(input.value);
store.dispatch(deposit(+input.value));

});

dispalytotal.value=store.getState().bank;

store.subscribe(() => {
  console.log("Current State IS :", store.getState());
  dispalytotal.value=store.getState().bank;
});
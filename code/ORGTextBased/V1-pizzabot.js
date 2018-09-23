// Adam's first version - Text based Pizzabot
// NOW UPDATED TO VISUAL VERSION IN SEPARATE FILES

const pizzas = ["Vegetarian Pizza", "Hawaiian Pizza", "Pepperoni Pizza"]

// const vegetarian = "Vegetarian Pizza"
// const hawaiian = "Hawaiian Pizza"
// const pepperoni = "Pepperoni Pizza"

const pizzaPrice = 80

//Put your Javscript code here:


//GREETING AND MENU OPTIONS
alert(`Hey! Happy to serve your pizza. On our menu we have ${pizzas[0]}, ${pizzas[1]} and ${pizzas[2]}.`)

//USER ENTERS ORDER
let orderName = prompt("Enter the name of the pizza you want to order today.")

//CHECKS IF ORDER IS ON THE MENU, IF NOT ASK USER FOR NEW ORDER
let pizzaOnTheMenu = false;
const checkOrderName = () => {
  pizzas.forEach((pizza) => {
    if (orderName == pizza) {
      pizzaOnTheMenu = true
    }
  })
  if (!pizzaOnTheMenu) {
    orderName = prompt(`Sorry, we don't have ${orderName}, please order another option! We have ${pizzas[0]}, ${pizzas[1]} and ${pizzas[2]}.`);
    checkOrderName()
  }
}
checkOrderName()

//ASKS USER HOW FOR MANY PIZZAS TO MAKE
let orderQuantity = prompt(`How many of ${orderName} do you want?`)

while (isNaN(orderQuantity)) {
  orderQuantity = prompt(`Sorry, "${orderQuantity}" is not a number. How many of ${orderName} do you want?`)
}


//CALCULATES TOTAL COST
const totalCost = (orderQuantity) => {
  return orderQuantity * pizzaPrice
}
let orderTotal = totalCost(orderQuantity)

//CALCULATES TOTAL COOKING TIME
let cookingTime = 0;
const calcCookingTime = () => {
  if (orderQuantity > 6) {
    cookingTime = 20
  } else if (orderQuantity > 2) {
    cookingTime = 15
  } else {
    cookingTime = 10
  }
}
calcCookingTime()

//FINALIZES ORDER
alert(`Great, I'll get started on your ${orderName} right away, it will cost ${orderTotal} kr. The pizzas will take ${cookingTime} minutes.`)

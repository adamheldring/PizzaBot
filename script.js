//Adam's pizza bot script

const pizzas = ["Vegetarian Pizza", "Hawaiian Pizza", "Pepperoni Pizza"]
const pizzaPrice = 80
const balloonText = document.getElementById('textBox')
const button = document.getElementById('answerButton')
const answerText = document.getElementById('answerText')

let orderName
let orderQuantity
let pizzaOnTheMenu = false
let timeForQuantity = false
let orderFinalized = false
let clicksAfterFinal = -1


//FUNCTIONS SECTION

//Checks if order is on the menu, if not asks for new order.
const checkOrderName = () => {
  pizzas.forEach((pizza) => {
    if (orderName == pizza || orderName.toUpperCase() == pizza.toUpperCase()) {
      pizzaOnTheMenu = true
    }
  })
  if (!pizzaOnTheMenu) {
    balloonText.innerHTML = `Sorry, we don't have "${orderName}", please order another option! <br><br>We have ${pizzas[0]}, ${pizzas[1]} and ${pizzas[2]}.`
    orderName = undefined
  }
}

//Calculates total cost
const totalCost = (orderQuantity) => {
  return orderQuantity * pizzaPrice
}

//Calculates total cooking time
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

//STARTS PROGRAM SEQUENCE

balloonText.innerHTML = `Hey!<br> Happy to serve your pizza. On our menu we have ` +
                        `${pizzas[0]}, ${pizzas[1]} and ${pizzas[2]}. <br><br>` +
                        `Enter the name of the pizza you want to order today.`


//Every times the user clicks, checks for order stage and if answer is valid.
const clickHandler = () => {
  answer = answerText.value.trim()

  //Checks if user has ordered a specific pizza yet, if not takes order.
  if (!orderName) {
    orderName = answer
    checkOrderName(orderName)
    if (pizzaOnTheMenu) {
      balloonText.innerHTML = `How many of ${orderName} do you want?`
      answerText.value = ""
    }

  }

  //Updates question to how many, if ordered pizza is on the menu
  if (timeForQuantity) {
    if (isNaN(answer) || !answer) {
      balloonText.innerHTML = `Sorry, "${answer}" is not a number. How many of ${orderName} do you want?`
    } else {
      //Finalizes order when quantity is checked and is a number
      orderQuantity = answer
      const orderTotal = totalCost(orderQuantity)
      calcCookingTime()
      balloonText.innerHTML = `Great! <br> I'll get started on your ${orderName} right away. <br><br>` +
                              `It will cost ${orderTotal}kr. The pizzas will take ${cookingTime} minutes.`
      orderFinalized = true;
      answerText.value = ""
      button.value = "HURRY!"
    }
  }

  //Tells function when it's time to expect quantity order
  if (pizzaOnTheMenu) {
    timeForQuantity = true
  }

  //Checks for clicks after order is finalized, kicks out annoying customers
  if (orderFinalized) {
    clicksAfterFinal++
    if (clicksAfterFinal == 1) {
        balloonText.innerHTML = `I'm cooking your pizzas, you can pick them up in ${cookingTime} minutes.`
        button.style.color = "rgb(255,0,0)"
    } else if (clicksAfterFinal > 1 && clicksAfterFinal < 4){
        balloonText.innerHTML = `You have asked me ${clicksAfterFinal} times now! Still ${cookingTime} minutes to go!`
    } else if (clicksAfterFinal >= 4){
        balloonText.innerHTML = `No pizza for you! <br><br> Don't come back!`
    }
  }
}

// Listens for button clicks
button.addEventListener('click', clickHandler)

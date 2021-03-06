
const qs = (selector) => document.querySelector(selector)
const signUpForm = qs("form#signUp")
const switchClick = qs("#switch-login")
const body = qs("div#sign-up-div")
const page = qs("div#fullPage")
const pieChart = qs("div#piechart")
let allIncomes = []
let allExpenses = []
let allValues = {}


//Signup
signUpForm.addEventListener("submit", () => {
    event.preventDefault()
    if (event.target[0].value && event.target[1].value && event.target[2].value){
    fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: event.target[0].value,
            username: event.target[1].value,
            password: event.target[2].value
        })
    })
    .then(res => res.json())
    .then(userInfo => {
        if(userInfo.token){
            localStorage.token = userInfo.token
            localStorage.id = userInfo.id
            console.log(localStorage)
        }
        homePage()
    })
    }
    else{
        alert("Please fill in all fields.")
    }
})

//Switch to Login
switchClick.addEventListener("click", () => {
    event.preventDefault()
    body.innerHTML = `
            <div class="card-header bg-primary text-white"> Please sign in </div>
            <div class="card-body">
                <form id="login">
                    <div class="form-group">
                        <input type="text" class="form-control" id="InputUsername1" placeholder="Enter username">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="account-dialog-actions">
                        <button type="submit" class="btn btn-primary">Sign in</button>
                    </div>
                </form>
            </div>
    `
    //Login Event
    const login = qs("form#login")
    login.addEventListener("submit", () => {
        event.preventDefault()
        if (event.target[0].value && event.target[1].value){
        fetch("http://localhost:3000/api/v1/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: event.target[0].value,
                password: event.target[1].value
            })
        })
        .then(res => res.json())
        .then(userInfo => {
            if(userInfo.token){
                localStorage.token = userInfo.token
                localStorage.id = userInfo.id
                localStorage.username = userInfo.username
                console.log(localStorage)
            }
        })
        homePage()
        }
        else{
            alert("Please enter your username and password.")
        }
    })
})

async function fetchInc(){
try {
    const configObj = {
        method: "GET",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
        }
    }
    let unresolvedUser = await fetch(`http://localhost:3000/api/v1/users/${localStorage.id}`, configObj)
    let userJson = await unresolvedUser.json()
    let allincomes = userJson.incomes.map(income => income.value)
    return allincomes
}
catch(error){
    console.error('ERROR: ' + err)
    }
}

async function fetchExp(){
try {
    const configObj = {
        method: "GET",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
        }
    }
    let unresolvedUser = await fetch(`http://localhost:3000/api/v1/users/${localStorage.id}`, configObj)
    let userJson = await unresolvedUser.json()
    let allexpenses = userJson.expenses.map(expense => expense.value)
    return allexpenses
}
catch(error){
    console.error('ERROR: ' + err)
    }
}


//All Functionality after logging in or signing up
function homePage(){


//homepage layout
function home(){

    page.innerHTML = `
    <div class="dash">
        <div class="dash-nav dash-nav-dark">
            <header>
                <a href="#!" class="menu-toggle">
                    <i class="fas fa-bars"></i>
                </a>
                <a href="javascript:;" class="spur-logo"><i class="fas fa-search-dollar"></i> <span>BudgetUp</span></a>
            </header>
            <nav class="dash-nav-list">
                <a href="javascript:;" class="dash-nav-item">
                    <i class="fas fa-home"></i> Home </a>
                <a href="javascript:;" class="dash-nav-item">
                    <i class="fas fa-dollar-sign"></i> Incomes </a>
                <a href="javascript:;" class="dash-nav-item">
                    <i class="fas fa-calculator"></i> Expenses </a>
            </nav>
        </div>
        <div class="dash-app">
            <header class="dash-toolbar">
                <h4>Welcome to BudgetUp!</h4>
                <div class="tools">
                    <div class="dropdown tools-item">
                        <a href="#" class="" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-user"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                            <a href="index.html" class="dropdown-item" id="logoutHere"> Logout </a>
                            <a href="index.html" class="dropdown-item" id="deleteAccount"> Delete this Account </a>
                        </div>
                    </div>
                </div>
            </header>
            <main class="dash-content" id="mainPageContent">
                <div class="container-fluid">
                    <div class="row dash-row">
                        <div class="col-xl-4">
                            <div class="stats stats-primary">
                                <h3 class="stats-title"> Incomes </h3>
                                <div class="stats-content">
                                    <!-- <div class="stats-icon">
                                        <i class="fas fa-user"></i>
                                    </div> -->
                                    <div class="stats-data">
                                        <div id="MyTotalIncome" class="stats-number">$</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4">
                            <div class="stats stats-success ">
                                <h3 class="stats-title"> Expenses </h3>
                                <div class="stats-content">
                                    <!-- <div class="stats-icon">
                                        <i class="fas fa-cart-arrow-down"></i>
                                    </div> -->
                                    <div class="stats-data">
                                        <div id="MyTotalExpenses" class="stats-number">$</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4">
                            <div class="stats stats-danger">
                                <h2 class="stats-title"> Budget </h2>
                                <div class="stats-content">
                                    <!-- <div class="stats-icon">
                                        <i class="fas fa-phone"></i>
                                    </div> -->
                                    <div class="stats-data">
                                        <div id="BudgetTotal" class="stats-number">$</div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div class="col-lg-12">
                            <div class="card spur-card">
                                <div class="card-header ">
                                    <h5><div class="spur-card-title"> Some Budgeting Tips For You! </div></h5>
                                </div>
                                <div class="card-body "> 
                                <ul>
                                    <li>Make sure you track every income and expense.</li>
                                    <li>Review your spending habits and reflect on how you can improve.</li>
                                    <li>Set a realistic budget for yourself.</li>
                                    <li>Don't be afraid to make adjustments in everyday life.</li>
                                    <li>Understand the difference between needs and wants.</li>
                                    <li>Life doesn't control your money, you do!</li>
                                    <li>Save up for big purchases.</li>
                                    <li>Reward yourself on a budget.</li>
                                    <li>Keep a positive attitude!</li>
                                </ul>
                                </div>
                            </div>
                        </div>
                    <div id="newpiechart">
                        <!-- Doughnutchart -->
                    </div>
                </div>
            </main>
        </div>
    </div>
    `


    fetchInc().then(allincomes => {
        allValues[0] = allincomes
        const incomeTotal = page.querySelector("#MyTotalIncome")
        incomeTotal.innerText = `$${allincomes.reduce((a,b) => a+b, 0)}`
        budget()
    })
    

    fetchExp().then(allexpenses => {
        allValues[1] = allexpenses
        const expenseTotal = page.querySelector("#MyTotalExpenses")
        expenseTotal.innerText = `$${allexpenses.reduce((a,b) => a+b, 0)}`
        budget()
    })

    function budget(){
    const budgetTotal = page.querySelector("#BudgetTotal")
    budgetTotal.innerText = `$${(allValues[0].reduce((a,b) => a+b, 0)) - (allValues[1].reduce((a,b) => a+b, 0))}`
    }

}
home()

const mainHome = page.querySelectorAll(".dash-nav-item")[0]
function homeEvent(){
    mainHome.addEventListener("click", () => {
        if(localStorage.token){
        event.preventDefault()
        homePage()
        }
    })
}
homeEvent()

//Logout
const logoutBtn = page.querySelector("#logoutHere")
function logoutEvent(){
    logoutBtn.addEventListener("click", () => {
        var confirmLogout = confirm("Are you sure you want to log out?")
        if(confirmLogout == false){
            event.preventDefault()
        }
        else{
        console.log("logged out")
        localStorage.clear()
        }
    })
}
logoutEvent()

//delete user
const deleteAccountBtn = page.querySelector("#deleteAccount")
function deleteAccountEvent(){
    deleteAccountBtn.addEventListener("click", () => {
        var confirmDelete = confirm("Are you sure you want to delete this account?")
        if(confirmDelete == false){
            event.preventDefault()
        }
        else{
        const configObj = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        }
        fetch(`http://localhost:3000/api/v1/users/${localStorage.id}`, configObj)
        .then(localStorage.clear())
    }
    })
}
deleteAccountEvent()

const ce = (element) => document.createElement(element)
const mainDash = page.querySelector("main.dash-content")
const incomes = page.querySelectorAll(".dash-nav-item")[1]

class Income{
    constructor(id, user_id, name, value){
        this.id = id
        this.user_id = user_id
        this.name = name
        this.value = value
    }

    render(){
        const incomeBox = ce("div")
        incomeBox.className = "form-row"
        incomeBox.innerHTML = `
            <div class="form-group col-md-6">
                <input type="text" id="name" value="${this.name}" size="60">
            </div>
            <div class="form-group col-md-2">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <div class="input-group-text">$</div>
                </div>
                    <input type="text" id="incomeAmount" value="${this.value}" size="10">
                </div>
            </div>
                <button style="height:30px; width:80px; margin:5px;" type="submit" class="btn-primary">Update</button>
                <button style="height:30px; width:80px; margin:5px;" type="submit" id="del-income-btn" class="btn-primary">Delete</button>
        `
        const singleIncome = mainDash.querySelector(".card-body")
        singleIncome.append(incomeBox)
        allIncomes.length = 0 
        let allAmounts = singleIncome.querySelectorAll("input#incomeAmount")
        allAmounts.forEach(amount => allIncomes.push(parseInt(amount.value, 10)))
        
        const updateButton = incomeBox.querySelector(".btn-primary")
        updateButton.addEventListener("click", () => {
            event.preventDefault()
            const configObj = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: incomeBox.querySelector("#name").value,
                    value: incomeBox.querySelector("#incomeAmount").value
                })
            }
            fetch(`http://localhost:3000/api/v1/incomes/${this.id}`, configObj)
            .then(res => res.json())
            .then(updatedIncome => {
                updatedIncome.name = this.name
                updatedIncome.value = this.value
            })
            updateAlert()
        })

        function updateAlert(){
            const alert = ce("div")
            alert.className = "alert alert-success"
            alert.innerHTML = `
                <button type="button" class="close" data-dismiss="alert">×</button>  
                <strong>Success!</strong> Updated income successfully!   
            `
            singleIncome.append(alert)
        }

        const delBtn = incomeBox.querySelector("#del-income-btn")
        delBtn.addEventListener("click", () => {
            event.preventDefault()
            const configObj = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            }
            fetch(`http://localhost:3000/api/v1/incomes/${this.id}`, configObj)
            .then(() => incomeBox.remove())
        })
        
    }
}

// updates page layout when "Incomes" tab is clicked
function incomesEvent(){
    incomes.addEventListener("click", () => {
        if (localStorage.token){
        event.preventDefault()
        mainDash.innerHTML = `
        <form>
            <div class="row">
                <div class="col-xl-12">
                    <div class="card spur-card">
                        <div class="card-header">
                            <h2><div class="spur-card-title"> My Incomes </div></h2>
                        </div>
                        <div class="card-body">
                            
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn-primary">Add a New Income</button>
        </form> <br>
        <br>
        <form>
        <div class="row">
        <div class="col-xl-12">
            <div class="card spur-card">
                <div class="card-header bg-warning text-dark">
                    <h5><div class="spur-card-title"> Some Income Sources You May Be Forgetting: </div></h5>
                </div>
                <div class="card-body "> 
                <ul>
                    <li>Bonuses</li>
                    <li>Gifts</li>
                    <li>Stocks</li>
                    <li>Rental Properties</li>
                    <li>Investments</li>
                    <li>Child Care</li>
                    <li>High Yield Savings Accounts</li>
                    <li>Money Market Funds</li>
                    <li>Unemployment Benefits</li>
                    <li>Social Security Benefits</li>
                    <li>Inheritance Received</li>
                    <li>Blogs You Monetized</li>
                    <li>YouTube Channel</li>
                    <li>Cashback Rewards Cards</li>
                </ul>
                </div>
            </div>
        </div>
        </div>
        </form>
        
        `
        getIncomes()
        addButtonEvent()
    }
    })

}
incomesEvent()

//fetches all incomes of user
function getIncomes(){
     const configObj = {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
            }
         }
     fetch('http://localhost:3000/api/v1/incomes', configObj)
     .then(res => res.json())
     .then(incomes => addIncomes(incomes)) 
     .catch(err => {
        console.error('ERROR: ' + err)
      })
}

function addIncomes(incomes){
    incomes.forEach(income => {
        if (income.user_id == localStorage.id){
            addIncome(income)
        }
    })
    sumAllIncomes()
}

function sumAllIncomes(){
    allIncomes.reduce((a, b) => a + b, 0)
}

function addIncome(income){
    let add
    let newIncome = new Income(income.id, income.user_id, income.name, income.value)
    add = newIncome.render()
}

//When "Add Income" button is clicked
function addButtonEvent(){
    const addButton = mainDash.querySelectorAll(".btn-primary")[0]
    addButton.addEventListener("click", () => {
        event.preventDefault()
        const newIncomeBox = ce("form")
        newIncomeBox.className = "new-income"
        newIncomeBox.innerHTML = `
            <div class="form-row">
                <div class="form-group col-md-6">
                    <input type="text" placeholder="Income Source" size="60">
                </div>
                <div class="form-group col-md-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                        <div class="input-group-text">$</div>
                        </div>
                        <input type="text" placeholder="Amount" size="10">
                    </div>
                </div>
                <button style="height:30px; width:80px; margin:5px;" type="submit" id="add-income-btn" class="btn-primary">Add</button>
                <button style="height:30px; width:80px; margin:5px;" id="del-income-btn" class="btn-primary">Delete</button>
            </div>
        `
        
        const cardBody = mainDash.querySelector(".card-body")
        cardBody.append(newIncomeBox)

        const addIncomeData = cardBody.querySelector("form.new-income")
        addIncomeData.addEventListener("submit", () => {
            event.preventDefault()
            const configObj = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    user_id: localStorage.id, 
                    name: event.target[0].value,
                    value: event.target[1].value
                })
            }
            fetch(`http://localhost:3000/api/v1/incomes`, configObj)
            .then(res => res.json())
            .then(newIncome => addIncome(newIncome))
            newIncomeBox.innerHTML = ""
        })

        const delIncomeData = newIncomeBox.querySelector("#del-income-btn")
        delIncomeData.addEventListener("click", () => {
            event.preventDefault()
            const configObj = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }
            fetch(`http://localhost:3000/api/v1/incomes/${this.id}`, configObj)
            .then(() => newIncomeBox.remove())
        })

    })
}

const expenses = page.querySelectorAll(".dash-nav-item")[2]

class Expense{
    constructor(id, user_id, name, value){
        this.id = id
        this.user_id = user_id
        this.name = name
        this.value = value
        allExpenses.push(this.value)
    }


    render(){
        const expenseBox = ce("div")
        expenseBox.className = "form-row"
        expenseBox.innerHTML = `
            <div class="form-group col-md-6">
                <input type="text" id="name" value="${this.name}" size="60">
            </div>
            <div class="form-group col-md-2">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <div class="input-group-text">$</div>
                </div>
                    <input type="text" id="expenseAmount" value="${this.value}" size="10">
                </div>
            </div>
            <button style="height:30px; width:80px; margin:5px;" type="submit" class="btn-primary">Update</button>
            <button style="height:30px; width:80px; margin:5px;" type="submit" id="del-expense-btn" class="btn-primary">Delete</button>
        `
        const singleExpense = mainDash.querySelector(".card-body")
        singleExpense.append(expenseBox)
        pushExpenses()
        
        function pushExpenses(){
            allExpenses.length = 0
            let allValues = singleExpense.querySelectorAll("#expenseAmount")
            allValues.forEach(values => allExpenses.push(parseInt(values.value, 10)))    
        }
        
        const updateBtn = expenseBox.querySelector(".btn-primary")
        updateBtn.addEventListener("click", () => {
            event.preventDefault()
            const configObj = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: expenseBox.querySelector("#name").value,
                    value: expenseBox.querySelector("#expenseAmount").value
                })
            }
            fetch(`http://localhost:3000/api/v1/expenses/${this.id}`, configObj)
            .then(res => res.json())
            .then(updatedExpense => {
                updatedExpense.name = this.name
                updatedExpense.value = this.value
            })
            pushExpenses()
            updatedAlert()
        })

        function updatedAlert(){
            const alert = ce("div")
            alert.className = "alert alert-success"
            alert.innerHTML = `
                <button type="button" class="close" data-dismiss="alert">×</button>  
                <strong>Success!</strong> Updated expense successfully!   
            `
            singleExpense.append(alert)
        }


        const deleteBtn = expenseBox.querySelector("#del-expense-btn")
        deleteBtn.addEventListener("click", () => {
            event.preventDefault()
            allExpenses.filter(expense => expense.id != this.id)
            const configObj = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            }
            fetch(`http://localhost:3000/api/v1/expenses/${this.id}`, configObj)
            .then(() => expenseBox.remove())
        })
    }
}

// updates page layout when "expenses" tab is clicked
function expensesEvent(){
    expenses.addEventListener("click", () => {
        if (localStorage.token){
        event.preventDefault()
        mainDash.innerHTML = `
        <form>
            <div class="row">
                <div class="col-xl-12">
                    <div class="card spur-card">
                        <div class="card-header">
                            <h2><div class="spur-card-title"> My Expenses </div></h2>
                        </div>
                        <div class="card-body">
                            
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn-primary">Add a New Expense</button>
        </form> 
        <form>
        <div class="row mt-5">
        <div class="col-xl-12">
            <div class="card spur-card">
                <div class="card-header bg-warning text-dark">
                    <h5><div class="spur-card-title"> Some Expenses You May Be Forgetting: </div></h5>
                </div>
                <div class="card-body "> 
                <ul>
                    <li>Travel Expenses</li>
                    <li>Taxes</li>
                    <li>Insurances</li>
                    <li>Meals and Snacks</li>
                    <li>School or Office Supplies</li>
                    <li>Gas, Heat, and Other Utilities</li>
                    <li>Maintenance</li>
                    <li>Laundry</li>
                    <li>Wi-Fi, TV, Cable</li>
                    <li>Credit Card Payments</li>
                    <li>Legal Fees</li>
                    <li>Membership Fees</li>
                    <li>House Management</li>
                    <li>Personal Care Items</li>
                    <li>Car, Movie, Lottery Tickets</li>
                    <li>Magazines, Newspapers, Books</li>
                    <li>Hair Care and Salon Services</li>
                    <li>Entertainment and Recreation</li>
                </ul>
                </div>
            </div>
        </div>
        </div>
        </form>
        `
        getExpenses()
        addBtnEvent()
    }
    })
}
expensesEvent()



//fetches all expenses of user 
function getExpenses(){
    const configObj = {
        method: "GET",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
        }
     }
    fetch('http://localhost:3000/api/v1/expenses', configObj)
    .then(res => res.json())
    .then(expenses => addExpenses(expenses)) 
    .catch(err => {
        console.error('ERROR: ' + err)
    })
}

function addExpenses(expenses){
    expenses.forEach(expense => {
        if (expense.user_id == localStorage.id){
            addExpense(expense)
        }
    })
    sumAllExpenses()
}

function sumAllExpenses(){
    const sumExpenses = allExpenses.reduce((a, b) => a + b, 0)
}

function addExpense(expense){
    let add
    let newExpense = new Expense(expense.id, expense.user_id, expense.name, expense.value)
    add = newExpense.render()
}

//When "Add Expense" button is clicked
function addBtnEvent(){
    const addBtn = mainDash.querySelectorAll(".btn-primary")[0]
    addBtn.addEventListener("click", () => {
        event.preventDefault()
        const newExpenseBox = ce("form")
        newExpenseBox.className = "new-expense"
        newExpenseBox.innerHTML = `
            <div class="form-row">
                <div class="form-group col-md-6">
                    <input type="text" placeholder="Expense Source" size="60">
                </div>
                <div class="form-group col-md-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                        <div class="input-group-text">$</div>
                        </div>
                        <input type="text" placeholder="Amount" size="10">
                    </div>
                </div>
                <button style="height:30px; width:80px; margin:5px;" type="submit" id="add-expense-btn" class="btn-primary">Add</button>
                <button style="height:30px; width:80px; margin:5px;" id="del-expense-btn" class="btn-primary">Delete</button>
            </div>
        `
        
        const newCardBody = mainDash.querySelector(".card-body")
        newCardBody.append(newExpenseBox)

        const addExpenseData = newCardBody.querySelector("form.new-expense")
        addExpenseData.addEventListener("submit", () => {
            event.preventDefault()
            const configObj = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    user_id: localStorage.id, 
                    name: event.target[0].value,
                    value: event.target[1].value
                })
            }
            fetch(`http://localhost:3000/api/v1/expenses`, configObj)
            .then(res => res.json())
            .then(newExpense => addExpense(newExpense))
            newExpenseBox.innerHTML = ""
        })

        const delExpenseData = newExpenseBox.querySelector("#del-expense-btn")
        delExpenseData.addEventListener("click", () => {
            event.preventDefault()
            const configObj = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            }
            fetch(`http://localhost:3000/api/v1/expenses/${this.id}`, configObj)
            .then(() => newExpenseBox.remove())
        })

    })
}


}

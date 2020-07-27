
const qs = (selector) => document.querySelector(selector)
const signUpForm = qs("form#signUp")
const switchClick = qs("#switch-login")
const body = qs("div#sign-up-div")
const page = qs("div#fullPage")
let allIncomes = []
let allExpenses = []

//Signup
signUpForm.addEventListener("submit", () => {
    event.preventDefault()

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
    //Login
    const login = document.querySelector("form#login")
    login.addEventListener("submit", () => {
        event.preventDefault()

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
                console.log(localStorage)
            }
        })
        homePage()
    })
})

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
            <main class="dash-content">
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
                                        <div id="MyTotalIncome" class="stats-number">$${allIncomes.reduce((a, b) => a + b, 0)}</div>
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
                                        <div class="stats-number">$${allExpenses.reduce((a, b) => a + b, 0)}</div>
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
                                        <div class="stats-number">$${(allIncomes.reduce((a, b) => a + b, 0)) - (allExpenses.reduce((a, b) => a + b, 0))}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                    <div class="col-xl-6">
                    <div class="card spur-card">
                        <div class="card-header">
                            <div class="spur-card-icon">
                                <i class="fas fa-chart-bar"></i>
                            </div>
                            <div class="spur-card-title"> Incomes </div>
                            <div class="spur-card-menu">
                                <div class="dropdown show">
                                    <a class="spur-card-menu-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body spur-card-body-chart">
                            <canvas id="spurChartjsDougnut"></canvas>
                            <script>
                                var ctx = document.getElementById("spurChartjsDougnut").getContext('2d');
                                var myChart = new Chart(ctx, {
                                    type: 'doughnut',
                                    data: {
                                        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                        datasets: [{
                                            label: 'Week',
                                            data: [12, 19, 3, 5, 2],
                                            backgroundColor: [
                                                window.chartColors.primary,
                                                window.chartColors.secondary,
                                                window.chartColors.success,
                                                window.chartColors.superwarning,
                                                window.chartColors.danger,
                                            ],
                                            borderColor: '#fff',
                                            fill: false
                                        }]
                                    },
                                    options: {
                                        legend: {
                                            display: false
                                        }
                                    }
                                });
                            </script>
                        </div>
                    </div>
                </div>
                        <!-- Doughnutchart -->
                    </div>
                </div>
            </main>
        </div>
    </div>
    `
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
        console.log("logged out")
        localStorage.clear()
    })
}
logoutEvent()

//delete user
const deleteAccountBtn = page.querySelector("#deleteAccount")
function deleteAccountEvent(){
    deleteAccountBtn.addEventListener("click", () => {
        const configObj = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        }
        fetch(`http://localhost:3000/api/v1/users/${localStorage.id}`, configObj)
        .then(() => {
        localStorage.clear()
        })
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
                <button style="height:40px; width:80px; margin:5px;" type="submit" class="btn-primary">Update</button>
                <button style="height:40px; width:80px; margin:5px;" type="submit" id="del-income-btn" class="btn-primary">Delete</button>
        `
        const singleIncome = mainDash.querySelector(".card-body")
        singleIncome.append(incomeBox)
        allIncomes.length = 0 
        let allAmounts = singleIncome.querySelectorAll("input#incomeAmount")
        allAmounts.forEach(amount => allIncomes.push(parseInt(amount.value, 10)))
        
        const updateButton = incomeBox.querySelector(".btn-primary")
        updateButton.addEventListener("click", () => {
            event.preventDefault()
            console.log("working")
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
        <head>
        <style>
        h3 {
            background-color: #3F84FC;
            color: #FFFFFF;
        }
        </style>
        </head>
        <body>
        <h3 id="totalIncome" style="text-align:center">Total Income: </h3>
        </body>
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
    const sumIncomes = allIncomes.reduce((a, b) => a + b, 0)
    const addTotalIncome = mainDash.querySelector("#totalIncome")
    addTotalIncome.innerText = `Total Income: $${sumIncomes}`
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
                <button style="height:40px; width:80px; margin:5px;" type="submit" id="add-income-btn" class="btn-primary">Add</button>
                <button style="height:40px; width:80px; margin:5px;" id="del-income-btn" class="btn-primary">Delete</button>
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
            <button style="height:40px; width:80px; margin:5px;" type="submit" class="btn-primary">Update</button>
            <button style="height:40px; width:80px; margin:5px;" type="submit" id="del-expense-btn" class="btn-primary">Delete</button>
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
        </form> <br>
        <br>
        <head>
        <style>
        h3 {
            background-color: #1DAB47;
            color: #FFFFFF;
        }
        </style>
        </head>
        <body>
        <h3 id="totalExpense" style="text-align:center">Total Expenses: </h3>
        </body>
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
    const addTotalExpense = mainDash.querySelector("#totalExpense")
    addTotalExpense.innerText = `Total Expense: $${sumExpenses}`
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
                <button style="height:40px; width:80px; margin:5px;" type="submit" id="add-expense-btn" class="btn-primary">Add</button>
                <button style="height:40px; width:80px; margin:5px;" id="del-expense-btn" class="btn-primary">Delete</button>
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

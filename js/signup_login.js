const qs = (selector) => document.querySelector(selector)
const signUpForm = qs("form#signUp")
const switchClick = qs("#switch-login")
const body = qs("div#sign-up-div")
const page = qs("div#fullPage")

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
            console.log(localStorage)
        }
    })
})

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
                console.log(localStorage)
            }
        })
        homePage()
    })
})

function homePage(){
    page.innerHTML = `
    <div class="dash">
        <div class="dash-nav dash-nav-dark">
            <header>
                <a href="#!" class="menu-toggle">
                    <i class="fas fa-bars"></i>
                </a>
                <a href="index.html" class="spur-logo"><i class="fas fa-bolt"></i> <span>Budget Tracker</span></a>
            </header>
            <nav class="dash-nav-list">
                <a href="index.html" class="dash-nav-item">
                    <i class="fas fa-home"></i> Home </a>
                <a href="index.html" class="dash-nav-item">
                    <i class="fas fa-dollar-sign"></i> Incomes </a>
                <a href="index.html" class="dash-nav-item">
                    <i class="fas fa-calculator"></i> Expenses </a>
                <a href="index.html" class="dash-nav-item">
                    <i class="fas fa-user"></i> Profile </a>
            </nav>
        </div>
        <div class="dash-app">
            <header class="dash-toolbar">
                <a href="#!" class="menu-toggle">
                    <i class="fas fa-bars"></i>
                </a>
                <div class="tools">
                    <div class="dropdown tools-item">
                        <a href="#" class="" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-user"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                            <a class="dropdown-item" href="#!">Profile</a>
                            <a class="dropdown-item" href="login.html">Logout</a>
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
                                        <div class="stats-number">$100</div>
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
                                        <div class="stats-number">$40</div>
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
                                        <div class="stats-number">$60</div>
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
                                    <div class="spur-card-title"> Income Bar Chart </div>
                                    <div class="spur-card-menu">
                                        <div class="dropdown show">
                                            <a class="spur-card-menu-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                                <a class="dropdown-item" href="#">View More Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body spur-card-body-chart">
                                    <canvas id="spurChartjsBar"></canvas>
                                    <script>
                                        var ctx = document.getElementById("spurChartjsBar").getContext('2d');
                                        var myChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: {
                                                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                                datasets: [{
                                                    label: 'Blue',
                                                    data: [12, 19, 3, 5, 2],
                                                    backgroundColor: window.chartColors.primary,
                                                    borderColor: 'transparent'
                                                }]
                                            },
                                            options: {
                                                legend: {
                                                    display: false
                                                },
                                                scales: {
                                                    yAxes: [{
                                                        ticks: {
                                                            beginAtZero: true
                                                        }
                                                    }]
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

const ce = (element) => document.createElement(element)
const mainDash = page.querySelector("main.dash-content")
const incomes = page.querySelectorAll(".dash-nav-item")[1]

class Income{
    constructor(user_id, name, value){
        this.user_id = user_id
        this.name = name
        this.value = value
    }

    render(){
        const incomeBox = ce("div")
        incomeBox.className = "form-row"
        incomeBox.innerHTML = `
            <div class="form-group col-md-8">
                <input type="text" id="name" value="${this.name}" size="70">
            </div>
            <div class="form-group col-md-3">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <div class="input-group-text">$</div>
                    </div>
                    <input type="text" id="amount" value="${this.value}" size="15">
                </div>
            </div>
            <button style="height:40px; width:80px" type="submit" class="btn-primary">Update</button>
        `
        const body = mainDash.querySelector(".card-body")
        body.append(incomeBox)
        const updateButton = incomeBox.querySelector(".btn-primary")
        updateButton.addEventListener("click", () => {
            event.preventDefault()
            const configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: incomeBox.querySelector("#name").value,
                    value: incomeBox.querySelector("#amount").value
                })
            }
            fetch(`http://localhost:3000/api/v1/incomes/${this.id}`, configObj)
            .then(res => res.json())
            .then(
                console.log
            )
            })
        
    }
}

// updates page layout when "Incomes" tab is clicked
function incomesEvent(){
    incomes.addEventListener("click", () => {
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
        </form>
        `
        getIncomes()
        addButtonEvent()
    })
}
incomesEvent()

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
     .then(incomes => incomes.forEach(income => addIncome(income)))
     .catch(err => {
        console.error('ERROR: ' + err)
      })
}

function addIncome(income){
    let add
    let newIncome = new Income(income.user_id, income.name, income.value)
    add = newIncome.render()
}

function addButtonEvent(){
    const addButton = mainDash.querySelectorAll(".btn-primary")[0]
    addButton.addEventListener("click", () => {
    event.preventDefault()
    const newIncomeBox = ce("div")
    newIncomeBox.className = "form-row"
    newIncomeBox.innerHTML = `
        <div class="form-group col-md-8">
            <input type="text" placeholder="Income Source" size="70">
        </div>
        <div class="form-group col-md-4">
            <div class="input-group">
                <div class="input-group-prepend">
                <div class="input-group-text">$</div>
                </div>
                <input type="text" placeholder="Amount" size="15">
            </div>
        </div>
        <button style="height:40px; width:50px" type="submit" id="add-income-btn" class="btn-primary">Add</button>
    `

    const body = mainDash.querySelector(".card-body")
    body.append(newIncomeBox)
    addIncomeEvent()
    })
}

function updateButtonEvent(){
    const updateButton = mainDash.querySelectorAll(".btn-primary")[1]
    updateButton.addEventListener("click", () => {
        event.preventDefault()
        
    })
}

function addIncomeEvent(){
   const addIncomeData = mainDash.querySelector("#add-income-btn")
   addIncomeData.addEventListener("click", () => {
       event.preventDefault()

   })
}



}
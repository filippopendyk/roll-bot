let isOn = false;
let actualNum = getLastResultValue();
let balance = getBalance();
const redButton = document.querySelectorAll(".red_button")[0];
const blackButton = document.querySelectorAll(".dark_button")[0];
let startingBalance = getBalance();
let isWorking = false;
let betAmount = 1;
let color = "red";
let rouletteContainer = document.getElementById("select_roulette");
let isFirstRender = true;
let dashboard = getDashboardHTML();
rouletteContainer.insertAdjacentHTML("afterbegin", dashboard);
isFirstRender = false;

setInterval(() => {
    let newNum = getLastResultValue();
    if(newNum !== actualNum){
        actualNum = newNum;
        console.log("Result has changed");
        if (balance > getBalance()) {
            console.log("You lost!");
            if (isWorking) {
                betAmount = betAmount * 2;
                switchColors();  // Switch color
                updateDashboard();  // Update dashboard to reflect color change
            }
        } else if (balance < getBalance()) {
            console.log("You won!");
            if (isWorking) {
                betAmount = 1;
                switchColors();  // Switch color
                updateDashboard();  // Update dashboard to reflect color change
            }
        }
        balance = getBalance();
    }
    updateDashboard();
  }, 1000);

//   returns the last rolled number

function getLastResultValue(){
    let ballsNodeList = document.querySelectorAll(".ball");
    let lastItemIdx = ballsNodeList.length - 1;
    let lastItem = ballsNodeList[lastItemIdx];
    let result = lastItem.textContent;
    return result;
};

// changes the value of your bet

function setAmount(newAmount){
    let amountInput = document.getElementById("roulette_amount");
    amountInput.value = newAmount;
}

// places bet to provided color - only red/black

function placeBet(color){
    switch(color) {
        case "red":
            redButton.click();
            break;
        case "black":
            blackButton.click();
            break;
        default:
            break;
    }
}

// gets the current balance

function getBalance(){
    let balanceNode = document.getElementById("balance_r").textContent;
    return balanceNode;
}

function switchColors(){
    console.log("switching colors");
    if(color == "red"){
        color = "black";
    } else {
        color = "red";
    }
}

function updateDashboard(){
    dashboard = getDashboardHTML();
    let dashboardEl = document.getElementById("dashboard-bot");
    dashboardEl.innerHTML = dashboard;
}

function getCurrentBetColorHTML(){
    let currentColorHtml = `<div style="display: flex; justify-content: space-between;align-items: center;">
    <p style="margin-right: 10px;">Current bet on:</p>
    <div style="padding: 5px 20px;background-color: ${color == `black` ? `#393939` : `#D4594C`}; border-radius: 15px; display: flex; justify-content: center; align-items: center; font-size: 20px;">
        ${color == "black" ? "Black" : "Red"}
    </div>
    </div>`
    return currentColorHtml;
}

function getSessionProfitHTML(){
    let sessionProfit = getBalance() - startingBalance;
    let sessionProfitHTML = `<div style="display: flex; justify-content: space-between;align-items: center;">
    <p style="margin-right: 10px;">Session Profit:</p><div style="padding: 5px 20px;background-color: ${sessionProfit > 0 ? `#5EB76E` : sessionProfit == 0 ? `#FFE168` : `#D4594C`}; border-radius: 15px; display: flex; justify-content: center; align-items: center; font-size: 20px;">${sessionProfit}
    </div></div>`;
    return sessionProfitHTML;
}

function getBetAmountHTML(){
    let betAmountHTML = `<div style="display: flex; justify-content: space-between;align-items: center;">
    <p style="margin-right: 10px;">Current bet amount:</p>
    <div style="padding: 5px 20px;background-color: #44BBBF; border-radius: 15px; display: flex; justify-content: center; align-items: center; font-size: 20px">
        ${betAmount}
    </div>
    </div>`;
    return betAmountHTML;
}

function getStatusHTML(){
    let statusHTML = `<div>
    <p>The bot is: <span style="color: ${isWorking ? `#5EB76E` : `#D4594C`};">${isWorking ? "Running": "Not running"}</span></p>
    </div>
    <div style="display: flex; justify-content: space-between;align-items: center;">
        <p style="margin-right: 10px;">On/Off</p>
    </div>`
    return statusHTML;
}

function getPowerBtnHTML(){
    let powerBtnHTML = `<div style="display: flex; justify-content: space-between;">
    <button onClick="switchPower()" style="padding: 5px 20px;background-color: ${isWorking ? `#D4594C` : `#5EB76E`}; border-radius: 15px; display: flex; justify-content: center; align-items: center; font-size: 20px">
        ${isWorking ? "STOP" : "START"}
    </button>
</div>`;
    return powerBtnHTML;
}

function switchPower(){
    console.log("switched pwr");
    isWorking = !isWorking;
    updateDashboard();
}

function getDashboardHTML(){
    if(isFirstRender){
        return `<div id="dashboard-bot" style="display: flex; align-items: center; justify-content: space-evenly; background-color: #222225; color:#FFFFFF; padding: 20px 0px; margin-bottom: 10px; border-radius: 10px;">${getCurrentBetColorHTML() + getSessionProfitHTML() + getBetAmountHTML() + getStatusHTML() + getPowerBtnHTML()}</div>`;
    }
    return getCurrentBetColorHTML() + getSessionProfitHTML() + getBetAmountHTML() + getStatusHTML() + getPowerBtnHTML();
}
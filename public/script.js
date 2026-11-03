let button=document.querySelector("button");
const amount=document.querySelector(".amount");
const fromCurrency=document.querySelector("#fromCurrency")
const toCurrency=document.querySelector("#toCurrency");
const convertedAmount=document.querySelector("#convertedAmount");
const rate=document.querySelector("#rate");
const currencyPair=document.querySelector("#currencyPair");
const errorMessage=document.querySelector("#errorMessage");
button.addEventListener("click",()=>{
    fetch("/converter",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            amount:amount.value,
            fromCurrency:fromCurrency.value,
            toCurrency:toCurrency.value
        })
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        if(!data.ok){
            errorMessage.textContent=data.message;
        }
        convertedAmount.textContent=`${data.toCurrency} ${data.convertedAmount.toFixed(2)}`;
        currencyPair.textContent=`${data.fromCurrency} → ${data.toCurrency}`;
       rate.textContent=`ExchangeRate:${data.rate}` ;
    })
})
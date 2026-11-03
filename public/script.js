let button=document.querySelector("button");
const amount=document.querySelector(".amount");
const fromCurrency=document.querySelector("#fromCurrency")
const toCurrency=document.querySelector("#toCurrency");

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
})
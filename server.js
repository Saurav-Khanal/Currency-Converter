const express=require("express");
const app=express();
app.listen(3000,()=>{
    console.log("App is running on port 3000");
})
app.use(express.json());
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.redirect("/index.html");
})

app.post("/converter",(req,res)=>{
    let{amount,fromCurrency,toCurrency}=req.body
    console.log(fromCurrency);
    if(amount<0){
        return res.status(400).json({
            message:"Amount must be in positive"
        })
    }
    if(!amount||!fromCurrency||!toCurrency){
       return res.status(400).json({
         message:"All fields are required"
        })
    }
    fromCurrency=fromCurrency.toUpperCase();
    toCurrency=toCurrency.toUpperCase();
    
    fetch(`https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`)
    .then((response)=>{
        if(!response.ok){
            return res.status(500).json({
                message:"Error while fetching api"
            })
        }
       return response.json();
    })
    .then((data)=>{
        const rate=data.rate;
        const convertedAmount=amount*rate;
        res.status(200).json({
            amount:amount,
            fromCurrency:fromCurrency,
            toCurrency:toCurrency,
            rate:rate,
            convertedAmount:convertedAmount
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:"something went wrong while fetching exchange rate"
        })
    })
})

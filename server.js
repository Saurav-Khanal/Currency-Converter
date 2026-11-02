const express=require("express");
const app=express();
app.listen(3000,()=>{
    console.log("App is running on port 3000");
})
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Backend is running");
})

app.post("/converter",(req,res)=>{
    let{amount,fromCurrency,toCurrency}=req.body;
    fromCurrency=fromCurrency.toUpperCase();
    toCurrency=toCurrency.toUpperCase();
    console.log(fromCurrency);
    if(amount<0){
        res.status(400).json({
            message:"Amount must be in positive"
        })
    }
    if(!amount||!fromCurrency||!toCurrency){
       return res.status(400).json({
            message:"All fields are required"
        })
    }
    fetch(`https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`)
    .then((response)=>{
       return response.json();
    })
    .then((data)=>{
        const rate=data.rate;
        const convertedAmount=amount*rate;
        res.status(200).json({
            convertedAmount:convertedAmount
        })
    });
})

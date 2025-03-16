const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var port = process.env.PORT ||8080
  app.use(cors({
          // allow specific domain or you can use '*' to allow everything
              origin:"*",
              method: ["GET", "POST" ,"UPDATE"]
      }));
app.use(cors());
app.use(express.static(path.join(__dirname)));
app.get('/', )
app.post("/api/riskCaculator", jsonParser, (req, res) => {
    const {age, bmi, bp, disease} = req.body; 
    let point=0;
    if (age <30 ) point += 0;
    else if(age <45) point +=10;
    else if(age <50) point +=20;
    else point+=30;

    if(bmi == "Normal") point +=0;
    else if(bmi == "Overweight") point +=30;
    else point +=75;

    if (bp == "Normal") point +=0;
    else if (bp == "Elevated") point+=15;
    else if (bp == "Stage1") point+=30;
    else if (bp == "Stage2") point+=75;
    else if (bp == "Crisis") point+=100;

    // if(disease == "Diabetes") point+= 10;
    // else if(disease == "Cancer") point+= 10;
    // else if(disease == "Alzheimer’s") point+= 10;

    if (Array.isArray(disease)) {
        if (disease.includes("Diabetes")) point += 10;
        if (disease.includes("Cancer")) point += 10;
        if (disease.includes("Alzheimer’s")) point += 10;
    }
    let indicator="";
    if(point<= 20) indicator = "Low risk";
    else if (point <= 50) indicator = "Moderate risk";
    else if (point <=75) indicator = "High risk";
    else indicator = "Uninsurable";

    
    res.json({ risk: indicator, points: point }); 
});

app.listen(port);

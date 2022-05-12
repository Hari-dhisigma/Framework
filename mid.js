const express = require('express')
const app = express()  ;
const cors = require('cors');
app.use(cors())
const port = 8000

app.use(express.json());

var AWS = require("aws-sdk");

const aws_remote_config = {
    accessKeyId: "AKIAQV3JYSHILKV47FKS",
    secretAccessKey: "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",
    region: "us-east-1",
}
AWS.config.correctClockSkew = true
AWS.config.update(aws_remote_config);
const docClient = new AWS.DynamoDB.DocumentClient();
const jwt = require("jsonwebtoken");





  function middleware(functn) {
    return (res, req, next)=>{ 
        
        console.log(functn);

        let p = {
          
            TableName: "rls",
            FilterExpression: '#Sk =:Sk',
            ExpressionAttributeValues: { ':Sk': functn },
      
            ExpressionAttributeNames: { '#Sk': 'Sk'}
          }
         
          docClient.scan(p, function (err, data) {
          
            if(data.Items.length != 0) {
            console.log(data);
            console.log("sucess1");
            console.log(data.Items[0].acs);
            if(data.Items[0].acs=="ALLOW"){
                next();
                
            }
            // else{
            //     res.sendStatus(403)
            // }
            
          } 
          else{
             console.log("split1");
             console.log(data);
            var str=functn.split(".")
           
            var str1='.*';
            var functn2 = str[0].concat(str1);
            console.log(functn2);
            
            


            let p1 = {
          
              TableName: "rls",
              FilterExpression: '#Sk =:Sk',
              ExpressionAttributeValues: { ':Sk': functn2 },
        
              ExpressionAttributeNames: { '#Sk': 'Sk'}
            }
           
            docClient.scan(p1, function (err, data) {
            
              if(data.Items.length != 0) {
              console.log(data);
              console.log("sucess2");
              console.log(data.Items[0].acs);
              if(data.Items[0].acs=="ALLOW"){
                  next();
                  
              }
              // else{
              //     res.sendStatus(403)
              // }
              
            } 
            else{
              console.log("split2");
              console.log(data);
              var str=functn.split("#")
              console.log(str[0]);
              var str1='#*.*';
              var functn3 = str[0].concat(str1);
              console.log(functn3);
              
              let p3 = {
          
                TableName: "rls",
                FilterExpression: '#Sk =:Sk',
                ExpressionAttributeValues: { ':Sk': functn3 },
          
                ExpressionAttributeNames: { '#Sk': 'Sk'}
              }
             
              docClient.scan(p3, function (err, data) {
              console.log("inside");
                if(data.Items.length != 0) {
                console.log(data);
                console.log("sucess3");
                console.log(data.Items[0].acs);
                if(data.Items[0].acs=="ALLOW"){
                    next();
                    
                }
                else{

                  res.status(403)
                }
                
              } 
              else{

                console.log("not found");
            }
          
          })
              
            }

        
        })
            
          }
        
      })



        
    }
}

app.get("/test1", middleware("delete#customer.c"), (req, res) => {
    res.send("Success");
    // console.log(res);
    console.log(res.statusCode);
  });





app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});
module.exports = app;
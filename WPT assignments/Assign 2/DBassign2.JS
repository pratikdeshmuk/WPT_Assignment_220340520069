let dbparams=
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'inception',
	port:3306
}; 
const mysql = require('mysql2'); //fate
const con=mysql.createConnection(dbparams);//fate  

const express = require('express');
const app = express();

app.use(express.static("sf"));


app.get("/getItem",(req,resp)=>{
let input = req.query.x;
console.log(input);
let output ={ itemnofoundstatus:false, itemdetails:{itemno:0,itemname:'',price:0,category:''} };

con.query('select * from item where itemno =?',[input],(error,rows)=>{

    if(rows.length > 0)
    {
        output.itemnofoundstatus=true;
        output.itemdetails=rows[0];

    }
    resp.send(output);
}
);

});

app.get("/addItem",(req,resp)=>{

    //temporary
//later on we will see how to read the complete item object itself from http request
let input={itemno:req.query.x,itemname:req.query.y,price:req.query.z,category:req.query.w};
console.log(input);
let output=true;

con.query('insert into item(itemno,itemname,price,category) values (?,?,?)',
[input.itemno,input.itemname,input.price,input.category],
(error,whathappenedtoinsert)=>{
        if(error)
        {
                
        }

        else if(whathappenedtoinsert.affectedRows>0)
        {
                output=true;

        }

        resp.send(output);
           
}
);

});

app.get("/updateitem",(req,resp)=>{

let output=false;
let input={itemno:req.query.itemno,
itemname:req.query.itemname,price:req.query.price};


con.query('update item set category = ?,price =? where itemno=?',
[input.category,input.price,input.itemno],
(error,whathappenedtoinsert)=>{
        if(error)
        {
            //when you dont have data why problem is there collect data first.
                
        }

        else if(whathappenedtoinsert.affectedRows>0)
           output=true;

        
resp.send(output);
           
}

);

});

app.get("/getAllItems",(req,resp)=>{

    con.query('select * from item',[],(error,rows)=>{

        
        resp.send(rows);

}
);
   
});

app.listen(900, function () {
    console.log("server listening at port 900...");
});
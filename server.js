var express = require("express"); 
var db = require('./db-connections');
var app = express(); 

app.use(express.json());
app.listen(8080, "127.0.0.1");
console.log("web server running @ http://127.0.0.1:8080");

app.route('/product').get( function (req, res) {
    var sql = "SELECT * FROM `e-commerce`.product";
    //perform query to database from web server
    db.query(sql, function(error, result){
    if(error){
    throw error;
    }else{
    //return result as json
    res.json(result);
    }
    });
    });


app.route('/add_product').post(function(req,res){
    var sql = "insert into `e-commerce`.product (name,description,price , category_id,picture) values (?,?,?,?,?) "
    var parameter = [req.body.name,req.body.description,req.body.price , req.body.category_id ,req.body.picture]
    db.query(sql , parameter ,function(error,result){
        if(error){
            throw error;
        }else{
            res.json(result);
        }
    })

})









//added this

app.route('/category').get( function (req, res) {

    var sql = "SELECT * FROM `e-commerce`.category";
    //perform query to database from web server
    db.query(sql, function(error, result){
    if(error){
    throw error;
    }else{
    res.json(result);
    }
    });
    });











app.route('/displaying/:id').get( function (req, res) {
    var sql = "SELECT * FROM `e-commerce`.product WHERE ID=?";
    var params = [req.params.id]
    //perform query to database from web server
    db.query(sql,params, function(error, result){
    if(error){
    throw error;
    }else{
    //return result as json
    res.json(result);
    }
    });
    });




app.route('/displaying/:id').put( function (req, res) {
    var sql = "UPDATE `e-commerce`.product SET name=? , description=? ,  price = ? ,  category_id =? , picture = ? WHERE ID=?";
    var params = [ req.body.name , req.body.description , req.body.price , req.body.category_id , req.body.picture,req.params.id]
    //perform query to database from web server
    db.query(sql,params, function(error, result){
    if(error){
    throw error;
    }else{
    //return result as json
    res.json(result);
    }
    });
    });



app.route('/displaying/:id').delete( function (req, res) {
    var sql = "delete from `e-commerce`.product WHERE ID=?";
    var params = [req.params.id]
    //perform query to database from web server
    db.query(sql,params, function(error, result){
    if(error){
    throw error;
    }else{
    //return result as json
    res.json(result);
    }
    });
    });
        
    



app.use(express.static("./public"));
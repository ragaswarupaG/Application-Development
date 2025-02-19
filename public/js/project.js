function loadProductData(){
    var request = new XMLHttpRequest();

    var productArray=[];

    request.open('get' , '/product' , true);
    request.onload = function(){
        productArray = JSON.parse(request.responseText)
        console.log(productArray)
        insertDynamicProduct(productArray)
    }
    request.send();
}




function insertDynamicProduct(productArray){
    var dynamicProductList = document.getElementById('dynamicProductDataList')
    var newContent ="";
    for(var i = 0; i < productArray.length; i++){
        console.log(productArray[i])
    
        newContent +=
        "<div class='product'   id='image'>" +

        "<img id='product_image' src='" + productArray[i].picture + "'> " +
        "<div id='product_info'>" + "<h3 id='item_name'>" + productArray[i].name+ "</h3>"+
        "<h3 id='item_price'>" +'$' + productArray[i].price+"</h3>" + "</div>" + "<img src='images/stars.png' id='stars'>" +
        "<button onclick='retrieveId(this)' id='button_display' restId='" + productArray[i].id + "' >Details</button>"
        newContent+= "</div>"
        }
    dynamicProductList.innerHTML = newContent;
}


function loadCategoryData(){
    var request = new XMLHttpRequest
    var categoryArray=[];
    request.open('get' , '/category' , true);
    request.onload = function(){
        categoryArray = JSON.parse(request.responseText)
        console.log(categoryArray)
        insertDynamicCategory(categoryArray)
    }
    request.send();
}

document.addEventListener('DOMContentLoaded', function () {
    loadCategoryData();
});



function insertDynamicCategory(categoryArray){
    var dynamicCategoryList = document.getElementById('insertCatId')
    console.log(dynamicCategoryList)
    var options = ''
    for(var i = 0 ; i < categoryArray.length ; i++){
        console.log("Category:", categoryArray[i].name);
        options += "<option value='" + categoryArray[i].id + "'>" + categoryArray[i].name + "</option>";
        console.log('my value is:'+ categoryArray[i].id)
    }
    dynamicCategoryList.innerHTML = options;

}





function retrieveId(arg){
    var id = arg.getAttribute('restId') 
    location.href = "/displaying.html?id=" + id;


}

function display(){
    var params = new URLSearchParams(location.search);
    var id_url = params.get("id");
    console.log('id_url: '+ id_url)
    var product
    var request = new XMLHttpRequest
    request.open('GET' , '/displaying/'+id_url , true);

    request.onload = function(){
        product = JSON.parse(request.responseText);  //get the specific data depending on the id in the link
        console.log(product)
        setProductDetail(product[0])
    }
    request.send()

}

function setProductDetail(product){
//adding value TO the text box!
    document.getElementById('insertName').value = product.name;  //this is taking it from the database itself andassigning it to the empty textbox
    document.getElementById('insertDescribe').value = product.description;
    document.getElementById('insertPrice').value = product.price;
    document.getElementById('insertCatId').value = product.category_id;
    document.getElementById('insertPicture').value = product.picture;
    document.getElementById('id').value = product.id;
}




function insertData(){
    location.href = "/insertData.html"
    var newData = new Object()
    
    newData.name = document.getElementById('insertName').value
    newData.description = document.getElementById('insertDescribe').value
    newData.price = document.getElementById('insertPrice').value
    newData.category_id = document.getElementById('insertCatId').value
    newData.picture = document.getElementById('insertPicture').value

    if (
        !newData.name.trim() ||
        !newData.description.trim() ||
        !newData.price.trim() ||
        !newData.category_id.trim() ||
        !newData.picture.trim()
    ) {
        alert('Please fill in all the fields before submitting.');
        return;
    }

    else{
        
    var request = new XMLHttpRequest();
    request.open('post' ,'/add_product' , true)
    request.setRequestHeader('Content-Type' , 'application/json')
        
        request.onload = function(){
            console.log('product is added.')
                }

        request.send(JSON.stringify(newData))
        alert('Product added successfully!')
        
        location.href = '/project.html'
        }
    
    

    }
    





function updateProductDetail() {
    var update_product = new Object();

    update_product.name = document.getElementById('insertName').value
    update_product.description = document.getElementById('insertDescribe').value
    update_product.price = document.getElementById('insertPrice').value
    update_product.category_id = document.getElementById('insertCatId').value
    update_product.picture = document.getElementById('insertPicture').value
    var id_prod = document.getElementById('id').value
    console.log('id is: ' + id_prod)



    if (
        !update_product.name.trim() ||
        !update_product.description.trim() ||
        !update_product.price.trim() ||
        !update_product.category_id.trim() ||
        !update_product.picture.trim()
    ) {
        alert('Please fill in all the fields before submitting.');
        return;
    }
    



    if (update_product.price < 0 || update_product.price === '') {
        alert('Update failed. Please enter a valid price.');
        return
        // location.href = '/displaying/' + id_prod;
        // location.href = "/project.html";
    } 

    if(update_product.price > 1000000){
        alert('Update failed. Please enter a valid price.');
        return
    }
    
    else {
        var request = new XMLHttpRequest();
        request.open('put', '/displaying/' + id_prod, true);
        request.setRequestHeader('Content-Type', 'application/json');

        request.onload = function () {
            // alert(request.responseText);
            // alert('Updated successfully 2!')
        };

        request.send(JSON.stringify(update_product));

        alert('Updated successfully!')

        location.href = "/project.html";
    }
}





function deleteProduct(){
    var id_prod = document.getElementById('id').value
    console.log(id_prod)
    var request = new XMLHttpRequest();

    request.open('delete' , '/displaying/'+id_prod , true);
    request.onload = function(){
        location.href = '/project.html'
    }
    request.send()
}



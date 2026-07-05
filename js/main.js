var productNameInput= document.getElementById("productname");
var productPriceInput= document.getElementById("productprice");
var productCategoryInput= document.getElementById("productcategory");
var productDescInput= document.getElementById("productDesc");
var searchInput= document.getElementById("SearchInput");
var currentIndex=0;
var inputs=document.getElementsByClassName("form-control");

var addbtn=document.getElementById("addbtn");
var products=[];
if(JSON.parse(localStorage.getItem("productsitems"))!=null){
    products=JSON.parse(localStorage.getItem("productsitems"));
    displayData();
}


addbtn.onclick=function(){
    if(addbtn.innerHTML=="add product"){
       addproduct();
    }
    else{
        updateProduct();
    }
    displayData();
    clearform();
}
function addproduct(){
     var product={
        name:productNameInput.value,
        price:productPriceInput.value,
        caregory:productCategoryInput.value,
        desc:productDescInput.value
    }
    products.push(product);
    localStorage.setItem("productsitems",JSON.stringify(products))
}
function displayData(){
        var cartona='';
    for(var i=0;i<products.length;i++){
        cartona+=`<tr>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].caregory}</td>
                    <td>${products[i].desc}</td>
                    <td><button onclick="getProductInfo(${i})" class="btn btn-warning">Update</button></td>
                    <td><button onclick="deleteproduct(${i})" class="btn btn-danger">Delete</button></td>
                </tr>`
    }
    document.getElementById("tablebody").innerHTML=cartona;
}
function deleteproduct(index){
   products.splice(index,1);
   displayData();
       localStorage.setItem("productsitems",JSON.stringify(products))

}
function clearform(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value='';
    }
}
searchInput.onkeyup=function(){
            var cartona='';
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
        cartona+=`<tr>
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].caregory}</td>
                    <td>${products[i].desc}</td>
                    <td><button onclick="getProductInfo(${i})" class="btn btn-warning">Update</button></td>
                    <td><button onclick="deleteproduct(${i})" class="btn btn-danger">Delete</button></td>
                </tr>`
    }
    document.getElementById("tablebody").innerHTML=cartona;
}
function getProductInfo(index){
    currentIndex=index;
    var curruntProduct=products[index];
    productNameInput.value=curruntProduct.name;
    productPriceInput.value=curruntProduct.price;
    productCategoryInput.value=curruntProduct.caregory;
    productDescInput.value=curruntProduct.desc;
    addbtn.innerHTML="Update Product";
}
function updateProduct(){
    var product={
        name:productNameInput.value,
        price:productPriceInput.value,
        caregory:productCategoryInput.value,
        desc:productDescInput.value
    }
    products[currentIndex]=product;
    localStorage.setItem("productsitems",JSON.stringify(products))
    addbtn.innerHTML="add product"
}

var nameAlert=document.getElementById("nameAlert");
productNameInput.onkeyup=function(){
    var nameRejex=/^[A-Z][a-z]{2,8}$/;
    if(nameRejex.test(productNameInput.value))
    {
        addbtn.removeAttribute('disabled');
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        nameAlert.classList.add('d-none')
    }
    else{
        addbtn.disabled=true;
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        nameAlert.classList.remove('d-none')
    }
}
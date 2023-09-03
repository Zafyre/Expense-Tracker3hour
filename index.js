var expense_amount = document.querySelector("#expense_amount");

var expense_desc = document.querySelector("#expense_desc");


var expense_type = document.querySelector("#expense_type");


var expense_btn = document.getElementsByClassName("expense_btn");

var items = document.getElementById("users_acc");

//load all previous expenses from localstorage if any
var store_all_keys = [];
function load_previous(){
    for (var a in localStorage) {
        store_all_keys.push(a);
    }

    //poping excessive data 
    store_all_keys.pop();
    store_all_keys.pop();
    store_all_keys.pop();
    store_all_keys.pop();
    store_all_keys.pop();
    store_all_keys.pop();

    for(var keys of store_all_keys){
        //obj_deserialize the values of keys
        var obj_deserialize = JSON.parse(localStorage.getItem(keys));
        var li = document.createElement("li");
        li.style.fontSize = "20px";
        li.append(`${obj_deserialize.expense_a} ${obj_deserialize.expense_d} ${obj_deserialize.expense_t}`);
        //creating delete button
        delete_li = document.createElement("button");
        delete_li.className = "destroy btn btn-danger";
        delete_li.id = "delete_li";
        delete_li.append(document.createTextNode("Delete"));  
        
        li.append(" ")
        li.append(delete_li);
        li.append(" ");

        //creating edit button
        edit_btn=document.createElement("button");
        edit_btn.id="edit";
        edit_btn.className="edit btn btn-warning";
        edit_btn.append(document.createTextNode("Edit Value"));

        li.append(edit_btn);
        document.querySelector(".users_accounts").appendChild(li);
    }
}
load_previous();

//event lister where upload and checking starts from
expense_btn[0].addEventListener("click", function(e){
    e.preventDefault();
    console.log("btn pressed")
    if(expense_amount.value=="" || expense_desc.value=="" || expense_type.value==expense_type[0].value){
        alert("Re-enter all feilds correctly..");
        expense_type.value = expense_type[0].value;
        expense_desc.value = "";
        expense_amount.value = "";
    }else{

        var expense_desc_nospace_arr = expense_desc.value.split(" ");
        console.log(expense_desc_nospace_arr);
        var expense_desc_nospace = "";
        for(var words of expense_desc_nospace_arr){
            expense_desc_nospace = expense_desc_nospace + words + "_";
        }
        console.log(expense_desc_nospace);  
        var obj = {
            "expense_a" : expense_amount.value,
            "expense_d" : expense_desc_nospace,
            "expense_t" : expense_type.value      
        }
        // obj_serialized to put in localstorage
        obj_serialized = JSON.stringify(obj);
        localStorage.setItem(expense_desc_nospace , obj_serialized);
        printing_to_web(obj_serialized);
        
        expense_type.value = expense_type[0].value;
        expense_desc.value = "";
        expense_amount.value = "";
    }
});

function printing_to_web(obj_serialized){
    //deserialize the obj first 
    var obj_deserialize = JSON.parse(obj_serialized);
    var li = document.createElement("li");
    li.style.fontSize = "20px";
    li.append(`${obj_deserialize.expense_a} ${obj_deserialize.expense_d} ${obj_deserialize.expense_t}`);
    //creating delete button
    delete_li = document.createElement("button");
    delete_li.className = "destroy btn btn-danger";
    delete_li.id = "delete_li";
    delete_li.append(document.createTextNode("Delete"));  
    
    li.append(" ")
    li.append(delete_li);
    li.append(" ");

    //creating edit button
    edit_btn=document.createElement("button");
    edit_btn.id="edit";
    edit_btn.className="edit btn btn-warning";
    edit_btn.append(document.createTextNode("Edit Value"));

    li.append(edit_btn);
    document.querySelector(".users_accounts").appendChild(li);
}

//delete listner
items.addEventListener("click",(e)=>{
    if(e.target.classList.contains("destroy")){
        if(confirm("Are you sure.?")){
            //deleting from list
            var li = e.target.parentElement;
            var texttt = li.textContent;
            var x = texttt.split(" ");
            var key = x[1];
            localStorage.removeItem(key);
            items.removeChild(li);
            
        }
    }
})

 fetch('https://my-json-server.typicode.com/Lokchand95/demo/db')
            .then(function (response) {
                return response.json();
            }).then(function (apiJsonData) {
                //console.log(apiJsonData);
				renderDataInTheTable(apiJsonData);
				changePage(1);
				
            }) 
			
			
	function renderDataInTheTable(todos) {
            const mytable = document.getElementById("html-data-table");
			let count=1;
			//console.log("Test");
            todos.user.forEach(todo => {
                let newRow = document.createElement("tr");
                Object.keys(todo).forEach((value) => {
				//var key;
                    let cell = document.createElement("td");
					cell.setAttribute('id', value+""+count);
                    cell.innerText = todo[value];
                    newRow.appendChild(cell);
                })
				let cell = document.createElement("td");
				let removebutton = document.createElement('button');

				// set button attributes.
				removebutton.setAttribute("class","delete");
				removebutton.setAttribute('type', 'button');
				removebutton.setAttribute('id', "remove"+count);
				removebutton.innerHTML = 'Remove';

				// set onclick event.
				removebutton.setAttribute('onclick', 'remRow(this)');
				cell.appendChild(removebutton);
				cell.appendChild (document.createTextNode (" "));
				cell.appendChild (document.createTextNode (" "));
				newRow.appendChild(cell);
				
				let editbutton = document.createElement('button');

				// set button attributes.
				editbutton.setAttribute('type', 'button');
				editbutton.innerHTML = 'Edit';

				// set onclick event.
				editbutton.setAttribute('class',"edit");
				editbutton.setAttribute('onclick', "edit('"+count+"')");
				editbutton.setAttribute('id', "edit"+count);
				cell.appendChild(editbutton);
				cell.appendChild (document.createTextNode (" "));
				
				newRow.appendChild(cell);
				
                mytable.appendChild(newRow);
				
				let savebutton = document.createElement('button');

				// set button attributes.
				savebutton.setAttribute('type', 'button');
				savebutton.innerHTML = 'save';

				// set onclick event.
				savebutton.setAttribute('class',"save");
				savebutton.setAttribute('style',"display : none;");
				savebutton.setAttribute('onclick', "save('"+count+"')");
				savebutton.setAttribute('id', "save"+count);
				cell.appendChild(savebutton);
				
				newRow.appendChild(cell);
				
                mytable.appendChild(newRow);
				count ++;
            });
        }
		
//remove row
function remRow(el) {
	var sample = el.parentNode.parentNode.rowIndex;
	console.log(sample);
	var id=document.getElementById("id"+sample).innerText;
	console.log(id);
	
	fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE'
})
.then((response) => response.json())
  .then((json) => console.log(json));
	var uTable = document.getElementById('html-data-table');
	uTable.deleteRow(el.parentNode.parentNode.rowIndex); 
}	
//delete_row('3')
function edit(no)
{
console.log(no);
 document.getElementById("edit"+no).style.display="none";
 document.getElementById("save"+no).style.display="";
	
 var name=document.getElementById("name"+no);
 var id=document.getElementById("id"+no);
 var phone_no=document.getElementById("phone_no"+no);
 var email=document.getElementById("email"+no);
var dob=document.getElementById("dob"+no);
	
 var name_data=name.innerHTML;
 var id_data=id.innerHTML;
 var phone_no_data=phone_no.innerHTML;
 var email_data=email.innerHTML;
 var dob_data=dob.innerHTML;
	
 name.innerHTML="<input type='text' id='name_text"+no+"' value='"+name_data+"'>";
 id.innerHTML="<input type='text' id='id_text"+no+"' value='"+id_data+"'>";
 phone_no.innerHTML="<input type='text' id='phone_text"+no+"' value='"+phone_no_data+"'>";
 email.innerHTML="<input type='text' id='email_text"+no+"' value='"+email_data+"'>";
 dob.innerHTML="<input type='text' id='dob_text"+no+"' value='"+dob_data+"'>";
}

function save(no)
{
console.log(no);
 document.getElementById("edit"+no).style.display="";
 document.getElementById("save"+no).style.display="none";

 var name=document.getElementById("name_text"+no).value;
 //console.log(userID);
 var id=document.getElementById("id_text"+no).value;
 var phone_no=document.getElementById("phone_text"+no).value;
 var email=document.getElementById("email_text"+no).value;
  var dob=document.getElementById("dob_text"+no).value;

let data={"name": name, "id": id, "phone_no": phone_no, "email":email,"dob":dob};

fetch('https://dummy.restapiexample.com/api/v1/create', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));

 
document.getElementById("name"+no).innerHTML=name;	
document.getElementById("id"+no).innerHTML=id;	
document.getElementById("phone_no"+no).innerHTML=phone_no;	
document.getElementById("email"+no).innerHTML=email;
document.getElementById("dob"+no).innerHTML=dob;		
}

// pagination code

var current_page = 1;
var records_per_page = 15;
var row_length;


function prevPage() {
  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }
}

function nextPage() {
  if (current_page < numPages()) {
    current_page++;
	console.log(current_page);
    changePage(current_page);
  }
}

function changePage(page) {
  var btn_next = document.getElementById("btn_next");
  var btn_prev = document.getElementById("btn_prev");
  var listing_table = document.getElementById("html-data-table");
  var page_span = document.getElementById("page");
  var row_length = document.getElementById("html-data-table").rows.length
  //var records_per_page = 20;

  // Validate page
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();
  //console.log(listing_table.rows);
  for (var i = 0; i < row_length; i++) {
 
    listing_table.rows[i].style.display = "none"
  }


  for (var i = (page - 1) * records_per_page; i <= (page * (records_per_page-1)); i++) {
  console.log(i);
  if( listing_table.rows[i] != null) {
    listing_table.rows[i].style.display = ""
	}
  }

  page_span.innerHTML = page + "/" + numPages();

  if (page == 1) {
    btn_prev.style.visibility = "hidden";
  } else {
    btn_prev.style.visibility = "visible";
  }

  if (page == numPages()) {
    btn_next.style.visibility = "hidden";
  } else {
    btn_next.style.visibility = "visible";
  }
}

function numPages() {
	row_length = document.getElementById("html-data-table").rows.length
  return Math.ceil(row_length / records_per_page);
};
		

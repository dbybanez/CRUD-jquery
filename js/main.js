/*
*
		  Date Created: --/--/----
		  Created By:   David Benjamin Ybanez
		  Last Updated: --/--/----
		  Updated By:   David Benjamin Ybanez

*
*/

$(document).ready(function(){
	/*
	*
		=========================================
			Bootstrap Initializations
		=========================================
	*
	*/



	/*
	*
		=========================================
			Core JS
		=========================================
	*
	*/
	var fnameinput = $("input[name='fnameinput']"),
	    miinput    = $("input[name='miinput']"),
	    lnameinput = $("input[name='lnameinput']"),
	    addBtn     = $("#addBtn"),
	    table      = $("#tableList"),
	    emptyMsg   = $("#emptyMessage"),
	    tableBody  = $("#tableList tbody"),
	    tableFirst = $("#tableList tbody tr:first"),
	    delFirst   = $("#delFirst");

	var fnameval, mival, lnameval;

	var id = 0;

	function createTemplate (id, fname, mi, lname){
		var body;
		body += "<tr>";
    body += "<td style='text-align:center;'><input type='checkbox' name='chkbx'></td>";
    body +="<td class='id'>"+id+"</td>";
    body +="<td class='fname'>"+fname+"</td>";
    body +="<td class='mi'>"+mi+"</td>";
    body +="<td class='lname'>"+lname+"</td>";
    body +="<td style='text-align:center;'><button class='edit-btn'>Edit</button></td>";
    body +="</tr>";
		return body;
	}

	function emptyMessageTemplate () {
		var body;
		body += "<tr id='emptyMessage'>";
    body += "<td colspan='6' style='text-align:center;'>Table is empty</td>";
    body +="</tr>";
		return body;
	}

	function editRowTemplate (id, fname, mi, lname){
		var body;
    body += "<td style='text-align:center;'><input type='checkbox' name='chkbx'></td>";
    body +="<td class='id'>"+id+"</td>";
    body +="<td class='fname'><input type='text' name='fname-edit' value='"+fname+"'><input type='hidden' name='fname-default' value='"+fname+"'></td>";
    body +="<td class='mi'><input type='text' name='mi-edit' value='"+mi+"'><input type='hidden' name='mi-default' value='"+mi+"'></td>";
    body +="<td class='lname'><input type='text' name='lname-edit' value='"+lname+"'><input type='hidden' name='lname-default' value='"+lname+"'></td>";
    body +="<td style='text-align:center;'><button class='save-btn'>Save</button> <button class='cancel-btn'>Cancel</button></td>";
		return body;
	}

	function rowTemplate (id, fname, mi, lname){
		var body;
    body += "<td style='text-align:center;'><input type='checkbox' name='chkbx'></td>";
    body +="<td class='id'>"+id+"</td>";
    body +="<td class='fname'>"+fname+"</td>";
    body +="<td class='mi'>"+mi+"</td>";
    body +="<td class='lname'>"+lname+"</td>";
    body +="<td style='text-align:center;'><button class='edit-btn'>Edit</button></td>";
		return body;
	}

	/* Add Item Button */

	addBtn.click(function(){
		id = id + 1;
		fnameval = fnameinput.val();
		mival = miinput.val();
		lnameval = lnameinput.val();
		//console.log(fnameval+" | "+mival+" | "+lnameval);

		if($("#emptyMessage").length){
			$("#emptyMessage").remove();
			tableBody.append(createTemplate(id, fnameval, mival, lnameval));
		}else{
			tableBody.append(createTemplate(id, fnameval, mival, lnameval));
		}
	});

	/* Delete First Item Button */

	$("body").on('click', '#delFirst', function(e){
		var tableFirst = $("#tableList tbody tr:first");
		tableFirst.remove();
		if($("#tableList tbody tr").length < 1){
			tableBody.append(emptyMessageTemplate());
		}
	});

	/* Delete All Items Button */

	$("body").on('click', '#delAll', function(e){
		var tableBody = $("#tableList tbody");
		tableBody.html('');
		tableBody.append(emptyMessageTemplate());
	});

	/* Delete Selected Items Button */

	$("body").on('click', '#delSelected', function(e){
		var tableRow = $("#tableList tbody tr");
		tableRow.has("input[name='chkbx']:checked").remove();
	});

	/* Edit Item Button */

	$("body").on('click', '.edit-btn', function(e){
		var row = $(this).closest("tr");
		var tempid, tempfname, tempmi, templname;
		var rowEdit;

		tempid = $(this).closest("tr").find(".id").text();
		tempfname = $(this).closest("tr").find(".fname").text();
		tempmi = $(this).closest("tr").find(".mi").text();
		templname = $(this).closest("tr").find(".lname").text();

		rowEdit = editRowTemplate(tempid, tempfname, tempmi, templname);
		row.html(rowEdit);
	});

	/* Save Changes Button */

	$("body").on('click', '.save-btn', function(e){
		var row = $(this).closest("tr");
		var tempid, tempfname, tempmi, templname;
		var rowSave;

		tempid = $(this).closest("tr").find(".id").text();
		tempfname = $(this).closest("tr").find("input[name='fname-edit']").val();
		tempmi = $(this).closest("tr").find("input[name='mi-edit']").val();
		templname = $(this).closest("tr").find("input[name='lname-edit']").val();

		rowSave = rowTemplate(tempid, tempfname, tempmi, templname);
		row.html(rowSave);
	});

	/* Cancel Edit Button */

	$("body").on('click', '.cancel-btn', function(e){
		var row = $(this).closest("tr");
		var tempid, tempfname, tempmi, templname;
		var rowSave;

		tempid = $(this).closest("tr").find(".id").text();
		tempfname = $(this).closest("tr").find("input[name='fname-default']").val();
		tempmi = $(this).closest("tr").find("input[name='mi-default']").val();
		templname = $(this).closest("tr").find("input[name='lname-default']").val();

		rowSave = rowTemplate(tempid, tempfname, tempmi, templname);
		row.html(rowSave);
	});

});
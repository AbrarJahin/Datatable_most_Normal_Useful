$(document).ready(function()
{
	var dataTable = $('#employee-grid').DataTable(
	{
		"processing": true,
		"serverSide": true,
		"ajax":
		{
			url :"employee-grid-data.php", // json datasource
			type: "post",  // method  , by default get
			error: function()
			{  // error handling
				$(".employee-grid-error").html("");
				$("#employee-grid").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
				$("#employee-grid_processing").css("display","none");
			}
		},
		"columns":	[				//Name should be same as PHP file JSON NAmes and ordering should be as in the HTML file
						{	"data": "employee_name"			},
						{	"data": "employee_salary"		},
						{	"data": "employee_age"			},
						{	"data": null					}		//If it is not null then buttons would not be shown
					],
		//"pagingType": "full_numbers",	//Adding Last and First in Pagination
		stateSave: true,
		"columnDefs":	[								//For Action Buttons (Edit and Delete button) adding in the Action Column
							{
								"visible": false,
								"orderable": false,		//Turn off ordering
								"searchable": false,	//Turn off searching
								"targets": [3],			//Going to last column - 3 is the last column index because o is starting index
								"data": null,			//Not receiving any data
								"defaultContent": '<div style="min-width:70px" class="btn-group" role="group"><button type="button" class="edit btn btn-warning btn-sm"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button><button type="button" class="delete btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div>'
							}
						],
	});

	$('#employee-grid tbody').on( 'click', 'button.edit', function ()	//Handeling Edit Button Click
	{
		var data = dataTable.row( $(this).parents('tr') ).data();
		alert(data['id']);	//id = index of ID sent from server
	});

	$('#employee-grid tbody').on( 'click', 'button.delete', function ()	//Handeling Delete Button Click
	{
		var data = dataTable.row( $(this).parents('tr') ).data();
		alert(data['id']);	//id = index of ID sent from server
	});
});
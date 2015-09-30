$(document).ready(function() {
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
						{	"data": null					},		//If it is not null then buttons would not be shown
						{	"data": null					}
					],
		//"pagingType": "full_numbers",	//Adding Last and First in Pagination
		stateSave: true,
		"columnDefs":	[								//For Action Buttons (Edit and Delete button) adding in the Action Column
							{
								//"visible": false,
								"orderable": false,		//Turn off ordering
								"searchable": false,	//Turn off searching
								"targets": [4],			//Going to last column - 3 is the last column index because o is starting index
								"data": null,			//Not receiving any data
								"defaultContent": '<div style="min-width:70px" class="btn-group" role="group"><button type="button" class="edit btn btn-warning btn-sm"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button><button type="button" class="delete btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div>'
							},
							{
								'targets': [3],
								'searchable':false,
								'orderable':false,
								'className': 'dt-body-center',
								'render': function (data, type, full, meta)
								{
									return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data['id']).html() + '">';
								}
							}
						],
		dom: 'l<"toolbar">Bfrtip',	//"Bfrtip" is for column visiblity - B F and R become visible
		initComplete:	function()	//Adding Custom button in Tools
						{
							$("div.toolbar").html('<button onclick="merge_selectd_collumns()" type="button" class="btn btn-info btn-sm" style="float:right;">Merge Selected Columns</button>');
						}
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

	//Select All
	$('#select_all').click(function(e)
	{
		var table= $(e.target).closest('table');
		$('td input:checkbox',table).prop('checked',this.checked);
	});
});

function merge_selectd_collumns()
{
	var tableControl= document.getElementById('employee-grid');
	var arrayOfValues = [];
	arrayOfValues	=	$('input:checkbox:checked', tableControl).map(function()
						{
							var temp_data = $(this).val();//closest('tr').find('td:last').html();
							if (!isNaN(temp_data))
								return temp_data;
						});
	if(arrayOfValues.length>1)
	{
		console.log(arrayOfValues);
	}
}
(function() {

            $(init); //WHEN loads please call the init function
            function init() {
                $("#hiddenID").hide();
                $("#PreNexDiv").hide();
                $("#loadAllDetails").click(loadAllDetails);
                $("#searchDetails").click(searchDetails);
                $("#btnUpdate").hide();
                $("#btnNext").click(btnNext);
                $("#btnPrev").click(btnPrev);

                var textId = $("#textId");
                var table = $("#results");
                var tbody = table.find("tbody");

                function DisplayData(tbody, order)
                 {
                        tbody.append('<tr><td class="id1">' + order.id + '</td><td>' + order.age +
                        '</td><td>' + order.name + '</td><td>' + order.gender +
                        '</td><td>' + order.company + '</td><td>' + order.email +
                        '</td><td><button type="button" id="btnEdit" ' +
                        'data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-edit">' +
                        '</span></button></td><td><button type="button" id="btnRemove">' +
                        '<span  class="glyphicon glyphicon-trash"></span></button></td></tr>');

                }
                function errorFunction()
                 { 
                    alert("loading error"); 
                }




                $("#results").on('click', '#btnRemove', function() 
                {
                    var a = $('td:first', $(this).parents('tr')).text();            
                    $(this).closest('tr').remove();
                    $.ajax({
                                method: "DELETE",
                                url: 'http://localhost:8090/users/' + a.trim(),
                                success: function(list)
                                         {
                                            alert(" user has been deleted");
                                         }
                        });
                });

                $("#frmSaveUpdate").on('submit', function() 
                {
                        var user = {
                                        "age": $('#txtAge').val(),
                                        "name": $('#txtName').val(),
                                        "gender": $('#txtGender').val(),
                                        "company": $('#txtCompany').val(),
                                        "email": $('#txtEmail').val()
                                    };

                        $.ajax({
                                    type: 'POST',
                                    url: "http://localhost:8090/users",
                                    data: user,
                                    success: AddDetail,
                                    error: errorFunction

                                });

                }); //btnSave

                function AddDetail(order) 
                {
                    DisplayData(tbody, order);
                }
                page = 1;

                function loadAllDetails() 
                {
                    
                    $("#PreNexDiv").show();
                    var vtextId = textId.val();

                    $.ajax({
                                url: "http://localhost:8090/users?q=" + vtextId + "&_start=" + page + "&_limit=10",
                                dataType: "jsonp",
                                success: display,
                                error: errorFunction
                            });
                }

                function display(data)
                 {
                    tbody.empty();
                    $.each(data, function(i, order)
                     {
                        DisplayData(tbody, order);
                    });

                }

                function searchDetails() 
                {
                    var vtextId = textId.val();

                     $.ajax({

                                url: "http://localhost:8090/users?id=" + vtextId,
                                dataType: "jsonp",
                                success: renderDetail,
                                error: errorFunction
                            });
                }

                function renderDetail(order)
                 {
                    tbody.empty();
                    DisplayData(tbody, order[0]);
                 }

                $("#results").on('click', '#btnEdit', function() 
                {
                    $("#btnUpdate").show();
                    var a = $('td:first', $(this).parents('tr')).text();

                    $.ajax({
                                method: "GET",
                                url: 'http://localhost:8090/users/' + a.trim(),
                                dataType: 'json',
                                success: function(data) 
                                        {
                                                $("#hiddenID").val(data.id),
                                                $("#txtName").val(data.name),
                                                $("#txtGender").val(data.gender),
                                                $("#txtCompany").val(data.company),
                                                $("#txtEmail").val(data.email),
                                                $("#txtAge").val(data.age);
                                         }
                            });
                });

                $("#frmSaveUpdate").submit(function()
                 {
                      var a = $("#hiddenID").val();
                      var user = {                
                                        age: $('#txtAge').val(),
                                        name: $('#txtName').val(),
                                        gender: $('#txtGender').val(),
                                        company: $('#txtCompany').val(),
                                        email: $('#txtEmail').val()

                                 };

                         $.ajax({
                                    method: "PATCH",
                                    url: 'http://localhost:8090/users/' + a,
                                    data: user,
                                    success: function(data) 
                                                {
                                                    alert("updated successfully");
                                                    location.reload();
                                                }
                                 });
                });

                //btnNext
                if (page <= 1) 
                   { 
                        $("#btnPrev").hide();
                   }

                function btnPrev() 
                {
                    if (page > 1)
                     {
                        $("#btnPrev").show();
                        page--;

                        $.ajax({
                                    type: "GET",
                                    url: "http://localhost:8090/users/?&_page=" + page + "&_limit=10",
                                    success: display,
                                    error: errorFunction
                            });

                        if (page <= 1) 
                            {
                                 $("#btnPrev").hide();
                             }
                      }
                 }

                function btnNext()
                 {
                      if (page == 1)
                            $("#btnPrev").show();
                  
                       else if (page == 3999) 
                        {
                            $("#btnPrev").show();

                        }
                        page++;
                        var vtextId = textId.val();

                        $.ajax({
                                    url: "http://localhost:8090/users/?&_page=" + page + "&_limit=10",
                                    dataType: "jsonp",
                                    success: display,
                                    error: errorFunction
                              });
                  }

        }
})();

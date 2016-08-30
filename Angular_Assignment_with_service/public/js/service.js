app.factory('myService',function($http)
{
 	var page=1;
 	var myService={};
 	//method for search text 

 	myService.getPeople=function(txtSearch)
 	{
 		alert("hi");
 		return $http.get("http://localhost:8090/users?id=" + txtSearch); 	

 	};
 	myService.getAll=function()
 	{
 		return $http.get("http://localhost:8090/users?&_start=" + page + "&_limit=10");

 	};
 	myService.postAll=function(order)
 	{


 		return $http.post("http://localhost:8090/users/",order);
 	};
 	myService.deleteAll=function(id)
 	{
 		return $http.delete("http://localhost:8090/users/"+id);
 	};
 	myService.editServ=function(id)
 	{
 		return $http.get("http://localhost:8090/users/"+id);

 	};
 	myService.updateServ=function(id,order)
 	{
 		return $http.put("http://localhost:8090/users/" +id ,order);
 	};
 	return myService;


});
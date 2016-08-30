
var app=angular.module("crudModule",[]);

app.directive('drCustom',function(){
	return{
		restrict:'AE',
		templateUrl:'html/dr-custom.html'
	};
});
app.controller("crudController",function($scope,myService) 
								{
										

									$scope.searchDetails=function(){
									// 		//alert("search");
									// getpple();										
								
									// 	function getpple() {
											
										myService.getPeople($scope.txtSearch)
										.success(function(response){
											$scope.data=response;
											console.log($scope.txtSearch);
											console.log($scope.data);
										})
										.error(function (error)
										{
											$scope.data=error.statusText;

										});

																	
									};  // end of searcDetails

									/*
									$scope.loadAllDetails=function(){
										$http.get("http://localhost:8090/users?&_start=" + page + "&_limit=10")
										.then(function(response)
										{
											$scope.data=response.data;
										});
									}*/



									$scope.loadAllDetails=function(){
										
											myService.getAll()
										.success(function(response){
											$scope.data=response;
										
											console.log($scope.data);
										})
										.error(function (error)
										{
											$scope.data=error.statusText;

										});	
										
									};

                            
                                  $scope.mdlSave=function()
                                  {
                                  	alert("hi");

												myService.postAll($scope.order)

											.success(function(response){
												$scope.data=[response];
											
												console.log($scope.order);
											})
											.error(function (error)
											{
												$scope.data=error.statusText;

											});	
										// };

                                  };
                                  	$scope.RemoveDetails=function(id)
                                  	{
                                  		alert("hi");
                                  		myService.deleteAll(id)
                                  			.success(function(response){
												$scope.order=response;
											
											
												console.log($scope.order);
											});
                                  		};

                                  			$scope.mdlEdit=function(id)
                                  			{
                                  				$scope.savehide=true;
                                  				console.log(id);
                                  				myService.editServ(id)
                                  				.success(function(response){
												$scope.order=response;
											$scope.order={};
												console.log($scope.order);
											});

                                  		};
                                  		$scope.createDetails=function(){
                                  			console.log("inside clearDetails");
										   		console.log($scope.order);
										   		$scope.order={};
										   		console.log($scope.order);
										   	};
										   	/*$scope.click=function(){
										   		console.log("hi");
										   	}*/

                                  		$scope.mdlUpdate=function(id,order)
                                  		{
                                  				myService.updateServ(id)
                                  				.success(function(response){
												$scope.data=[response];
											
												console.log($scope.data);
											});
                                  		};

									/*$scope.mdlSave=function(){										
										$http.post("http://localhost:8090/users",$scope.order)
										.then(function(response)
										{
											$scope.data=[response.data];
											alert("inserted");
										});

									} 

									$scope.RemoveDetails=function(id){

										console.log(id);
										$http.delete("http://localhost:8090/users/"+id)
										.then(function(response)
										{
											$scope.data=response.data;
											alert("deleted");
										});
									}

									$scope.mdlEdit=function(id){
										console.log(id);
										$http.get("http://localhost:8090/users/"+id)
										.then(function(response){
											$scope.order=response.data;
											
										});
									}

									$scope.mdlUpdate=function(){
										//console.log($scope.order.id);
										$http.put("http://localhost:8090/users/"+ $scope.order.id, $scope.order)
										.then(function(response){
											$scope.data=[response.data];
											alert("Updated successfully");

										});
									}


								*/
								});
								
                    

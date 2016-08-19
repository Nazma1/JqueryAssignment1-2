(function() {

    $(init); //WHEN loads please call the init function
    function init() {
        $("#searchMovie").click(searchMovie);

        var movieTitle = $("#movieTitle");
        var table = $("#results");
        var tbody = table.find("tbody"); //$("#results tbody");    //or  table.find("tbody")

        function searchMovie() {
            var titles = movieTitle.val();
            alert("searchMovie  " + titles);
            $.ajax({
                url: "http://www.omdbapi.com/?t=" + titles + "&y=&plot=short&r=json",
                dataType: "jsonp ",
                success: renderMovies
            });
        }

        function renderMovies(titles) {
        
            tbody.empty(); //empty is a jquery element can be applied to any dom element 
            {
                tbody.append('<tr><td>' + titles.Title + '</td><td>' + titles.Year + 
                    '</td><td>' + titles.imdbID + '</td><td><img src="' + titles.Poster + '"</img></td></tr>');
            };
        }

    }
})();

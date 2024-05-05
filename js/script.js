//membuat function search movie berdasarkan klik
function searchMovie(){
    $('#movie-list').html('');
    
        $.ajax({
        url : 'http://www.omdbapi.com/',
        type: 'GET',
        dataType: 'json',
        data: {
            apikey : '9b2f93dd',
            s : $('#search-input').val()
        },
        success: function( result){
            if (result.Response == "True"){

                //bikin variabel baru buat ambil search aja
                let movies = result.Search;
                console.log(movies);

                //looping
                $.each(movies, function (i, data){
                    $('#movie-list').append(`
                        <div class="col-md-4">
                        <div class="card mb-3">
                                <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">`+data.Title+`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" `+data.imdbID+`>See Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });

                $('#search-input').val('');

            } else{
                $('movie-list').html('<h1 class="text-center">Movie NotFound!</h1>')
            }
        }
    });
}

$('#search-button').on('click', function (){
    //tinggal panggil aja
    searchMovie(); 
});

//buat search pake enter
$('#search-input').on('keyup', function (e){
    if (e.keyCode === 13){
        searchMovie();
    }
});

$('#movie-detail').on('click', '.see-detail', function () {
    
    $.ajax({
        url : 'http://www.omdbapi.com/',
        type: 'GET',
        dataType: 'json',
        data: {
            apikey : '9b2f93dd',
            i : $(this).data('id')
        },

        success: function (movie) {
            if (movie.Response === "True"){

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+movie.Poster+`" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+movie.Title+`</h3>/li>
                                 </ul>

                            </div>
                        </div>
                    </div>

                `);
            }
        }
    });
});

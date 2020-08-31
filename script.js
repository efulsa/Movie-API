function searchMovie(){
    $('#movie-list').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '39ce63ab',
            's' : $('#search-input').val()
        },
        success: function(result){
        if(result.Response == 'True'){
            let movies = result.Search;
            $.each(movies, function(i, data){
                $('#movie-list').append(`
                    <div class="card p-2 m-1" style="width: 18rem;">
                        <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">`+ data.Title +`</h5>
                        <p class="card-text">`+ data.Year +`</p>
                        <button type="button" class="see-detail btn btn-info" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">Detail</button>
                        <a target="_blank" href="https://www.imdb.com/title/`+ data.imdbID +`" class="btn btn-outline-warning">Trailer</a>
                    </div>
                `);
            })
            $('#search-input').val('')
        }else{
            // $('#movie-list').html('<h1 class="text-center"> Movie Not Found ! </h1>')
            $('#movie-list').html(`
            <div class="col">
                    <h1 class="text-center">` + result.Error +  `</h1>
            </div>        
            `)
        }
        }
    })
}
$('#search-button').on('click', function(){
    searchMovie(); //jika button di click
})
$('#search-input').on('keyup', function(event){
    if(event.keyCode === 13){
        searchMovie(); //jika enter ditekan
    }
})
$('#movie-list').on('click', '.see-detail', function(){
    // console.log($(this).data('id'))
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '39ce63ab',
            'i': $(this).data('id')
        },
        success: function(movie){
            if(movie.Response == 'True'){
                $('.modal-title').html(movie.Title)
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col">
                            <img src="`+ movie.Poster +`" class="img-thumbnail">
                            </div>
                            <div class="col">
                            <li class="list-group-item">Released    : `+ movie.Released +`</li>
                            <li class="list-group-item">Rated       : `+ movie.Rated +`</li>
                            <li class="list-group-item">Runtime     : `+ movie.Runtime +`</li>
                            <li class="list-group-item">Genre       : `+ movie.Genre +`</li>
                            <li class="list-group-item">Director    : `+ movie.Director +`</li>
                            
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                            <li class="list-group-item">Writer      : `+ movie.Writer +`</li>
                            <li class="list-group-item">Actors      : `+ movie.Actors +`</li>
                            <li class="list-group-item">Plot        : `+ movie.Plot +`</li>
                            <li class="list-group-item">Language    : `+ movie.Language +`</li>
                            <li class="list-group-item">Country     : `+ movie.Country +`</li>
                            <li class="list-group-item">Awards      : `+ movie.Awards +`</li>
                            </div>
                        </div>
                    </div>
                `)
                let rating = movie.Ratings;
                $.each(rating, function(i, data){
                    $('thead').append(`<th>`+ data.Source +`</th>`)
                    $('tbody').append(` <td>`+ data.Value +`</td>
                    `)
            })
        }
        }
    })
})
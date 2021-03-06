$(".upvote").on('click', function(event) {

    event.preventDefault();

    if(!$(this).hasClass('disabled')){
    var rating = $(this).siblings('.rating');
    var term = $(this).siblings($("input[name='term']")).val();
    var definition = $(this).siblings(".form-def").val();
    var data = {
        "term": term,
        "definition": definition
    };
    $.ajax({
        url: "/definitions/update/up",
        method: "POST",
        data: data
    }).done(function(response) {
        for (var i = 0; i < response.definitions.length; i++) {
            if (response.definitions[i].definition === definition) {
                rating.text(response.definitions[i].rating);
            }
        }
    }).fail(function() {
        console.log("failure");
    });
    $(this).addClass('disabled')
    $(this).siblings('.downvote').addClass('disabled')
  }
});

$(".downvote").on('click', function(event) {

    event.preventDefault();

    if(!$(this).hasClass('disabled')){
      var rating = $(this).siblings('.rating');
    var term = $(this).siblings($("input[name='term']")).val();
    var definition = $(this).siblings(".form-def").val().replace(/(\r\n|\n|\r)/gm," ");
    var data = {
        "term": term,
        "definition": definition
    };
    $.ajax({
        url: "/definitions/update/down",
        method: "POST",
        data: data
    }).done(function(response) {
        for (var i = 0; i < response.definitions.length; i++) {
            if (response.definitions[i].definition === definition) {
                rating.text(response.definitions[i].rating);
            }
        }
    }).fail(function() {
        console.log("failure");
    });
    $(this).addClass('disabled')
    $(this).siblings('.upvote').addClass('disabled')
  }
});

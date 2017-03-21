var terms;
//on click of letter
$( ".paginationLinks" ).click(function(event) {
  event.preventDefault();
  console.log($(this).text())
  var jumpToLetter = $(this).text()
    findWord = function() {
      for (var i = 0; i < terms.length; i++) {
        var searchable = terms[i].term.toLowerCase()
        if(searchable.charAt(0) === jumpToLetter){
          return terms[i].term
        }
      }
    };
    var rotateWheel = setInterval(function(){
         startAction();
      if ($('#term-01').text() === findWord()){
        clearInterval(rotateWheel);
      }
    }, 100);
  rotateWheel();
});

//DISABLE LINKS

//on page load find all first letters of terms and put into array without duplicates
//check pagination links against first letters of terms
//if letter is missing then run disable function
//disable function greys out letter in pag and doesn't allow clicking.

$(document).ready(function(){
  console.log();
  $.ajax({
    url: "/wheel",
    method: "GET",
  }).done(function(response) {
    terms = response;
    var letterArr = [];
    terms.forEach(function(term){
      letterArr.push(term.term.charAt(0).toLowerCase());
    });
    paginationArr = $('.paginationLinks').text().split('')
    paginationArr.pop();
    paginationArr.shift();

    console.log(letterArr, paginationArr)
  });
});

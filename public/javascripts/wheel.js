window.onload = function() {

  var colours = ["#F9C00C", "#03A9F4", "#9C56BB", "#FF5722", "#FF4081"];

  var dom = [];
  var index = [];

  var declareVariables = function(item) {
    var arr = [];
    for (var j = 0; j < 9; j++) {
      arr[j] = document.getElementById(item + "-0" + (10-(j+1)) );
    }
    dom.push(arr);
  };

  declareVariables("term");
  declareVariables("summary");
  declareVariables("link");

  for (var i = 0; i < 9; i++) {
    var indexName = "index" + i;
    indexName = i;
    index.push(indexName);
  }

  var terms;

  $.ajax({
    url: "/show",
    method: "GET",
  }).done(function(response) {

    terms = response;

    }).then(function() {

      outputTermString = function(index){
        var string = terms[index].term;
        return string;
      };
      outputDefString = function(index){
        var string = terms[index].summary.split('').slice(0, 40).join("") + '...';
        return string;
      };
      outputShowLink = function(index){
        var term = terms[index].term;
        return "/definitions/" + term;
      };
      outputColour = function(index){
        var colour = colours[index % colours.length];
        return colour;
      };

      changeIndexLeft = function(passedIndex){
        if (passedIndex < terms.length - 1) {
          return passedIndex + 1;
        }
        else {
          passedIndex = 0;
          return passedIndex;
        }
      };

      changeIndexRight = function(passedIndex){
        if (passedIndex === 0) {
          passedIndex = terms.length - 1;
          return passedIndex;
        }
        else {
          passedIndex = passedIndex - 1;
          return passedIndex;
        }
      };

      changeContent = function(index, term, summ, link) {
        term.textContent = outputTermString(index);
        term.setAttribute("fill", outputColour(index));
        summ.textContent = outputDefString(index);
        link.setAttribute("xlink:href", outputShowLink(index));
      };

      updateInsides = function(i) {
        changeContent(index[i], dom[0][i], dom[1][i], dom[2][i]);
      };

      startLeft = function(){
        index = index.map(function(index){
          return changeIndexLeft(index);
        });
        for (var i = 0; i < 9; i++) {
          updateInsides(i);
        }
      };

      startRight = function(){
        index = index.map(function(index){
          return changeIndexRight(index);
        });
        for (var i = 0; i < 9; i++) {
          updateInsides(i);
        }
      };

    startRight();
    startLeft();
  });
};

$(".tag").on('change', 'select', function(event) {
    event.preventDefault();
});

document.body.onkeydown = function(event){
  event = event || window.event;
  var keycode = event.charCode || event.keyCode;
  if(keycode === 37 || keycode === 40 ){
    startLeft();
  } else if(keycode === 39 || keycode === 38){
    startRight();
  }
};

$(".item").click(function(event) {
  bgcolour = ($(event.target.getAttribute('xlink:href')).children(".term")[0].attributes.fill.value);
  sessionStorage.setItem("bgcolour", bgcolour);
});

var url="https://my-json-server.typicode.com/muhammadjafar/pwaapi/products";
$(document).ready(function(){

	var dataresults='';
	var catresults='';
	var categories=[];
	function renderPage(data){
	// $.get(url, function(data){
		$.each(data, function(key, items){

			_cat=items.category;

			dataresults+="<div>"
				+"<h3>"+ items.name + "</h3>"
				+"<h5>"+ _cat + "</h5>"
			"</div>";
			if ($.inArray(_cat, categories) == -1) {
				categories.push(_cat);
				catresults +="<option value='"+_cat+"'>" + _cat + "</option>";
			}
		});

		$('#products').html(dataresults);
		$('#cat').html("<option value='all'>Semua</option>" + catresults);
	// });
	}

	var networkDataReceive=false

	var networkUpdate=fetch(url).then(function(response){
		return response.json()
	}).then(function(data){
		networkDataReceive=true
		renderPage(data)
	})

	caches.match(url).then(function(response){
		if (!response) throw Error('no data on cache')
		return response.json()
	}).then(function(data){
		if (!networkDataReceive) {
			renderPage(data)
			console.log('render data from cache')
		}
	}).catch(function(){
		return networkUpdate
	})
});
$('#cat').on('change', function(){
	updateProduct($(this).val());
});
function updateProduct(cat){
	var newUrl=url;
	var dataresults='';
	if (cat != 'all') {
		newUrl=url+'?category='+cat;
	}
	$.get(newUrl, function(data){
		$.each(data, function(key, items){

			_cat=items.category;

			dataresults+="<div>"
				+"<h3>"+ items.name + "</h3>"
				+"<h5>"+ _cat + "</h5>"
			"</div>";
			
		});

		$('#products').html(dataresults);
	});
}



// pwa
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
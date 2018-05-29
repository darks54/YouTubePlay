chrome.tabs.query({url: "https://www.youtube.com/watch*"}, function(tabs) {
	var i;
	for (i = 0; i < tabs.length; i++) { 
		
		document.getElementById('buttonList').innerHTML += '<div class="line"><div class="title" title="'+tabs[i].title+'">'+tabs[i].title+'</div><button id="button_'+i+'" class="button-play pause"><button id="volume_'+i+'" class="button-volume on"></button><input id="slider_'+i+'" type="range" class="slider" max="1" min="0" step="0.01"></div>';
		
		chrome.tabs.executeScript(
			tabs[i].id,
			{code: "'"+i+";' + document.querySelector('video').paused;"},
			function(result) 
			{
				var results = result[0].split(";");
				if(results[1]=="true")
				{
					document.getElementById('button_'+results[0]).classList.add('play');
					document.getElementById('button_'+results[0]).classList.remove('pause');
				}
				else
				{
					document.getElementById('button_'+results[0]).classList.add('pause');
					document.getElementById('button_'+results[0]).classList.remove('play');
				}
			}
		);
		
		chrome.tabs.executeScript(
			tabs[i].id,
			{code: "'"+i+";' + document.querySelector('video').muted;"},
			function(result) 
			{
				var results = result[0].split(";");
				if(results[1]=="true")
				{
					document.getElementById('volume_'+results[0]).classList.add('off');
					document.getElementById('volume_'+results[0]).classList.remove('one');
				}
				else
				{
					document.getElementById('volume_'+results[0]).classList.add('on');
					document.getElementById('volume_'+results[0]).classList.remove('off');
				}
			}
		);
		
		chrome.tabs.executeScript(
			tabs[i].id,
			{code: "'"+i+";' + document.querySelector('video').volume;"},
			function(result) 
			{
				var results = result[0].split(";");
				document.getElementById('slider_'+results[0]).value = results[1];
			}
		);
	}
	
	var buttons =document.getElementsByClassName('button-play');
	var volumes =document.getElementsByClassName('button-volume');
	var sliders =document.getElementsByClassName('slider');
	
	for (var b=0; b < buttons.length; b++) {
		buttons[b].onclick = function(element) {
			var j = this.id.split("_")[1];
			chrome.tabs.executeScript(
			tabs[j].id,
			{code: "'"+j+";' + document.querySelector('video').paused;"},
			function(result) 
			{
				var results = result[0].split(";");
				if(results[1] == 'true')
				{
					chrome.tabs.executeScript(
					tabs[results[0]].id,
					{code: "document.querySelector('video').play();'"+results[0]+"';"},
					function(result) 
					{
						document.getElementById('button_'+result[0]).classList.add('pause');
						document.getElementById('button_'+result[0]).classList.remove('play');
					});
				}
				else
				{
					chrome.tabs.executeScript(
					tabs[results[0]].id,
					{code: "document.querySelector('video').pause();'"+results[0]+"';"},
					function(result) 
					{
						document.getElementById('button_'+result[0]).classList.add('play');
						document.getElementById('button_'+result[0]).classList.remove('pause');
					});
				}
			});
		}
	}
	
	for (var b=0; b < volumes.length; b++) {
		volumes[b].onclick = function(element) {
			var j = this.id.split("_")[1];
			chrome.tabs.executeScript(
			tabs[j].id,
			{code: "'"+j+";' + document.querySelector('video').muted;"},
			function(result) 
			{
				var results = result[0].split(";");
				if(results[1] == 'true')
				{
					chrome.tabs.executeScript(
					tabs[results[0]].id,
					{code: "document.querySelector('video').muted = false;'"+results[0]+"';"},
					function(result) 
					{
						document.getElementById('volume_'+result[0]).classList.add('on');
						document.getElementById('volume_'+result[0]).classList.remove('off');
					});
				}
				else
				{
					chrome.tabs.executeScript(
					tabs[results[0]].id,
					{code: "document.querySelector('video').muted = true;'"+results[0]+"';"},
					function(result) 
					{
						document.getElementById('volume_'+result[0]).classList.add('off');
						document.getElementById('volume_'+result[0]).classList.remove('on');
					});
				}
			});
		}
	}
	
	for (var b=0; b < sliders.length; b++) {
		sliders[b].oninput = function(element) {
			var j = this.id.split("_")[1];
			chrome.tabs.executeScript(tabs[j].id, {code: "document.querySelector('video').volume = "+this.value+";'"+j+"';"});
		}
	}
	
	if(tabs.length == 0){
		document.getElementById('buttonList').innerHTML += '<div class="title">Aucun onglet trouvé</div>';
	}
});

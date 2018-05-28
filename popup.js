let changeColor = document.getElementById('changeColor');

chrome.tabs.query({url: "https://www.youtube.com/watch*"}, function(tabs) {
	var i;
	for (i = 0; i < tabs.length; i++) { 
		
		document.getElementById('buttonList').innerHTML += '<button id="button_'+i+'">'+tabs[i].title+'</button>';
		
		chrome.tabs.executeScript(
		tabs[i].id,
		{code: "'"+i+";' + document.querySelector('.ytp-play-button').getAttribute('aria-label');"},
		function(result) {
			var results = result[0].split(";");
			if(results[1]=="Pause"){
				document.getElementById('button_'+results[0]).style.background = 'rgb(58, 167, 87)';
			}
			else
			{				
				document.getElementById('button_'+results[0]).style.background = 'rgb(232, 69, 60)';
			}
		});
		
		document.getElementById('button_'+i).onclick = function(element) {
			var j = element.target.id.split("_")[1];
			chrome.tabs.executeScript(
			tabs[j].id,
			{code: "document.querySelector('.ytp-play-button').click();'"+j+"';"},
			function(result) {
				if(document.getElementById('button_'+result[0]).style.background == 'rgb(232, 69, 60)'){
					document.getElementById('button_'+result[0]).style.background = 'rgb(58, 167, 87)';
				}
				else
				{				
					document.getElementById('button_'+result[0]).style.background = 'rgb(232, 69, 60)';
				}
			});
		}
	}
});
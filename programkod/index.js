var stadium;
var renderare;
var texter = [];
var textIntervall = 2000;
var textHastighet = 1;
var timer;

function initiera()
{
    stadium = new PIXI.Stage(0x66FF99);
 
    // create a renderare instance.
    renderare = PIXI.autoDetectRenderer(800, 600);
 
    // add the renderare view element to the DOM
    document.body.appendChild(renderare.view);
	
	timer = setInterval(laggTillNyText, textIntervall);
	
	document.addEventListener('keypress', nyckelHanterar);
	
    requestAnimFrame(animera);
}

function animera() 
{
	// render the stadium   
	renderare.render(stadium);
	
	for (index in texter)
	{
		texter[index].obj.position.x += textHastighet;
	}
	
	requestAnimFrame(animera);
}

function laggTillNyText()
{
	var slumpvis = Math.floor(Math.random() * ord.length);
	var slumpvisOrd = ord[slumpvis];
	
	var text = new PIXI.Text(slumpvisOrd);
	text.position.x = -100;
	var slumpvisY = Math.floor(Math.random() * 560) + 20;
	text.position.y = slumpvisY;
	stadium.addChild(text, {});
	
	texter.push({ obj: text, text: slumpvisOrd});
	
	clearInterval(timer);
	timer = setInterval(laggTillNyText, textIntervall);
}

function nyckelHanterar(e)
{
	console.log(e.keyCode);
	
	for (index in texter)
	{
		var forst = texter[index].text.charAt(0);
		if (forst.charCodeAt(0) == e.charCode)
		{
			texter[index].obj.setText(texter[index].text.substr(1));
			texter[index].text = texter[index].text.substr(1);
			
			if (texter[index].text.length <= 0)
			{
				delete texter[index];
				
				textHastighet += 0.05;
				textIntervall -= 50;
			}
		}
	}
}
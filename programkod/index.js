var stadium; // Stage
var renderare; // Renderer
var texter = []; // Array of visible texts
var textIntervall = 2000; // Interval of new texts popping on the screen
var textHastighet = 4; // Speed of texts
var timer; // Text timer
var hjardar = [];
var poangtext;
var poang = 0;
var poangtimer;

var VIDD = 800;
var HODD = 600;

var stadiumNormalFarg = 0x3498db;
var stadiumAlarmFarg = 0xe74c3c;

function initiera() // Init the program / game
{
    stadium = new PIXI.Stage(stadiumNormalFarg); // Create stage
    renderare = PIXI.autoDetectRenderer(VIDD, HODD); // Create renderer
 
    document.body.appendChild(renderare.view); // Add rendered view to the document
	
	var hjartatextur = PIXI.Texture.fromImage('programkod/resurser/hjarta.png');
	
	for(var i = 0; i < 3; i++)
	{
		var hjarta = new PIXI.Sprite(hjartatextur);
		
		hjarta.width = 50;
		hjarta.height = 50;
		
		hjarta.y = 15;
		hjarta.x = 15 + i * hjarta.width + 15 * i;
		
		stadium.addChild(hjarta);
		hjardar.push(hjarta);
	}
	
	poangtext = new PIXI.Text('Poäng: 0');
	poangtext.x = VIDD - 30 - poangtext.width;
	poangtext.y = 15;
	stadium.addChild(poangtext);
	
	timer = setInterval(laggTillNyText, textIntervall); // Start text spawn timer
	
	document.addEventListener('keypress', nyckelHanterar); // Key press handler
	
    requestAnimFrame(animera); // Start game / animation loop
}

function animera() 
{   
	renderare.render(stadium); // Render everything
	
	
	for (index in texter) // Make all visible texts move to the right
	{
		var t = texter[index].obj;
		
		t.position.x += textHastighet;
		
		if(t.position.x + t.width > VIDD)
		{
			stadium.removeChild(texter[index].obj);
			delete texter[index];
			
			stadium.removeChild(hjardar[hjardar.length - 1]);
			hjardar.splice(hjardar.length - 1, 1);
			//delete hjardar[hjardar.length - 1];
			
			if(hjardar.length <= 0)
			{
				setTimeout(function()
				{
					alert('! VINSTER 0 KRONOR !');
					location.reload();
				}, 100);
			}
		}
	}
	
	poang += 1;
	poangtext.setText('Poäng: ' + poang);
	poangtext.x = VIDD - 15 - poangtext.width;
	requestAnimFrame(animera); // Loop
}

function laggTillNyText() // Function to spawn new texts on the screen
{
	var slumpvis = Math.floor(Math.random() * ord.length); // Random text bank index
	var slumpvisOrd = ord[slumpvis]; // Random text bank word
	
	var text = new PIXI.Text(slumpvisOrd); // New PIXI text object
	text.position.x = -100; // Set text horizontal position
	
	var slumpvisY = Math.floor(Math.random() * 560) + 20; // Random text vertical position
	text.position.y = slumpvisY;
	
	stadium.addChild(text, {}); // Add text to stage
	
	texter.push({ obj: text, text: slumpvisOrd}); // Add text to visible text array
	
	clearInterval(timer);
	timer = setInterval(laggTillNyText, textIntervall);
}

function nyckelHanterar(e) // Key press handling function
{
	var korrekt = false;

	for (index in texter) // Loop through all visible texts
	{
		var forst = texter[index].text.charAt(0); // Get first character of a word
		
		
		if (forst.charCodeAt(0) == e.charCode) // If the first character is the same character that the player pressed
		{
			texter[index].obj.setText(texter[index].text.substr(1)); // Remove first character
			texter[index].text = texter[index].text.substr(1); // Rebuild the word without the first character
			
			korrekt |= true;
			
			if (texter[index].text.length <= 0) // If the word is gone / written
			{
				delete texter[index]; // Delete the text from visible texts
				
				textHastighet += 0.05; // Increase text move speed
				textIntervall -= 50; // Increase text spawn speed
			}
			
			poang += 10;
		}
	}
	
	if (!korrekt)
	{
		stadium.setBackgroundColor(stadiumAlarmFarg);
		poang -= 50;
		
		setTimeout(function()
		{
			stadium.setBackgroundColor(stadiumNormalFarg);
		}, 33);
	}
}
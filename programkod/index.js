var stadium; // Stage
var renderare; // Renderer
var texter = []; // Array of visible texts
var textIntervall = 2000; // Interval of new texts popping on the screen
var textHastighet = 1; // Speed of texts
var timer; // Text timer

function initiera() // Init the program / game
{
    stadium = new PIXI.Stage(0x66FF99); // Create stage
    renderare = PIXI.autoDetectRenderer(800, 600); // Create renderer
 
    document.body.appendChild(renderare.view); // Add rendered view to the document
	
	timer = setInterval(laggTillNyText, textIntervall); // Start text spawn timer
	
	document.addEventListener('keypress', nyckelHanterar); // Key press handler
	
    requestAnimFrame(animera); // Start game / animation loop
}

function animera() 
{   
	renderare.render(stadium); // Render everything
	
	for (index in texter) // Make all visible texts move to the right
	{
		texter[index].obj.position.x += textHastighet;
	}
	
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
	for (index in texter) // Loop through all visible texts
	{
		var forst = texter[index].text.charAt(0); // Get first character of a word
		
		if (forst.charCodeAt(0) == e.charCode) // If the first character is the same character that the player pressed
		{
			texter[index].obj.setText(texter[index].text.substr(1)); // Remove first character
			texter[index].text = texter[index].text.substr(1); // Rebuild the word without the first character
			
			if (texter[index].text.length <= 0) // If the word is gone / written
			{
				delete texter[index]; // Delete the text from visible texts
				
				textHastighet += 0.05; // Increase text move speed
				textIntervall -= 50; // Increase text spawn speed
			}
		}
	}
}
function load()
{
	PrototypeApp();
}

var theKeymap = {
	left: false,
	right: false,
	up: false,
	down: false,
	a: false,
	b: false,
	c: false,
};

var drawType = 0;

function PrototypeApp()
{
	var theCanvas = document.getElementById("TheCanvas");
	var canvasContext = theCanvas.getContext("2d");

	//---------------------------------------------------------------------------
	// drawScreen
	//---------------------------------------------------------------------------
	function drawScreen()
	{
		canvasContext.fillStyle = "#000000";
		canvasContext.fillRect( 0, 0, theCanvas.width, theCanvas.height );

		switch( drawType )
		{
			case 0: fancyView.draw( canvasContext ); break;
			case 1: fancyView.drawSlanted( canvasContext ); break;
			case 2: fancyView.drawSlanted2( canvasContext ); break;
			default: fancyView.draw( canvasContext );
		}

		canvasContext.fillStyle = "#555555";
		canvasContext.fillRect( 0, 0, theCanvas.width, 8 );
		canvasContext.fillRect( 0, theCanvas.height -8, theCanvas.width, 8 );
		canvasContext.fillRect( 0, 0, 8, theCanvas.height );
		canvasContext.fillRect( theCanvas.width-8, 0, theCanvas.width, theCanvas.height );
	}

	function update()
	{
		if( theKeymap.left ) { fancyView.mapPos.x -= 4; }
		if( theKeymap.right ) { fancyView.mapPos.x += 4; }
		if( theKeymap.up ) { fancyView.mapPos.y -= 4; }
		if( theKeymap.down ) { fancyView.mapPos.y += 4; }

		if( fancyView.mapPos.x < 0 ) { fancyView.mapPos.x = 0; }
		if( fancyView.mapPos.y < 0 ) { fancyView.mapPos.y = 0; }
		if( fancyView.mapPos.x >= asciiMap.size.width * tileSet.tileSize.width )
		{ fancyView.mapPos.x = asciiMap.size.width * tileSet.tileSize.width - 1; }

		if( fancyView.mapPos.y >= asciiMap.size.height * tileSet.tileSize.height )
		{ fancyView.mapPos.y = asciiMap.size.height * tileSet.tileSize.height - 1; }

		drawScreen();
	}

	//---------------------------------------------------------------------------
	// Event
	//---------------------------------------------------------------------------

	function eventKeyPressed( e )
	{
		var letterPressed = String.fromCharCode( e.keyCode );
		switch( letterPressed )
		{
			case "A": theKeymap.left = true; break;
			case "S": theKeymap.down = true; break;
			case "W": theKeymap.up = true; break;
			case "D": theKeymap.right = true; break;
		}
	}

	function eventKeyReleased( e )
	{
		var letterPressed = String.fromCharCode( e.keyCode );
		switch( letterPressed )
		{
			case "A": theKeymap.left = false; break;
			case "S": theKeymap.down = false; break;
			case "W": theKeymap.up = false; break;
			case "D": theKeymap.right = false; break;
			case "1": drawType = 0; break;
			case "2": drawType = 1; break;
			case "3": drawType = 2; break;
			case "C": fancyView.topScale += 0.01; break;
			case "X": fancyView.topScale = 1.1; break;
			case "Z": fancyView.topScale -= 0.01; break;
			case 'Q': fancyView.scaleASCII = !fancyView.scaleASCII; break;
		}
	}


	//---------------------------------------------------------------------------
	// Init
	//---------------------------------------------------------------------------
	var imagesLoaded = 0;
	var numImagesToLoad = 1;

	function imageLoaded()
	{
		if( ++imagesLoaded < numImagesToLoad )
			return;

		window.addEventListener("keydown", eventKeyPressed, true );
		window.addEventListener("keyup", eventKeyReleased, true );

		setInterval( update, 1000/30 );
		drawScreen();
	}

	tileSet.image = new Image();
	tileSet.image.src = tileSet.imageFilename;
	tileSet.image.onload = imageLoaded;

	//drawScreen();
}

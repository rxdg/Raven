var fancyView = {
	viewSize : { width:46, height:36 },
	screenCenter: { x:320, y:240 },
	mapPos: { x:320, y:240 },
	maxLayers: 4,
	topScale: 1.1,
	scaleASCII: false,

	draw: function( context )
	{
		var layerAlpha = ( 1 / this.maxLayers );
  		var tw = tileSet.tileSize.width;
  		var th = tileSet.tileSize.height;
		var tx = Math.floor( this.mapPos.x / tw );
		var ty = Math.floor( this.mapPos.y / th );
		var offsetx = Math.floor( this.mapPos.x % tw );
		var offsety = Math.floor( this.mapPos.y % th );

		var regMapSize = { width:tw  * asciiMap.size.width,
					      height:th * asciiMap.size.height };
		var regMapPos = { x: -this.mapPos.x,
						  y: -this.mapPos.y};

		var topMapSize = { width:regMapSize.width * this.topScale,
						  height:regMapSize.height * this.topScale };
		var topMapPos = { x: (-this.mapPos.x * this.topScale),
						  y: (-this.mapPos.y * this.topScale)};

		for( var h = 0; h < this.maxLayers; h++ )
		{
			if( h != 0 )
			{
				context.fillStyle = "rgba(0, 0, 0, "+layerAlpha +")";
				context.fillRect( 0, 0, 640, 480 );
			}

			for( var y = 0; y < this.viewSize.height; y++ )
			{
				for( var x = 0; x < this.viewSize.width; x++ )
				{
					var vx = x - this.viewSize.width/2;
					var vy = y - this.viewSize.height/2;

					var tilex = tx + vx;
					var tiley = ty + vy;
					if( tilex < 0 || tiley < 0 ) continue;
					if( tilex >= asciiMap.size.width ) continue;
					if( tiley >= asciiMap.size.height ) continue;

					var block = getBlock(asciiMap.map[tiley].charAt(tilex));
					if( tilex == tx && tiley == ty ) block = asciiBlocks.guy;
					if( block == null || h >= block.length ) continue;

					var code = block[h].charCodeAt(0);
					var xx = (x * tw) - offsetx;	// position into viewport
					var yy = (y * th) - offsety;	// position into viewport

					var regX = regMapPos.x + (tilex * tw);
					var regY = regMapPos.y + (tiley * th);
					var topX = topMapPos.x + (tilex * tw)*this.topScale;
					var topY = topMapPos.y + (tiley * th)*this.topScale;

					var diffX = (topX - regX) / this.maxLayers;
					var diffY = (topY - regY) / this.maxLayers;
					var letterScale = 1.0;

					if( this.scaleASCII )
						letterScale = (this.topScale - 1)/this.maxLayers*h + 1

					tileSet.drawTilex(context, code,
						xx + (diffX*h),
						yy + (diffY*h),
						letterScale);
				}
			}
		}
	},

	drawSlanted: function( context )
	{
		var layerAlpha = ( 1 / this.maxLayers );
  		var tw = tileSet.tileSize.width, th = tileSet.tileSize.height;
		var tx = Math.floor( this.mapPos.x / tileSet.tileSize.width );
		var ty = Math.floor( this.mapPos.y / tileSet.tileSize.height );
		var offsetx = Math.floor( this.mapPos.x % tileSet.tileSize.width );
		var offsety = Math.floor( this.mapPos.y % tileSet.tileSize.height );
		var dx = 4, dy = -4;

		for( var h = 0; h < this.maxLayers; h++ )
		{
			if( h != 0 )
			{
				context.fillStyle = "rgba(0, 0, 0, "+layerAlpha +")";
				context.fillRect( 0, 0, 640, 480 );
			}

			for( var y = 0; y < this.viewSize.height; y++ )
			{
				for( var x = 0; x < this.viewSize.width; x++ )
				{
					var vx = tx - this.viewSize.width/2;
					var vy = ty - this.viewSize.height/2;

					var tilex = x + vx, tiley = y + vy;
					if( tilex < 0 || tiley < 0 ) continue;
					if( tilex >= asciiMap.size.width ) continue;
					if( tiley >= asciiMap.size.height ) continue;


					var block = getBlock(asciiMap.map[tiley].charAt(tilex));
					if( tilex == tx && tiley == ty ) block = asciiBlocks.guy;
					if( block == null || h >= block.length ) continue;

					var code = block[h].charCodeAt(0);
					var xx = (x * tw) - offsetx;
					var yy = (y * th) - offsety;

					tileSet.drawTile(context, code, xx + (dx*h),   yy + (dy*h));
				}
			}
		}
	},

	drawSlanted2: function( context )
	{
		var numLayers = this.maxLayers * 2;
		var layerAlpha = ( 1 / numLayers );
  		var tw = tileSet.tileSize.width, th = tileSet.tileSize.height;
		var tx = Math.floor( this.mapPos.x / tileSet.tileSize.width );
		var ty = Math.floor( this.mapPos.y / tileSet.tileSize.height );
		var offsetx = Math.floor( this.mapPos.x % tileSet.tileSize.width );
		var offsety = Math.floor( this.mapPos.y % tileSet.tileSize.height );
		var dx = 4, dy = -4;

		for( var h = 0; h < this.maxLayers; h++ )
		{
			if( h != 0 )
			{
				context.fillStyle = "rgba(0, 0, 0, "+layerAlpha +")";
				context.fillRect( 0, 0, 640, 480 );
			}

			for( var y = 0; y < this.viewSize.height; y++ )
			{
				for( var x = 0; x < this.viewSize.width; x++ )
				{
					var vx = tx - this.viewSize.width/2;
					var vy = ty - this.viewSize.height/2;

					var tilex = x + vx, tiley = y + vy;
					if( tilex < 0 || tiley < 0 ) continue;
					if( tilex >= asciiMap.size.width ) continue;
					if( tiley >= asciiMap.size.height ) continue;


					var block = getBlock(asciiMap.map[tiley].charAt(tilex));
					if( tilex == tx && tiley == ty ) block = asciiBlocks.guy;
					if( block == null || h >= block.length ) continue;

					var code = block[h].charCodeAt(0);
					var xx = (x * tw) - offsetx;
					var yy = (y * th) - offsety;

					tileSet.drawTile(context, code, xx + (dx*h),   yy + (dy*h));
				}
			}
		}

		for( var h = 0; h < this.maxLayers; h++ )
		{
			if( h != 0 )
			{
				context.fillStyle = "rgba(0, 0, 0, "+layerAlpha +")";
				context.fillRect( 0, 0, 640, 480 );
			}

			for( var y = 0; y < this.viewSize.height; y++ )
			{
				for( var x = 0; x < this.viewSize.width; x++ )
				{
					var vx = tx - this.viewSize.width/2;
					var vy = ty - this.viewSize.height/2;

					var tilex = x + vx, tiley = y + vy;
					if( tilex < 0 || tiley < 0 ) continue;
					if( tilex >= asciiMap.size.width ) continue;
					if( tiley >= asciiMap.size.height ) continue;

					var c = asciiMap.map2[tiley].charAt(tilex);
					if( c.charAt(0) == ' ' ) continue;
					var block = getBlock(c);
					if( block == null || h >= block.length ) continue;


					var code = block[h].charCodeAt(0);
					var xx = (x * tw) - offsetx;
					var yy = (y * th) - offsety;
					var screenX = xx + (dx*(h+this.maxLayers));
					var screenY = yy + (dy*(h+this.maxLayers));

					if( h == 0 )//&& c.charAt(0) == '.' )
					{
						context.fillStyle = "#000000";
						context.fillRect( screenX, screenY, tileSet.tileSize.width, tileSet.tileSize.height );
					}

					tileSet.drawTile(context, code, screenX, screenY  );
				}
			}
		}
	},
};

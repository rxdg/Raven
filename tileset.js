
var tileSet = {
    image:          null,
    //imageFilename:  "font12x18.png",
    //tileSize:       { width: 12, height: 18 },
    imageFilename:  "font14.png",
    tileSize:       { width: 14, height: 14 },
    tileCount:      128,
    tilesPerRow:    16,
    tileOrigin:     { x: 0, y: 0 },

    drawTile:       function( context, tile, x, y )
                    {
                        if( tile == undefined ) return;
                        if( tile < 0 || tile >= this.tileCount ) return;
                        if( x < 0 || y < 0 ) return;
                        if( x + this.tileSize.width >= context.canvas.width ) return;
                        if( y + this.tileSize.height >= context.canvas.height ) return;

                        var row = Math.floor( tile / this.tilesPerRow );
                        var col = Math.floor( tile % this.tilesPerRow );

                        var dx = this.tileOrigin.x + col * this.tileSize.width;
                        var dy = this.tileOrigin.y + row * this.tileSize.height;

                        context.drawImage( this.image, dx, dy, this.tileSize.width, this.tileSize.height,
                            x, y, this.tileSize.width, this.tileSize.height );
                    },

    drawTile2x:     function( context, tile, x, y )
                    {
                        if( tile == undefined ) return;
                        if( tile < 0 || tile >= this.tileCount ) return;
                        if( x < 0 || y < 0 ) return;
                        if( x + this.tileSize.width >= context.canvas.width ) return;
                        if( y + this.tileSize.height >= context.canvas.height ) return;

                        var row = Math.floor( tile / this.tilesPerRow );
                        var col = Math.floor( tile % this.tilesPerRow );

                        var dx = this.tileOrigin.x + col * this.tileSize.width;
                        var dy = this.tileOrigin.y + row * this.tileSize.height;

                        context.drawImage( this.image, dx, dy, this.tileSize.width, this.tileSize.height,
                            x, y, this.tileSize.width*2, this.tileSize.height*2 );
                    },

    drawTilex:     function( context, tile, x, y, scale )
                    {
                        if( tile == undefined ) return;
                        if( tile < 0 || tile >= this.tileCount ) return;
                        if( x < 0 || y < 0 ) return;
                        if( x + this.tileSize.width >= context.canvas.width ) return;
                        if( y + this.tileSize.height >= context.canvas.height ) return;

                        var row = Math.floor( tile / this.tilesPerRow );
                        var col = Math.floor( tile % this.tilesPerRow );

                        var dx = this.tileOrigin.x + col * this.tileSize.width;
                        var dy = this.tileOrigin.y + row * this.tileSize.height;

                        context.drawImage( this.image, dx, dy, this.tileSize.width, this.tileSize.height,
                            x, y, this.tileSize.width*scale, this.tileSize.height*scale );
                    },
};

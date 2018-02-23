var asciiBlocks = {
	wall: ['#','#','#','#','#','#','#','#','#'],
	wall2: ['8','8','8','8'],
	halfWall: [' ','#'],
	smallStep: ['#'],
	floor: ['.'],
	lava: ['~'],
	lava2: ['^'],
	guy: ['O','O','O','@'],
	tree: ['/','%','/','%'],
	tree2: ['|','%'],
	grass: [':',':'],
	tallGrass: [':',':',':'],
	colon: [':'],
	leftBrack: ['[','[','[','[','[','['],
	rightBrack: [']',']',']',']',']',']'],
	tallLine: ['|','|','|','|'],
	wideLine: ['-','-','-','-'],
	winLine: ['-',' ',' ','-'],
	plus: ['+','+','+','+','+','+','+'],
	pillar1: ['O','O','O','O'],
	door: [' ',' ','+',' '],
};

var lavaVar = 0;

function getBlock( c )
{
	switch( c )
	{
		case '#': return asciiBlocks.wall;
		case 'O': return asciiBlocks.halfWall;
		case 'o': return asciiBlocks.smallStep;
		case '8': return asciiBlocks.wall2;
		case '.': return asciiBlocks.floor;
		case '@': return asciiBlocks.guy;
		case 'T': return asciiBlocks.tree;
		case '(': return asciiBlocks.tree2;
		case 'w': return asciiBlocks.grass;
		case 'W': return asciiBlocks.tallGrass;
		case ':': return asciiBlocks.colon;
		case '[': return asciiBlocks.leftBrack;
		case ']': return asciiBlocks.rightBrack;
		case '|': return asciiBlocks.tallLine;
		case '-': return asciiBlocks.wideLine;
		case '=': return asciiBlocks.winLine;
		case '+': return asciiBlocks.plus;
		case '0': return asciiBlocks.pillar1;
		case '$': return asciiBlocks.door;
		case '~':
			lavaVar++;
			if( lavaVar > 2 ) lavaVar = 0;
			if( lavaVar == 0 ) { return asciiBlocks.lava2; }
			else { return asciiBlocks.lava; }
		default: return [c];
	}
}

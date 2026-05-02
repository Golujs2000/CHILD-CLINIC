import Jimp from "jimp";

async function extractColors() {
    const image = await Jimp.read("public/child-clinic-logo.png");
    const colors = {};
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        const a = this.bitmap.data[idx + 3];
        
        // Ignore fully transparent pixels
        if (a < 50) return;
        
        // Ignore white and very light colors (backgrounds)
        if (r > 240 && g > 240 && b > 240) return;
        
        // Ignore black and very dark colors (text)
        if (r < 20 && g < 20 && b < 20) return;
        
        // Group similar colors (quantize to nearest 16)
        const quant = 16;
        const qR = Math.round(r / quant) * quant;
        const qG = Math.round(g / quant) * quant;
        const qB = Math.round(b / quant) * quant;
        
        const hex = `#${qR.toString(16).padStart(2, '0')}${qG.toString(16).padStart(2, '0')}${qB.toString(16).padStart(2, '0')}`;
        
        colors[hex] = (colors[hex] || 0) + 1;
    });

    const sorted = Object.entries(colors)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);

    console.log("Top colors:", sorted);
}

extractColors().catch(console.error);

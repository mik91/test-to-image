const PNG = require('pngjs').PNG;
const dataUriToBuffer = require('lib/dataUriToBuffer');
// import bufferToDataUrl from 'lib/bufferToDataUrl';

export default function background_png(dataUri: string) {
    const buffer = dataUriToBuffer(dataUri);
    const png = PNG.sync.read(buffer);
    const { width, height } = png;
    const data = png.data;
    const pixels = [];
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i + 0];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        pixels.push([r, g, b, a]);
    }
    return { width, height, pixels };
}


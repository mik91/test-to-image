module.exports = function dataUriToBuffer(dataUri: string) {
    var matches = dataUri.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches === null || matches.length !== 3) {
        throw new Error('Invalid data URI');
    }
    return Buffer.from(matches[2], 'base64');
}
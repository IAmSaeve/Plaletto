function extractHexColors(text: string) {
    return text.match(/#(?:[0-9a-fA-F]{3}){1,2}/g) ?? [];
}

// https://stackoverflow.com/questions/11867545
function getContrastYIQ(hexcolor: String){
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substring(0,2),16);
    var g = parseInt(hexcolor.substring(2,4),16);
    var b = parseInt(hexcolor.substring(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

export { extractHexColors, getContrastYIQ }
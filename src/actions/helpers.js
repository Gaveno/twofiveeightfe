
// Resize data uri from Stack Overflow
// https://stackoverflow.com/questions/20958078/resize-a-base-64-image-in-javascript-without-using-canvas
// Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
export function resizeDataURL(data, wantedWidth, wantedHeight){
    return new Promise(async function(resolve,reject){
        // We create an image to receive the Data URI
        var img = document.createElement('img');
        // When the event "onload" is triggered we can resize the image.
        img.onload = function()
        {
            // We create a canvas and get its context.
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // We set the dimensions at the wanted size.
            canvas.width = wantedWidth;
            canvas.height = wantedHeight;
            // We resize the image with the canvas method drawImage();
            ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);
            var dataURI = canvas.toDataURL('image/jpeg', 1.0);
            // This is the return of the Promise
            resolve(getBase64Encoded(dataURI));
        };
        // We put the Data URI in the image's src attribute
        img.src = data;
    })
}// Use it like : var newDataURI = await resizedataURL('yourDataURIHere', 50, 50);

function getBase64Encoded(dataURI) {
    let encoded = dataURI.replace(/^data:(.*;base64,)?/, '');
    if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
    }
    return encoded;
}
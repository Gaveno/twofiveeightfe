
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
    console.log("Image before encode: ", dataURI);
    let encoded = dataURI.replace(/^data:(.*;base64,)?/, '');
    if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
    }
    return encoded;
}

// From StackOverflow
// https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects
export function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

// From StackOverflow
// https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata/5100158
export function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}
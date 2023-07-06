export default async function verifyImage(url){
    try {
        const response = await fetch(url);

        // Blob (Binary Large Object) is a JavaScript object that represents a chunk of binary data. 
        // Commonly used to handle images, audio, video, or other binary files.
        const blob = await response.blob();

        // if blob object starts with "image", it is a valid image
        return blob.type.startsWith('image/');
    } catch (error) {
        console.error('Error occurred while verifying image:', error);
        return false;
    }
}


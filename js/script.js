window.addEventListener('load', async e => {
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceworker.js');
        } catch (error) {
            console.log('error');
        }
    }
});

window.onload = function(){
    console.log("Hey there developer!")
}

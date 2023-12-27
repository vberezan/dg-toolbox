function replaceImgWithImgByQuery(query, newImgSrc) {
    document.querySelectorAll(query).forEach((img) => {
        img.src = newImgSrc;
    });
}

function replaceImgWithImg(originalImgSrc, newImgSrc) {
    document.querySelectorAll('img[src="' + originalImgSrc + '"').forEach((img) => {
        img.src = newImgSrc;
    });
}

function replaceImgWithFontAwsome(imgSrc, fontAwsomeHTML) {
    document.querySelectorAll('img[src="' + imgSrc + '"').forEach((img) => {
        img.parentElement.innerHTML = fontAwsomeHTML;
    });
}

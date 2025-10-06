const { createCanvas } = require('canvas');


module.exports = {progressBar, pourcentage, strDurationToSeconds,secondsToString} ;

async function progressBar(progress)  {
    // Créez un nouveau canvas
    const canvas = createCanvas(1200, 30);
    const context = canvas.getContext('2d');

    // Paramètres du rectangle arrondi
    const x = 0;
    const y = 0;
    const width = 1200;
    const height = 30;
    const cornerRadius = 20;

    // Dessinez le rectangle arrondi
    context.beginPath();
    context.moveTo(x + cornerRadius, y);
    context.lineTo(x + width - cornerRadius, y);
    context.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius);
    context.lineTo(x + width, y + height - cornerRadius);
    context.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius);
    context.lineTo(x + cornerRadius, y + height);
    context.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
    context.lineTo(x, y + cornerRadius);
    context.arcTo(x, y, x + cornerRadius, y, cornerRadius);
    context.closePath();

    // Remplissage du rectangle
    context.fillStyle = "#313338";
    context.fill();

    //On dessine la barre de progression en fonction de la variable pourcentage
    //On calcule la longueur de la barre de progression
    const progressLength = (progress * width) / 100;

    //On dessine la barre de progression
    context.beginPath();
    context.moveTo(x + cornerRadius, y);
    context.lineTo(x + progressLength - cornerRadius, y);
    context.arcTo(x + progressLength, y, x + progressLength, y + cornerRadius, cornerRadius);
    context.lineTo(x + progressLength, y + height - cornerRadius);
    context.arcTo(x + progressLength, y + height, x + progressLength - cornerRadius, y + height, cornerRadius);
    context.lineTo(x + cornerRadius, y + height);
    context.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius);
    context.lineTo(x, y + cornerRadius);
    context.arcTo(x, y, x + cornerRadius, y, cornerRadius);
    context.closePath();

    // Remplissage de la barre de progression
    context.fillStyle = color;
    context.fill();

    return canvas.toBuffer();
}

function strDurationToSeconds(durationSTR) {
    let seconds = 0;
    for (let i = 0; i < durationSTR.split(':').length; i++) {
        seconds += parseInt(durationSTR.split(':')[i]) * Math.pow(60, durationSTR.split(':').length - 1 - i);
    }
    return seconds;
}

function pourcentage(durationSTR, timestamp){
    if (durationSTR === undefined || timestamp === undefined || durationSTR.split(':').length > 3) {
        return 0;
    }

    let totalDuration = strDurationToSeconds(durationSTR);
    let currentTimestamp = strDurationToSeconds(timestamp);


    //On calcule le pourcentage
    let result = (currentTimestamp * 100) / totalDuration;
    if (result > 100) {
        result = 100;
    }
    if (result < 3) {
        result = 3;
    }

    return result;

}

//HH:MM:SS
function secondsToString(seconds){
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60)
    let sec = seconds - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}:${sec}`;
}



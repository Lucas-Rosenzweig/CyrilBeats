const { createCanvas , loadImage,registerFont, Image } = require('canvas');

registerFont('./assets/fonts/medium.otf', { family: 'medium' })
registerFont('./assets/fonts/light.otf', { family: 'light' })
registerFont('./assets/fonts/bold.otf', { family: 'bold' })

module.exports = { queueAsset };

async function queueAsset(cover,title,pourcent,currentTimestamp,duration,trackArray) {
    let width = 0;
    let height = 0;
    let coverImage =  await loadImage('./assets/placeholder.png');

    if (trackArray.length === 0) {
        width = 588;
        height = 883;
    } else if (trackArray.length >= 1 && trackArray.length <= 4) {
        width = 1134;
        height = 883;

    } else if (trackArray.length >= 5) {
        width = 1682;
        height = 883;
    }

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    // On positionne le fond qui est une couleur
    context.fillStyle = "#121212";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // On rajoute la cover qui est une image de 500x500 avec des bordures arrondies de 20px
    // L'image source devra être recadrée pour être carrée et avoir une taille de 500x500
    try {
        coverImage =  await loadImage(cover);
    } catch (e) {}

    // Dessiner un rectangle arrondi pour servir de masque
    context.save();
    context.beginPath();
    context.moveTo(44 + 20, 42);
    context.lineTo(44 + 500 - 20, 42);
    context.arcTo(44 + 500, 42, 44 + 500, 42 + 20, 20);
    context.lineTo(44 + 500, 42 + 500 - 20);
    context.arcTo(44 + 500, 42 + 500, 44 + 500 - 20, 42 + 500, 20);
    context.lineTo(44 + 20, 42 + 500);
    context.arcTo(44, 42 + 500, 44, 42 + 500 - 20, 20);
    context.lineTo(44, 42 + 20);
    context.arcTo(44, 42, 44 + 20, 42, 20);
    context.closePath();
    context.clip();

    // Dessiner l'image dans le rectangle masqué
    context.drawImage(coverImage, 44, 42, 500, 500);

    context.restore(); // Rétablir le contexte

    // On rajoute le titre de la musique qui seras affiché en blanc et centré sur les coordonnées 296, 628
    context.fillStyle = "#FFFFFF";
    context.font = "72px medium";
    context.textAlign = "center";

    context.fillText(title.substring(0, 12 - 3) + "...", 296, 628);

    // On rajoute la barre de progression qui est un rectangle arrondi de 504px par 19px avec des bordures arrondies de 10px situé en 44, 662
    context.beginPath();
    context.moveTo(44 + 10, 662);
    context.lineTo(44 + 504 - 10, 662);
    context.arcTo(44 + 504, 662, 44 + 504, 662 + 10, 10);
    context.lineTo(44 + 504, 662 + 19 - 10);
    context.arcTo(44 + 504, 662 + 19, 44 + 504 - 10, 662 + 19, 10);
    context.lineTo(44 + 10, 662 + 19);
    context.arcTo(44, 662 + 19, 44, 662 + 19 - 10, 10);
    context.lineTo(44, 662 + 10);
    context.arcTo(44, 662, 44 + 10, 662, 10);
    context.closePath();
    context.fillStyle = "#626262";
    context.fill();

    //On refait la même chose mais avec une couleur différente pour la progression et avec une taille de 504px * pourcent / 100
    context.beginPath();
    context.moveTo(44 + 10, 662);
    context.lineTo(44 + 504 * pourcent / 100 - 10, 662);
    context.arcTo(44 + 504 * pourcent / 100, 662, 44 + 504 * pourcent / 100, 662 + 10, 10);
    context.lineTo(44 + 504 * pourcent / 100, 662 + 19 - 10);
    context.arcTo(44 + 504 * pourcent / 100, 662 + 19, 44 + 504 * pourcent / 100 - 10, 662 + 19, 10);
    context.lineTo(44 + 10, 662 + 19);
    context.arcTo(44, 662 + 19, 44, 662 + 19 - 10, 10);
    context.lineTo(44, 662 + 10);
    context.arcTo(44, 662, 44 + 10, 662, 10);
    context.closePath();
    context.fillStyle = color;
    context.fill();

    //On rajoute l'affichage de la durée qui est un text au format XX:XX/XX:XX centré sur les coordonnées 628, 722
    context.fillStyle = "#b3b3b3";
    context.font = "40px light";
    context.textAlign = "center";
    context.fillText(currentTimestamp + "/" + duration, 296, 722);

    //On rajoute l'affichage du bouton précédent qui est une image de 69x79 situé en 108, 755
    const previousButton = new Image();
    previousButton.src = "./assets/player/previous.png";
    context.drawImage(previousButton, 108, 755, 69, 79);

    //On rajoute l'affichage du bouton play/pause qui est une image de 91x91 situé en 251, 749
    const playButton = new Image();
    playButton.src = "./assets/player/pause.png";
    context.drawImage(playButton, 251, 749, 91, 91);

    //On rajoute l'affichage du bouton suivant qui est une image de 69x79 situé en 416, 755
    const nextButton = new Image();
    nextButton.src = "./assets/player/next.png";
    context.drawImage(nextButton, 416, 755, 69, 79);

    //Si trackArray.length est > 0 on rajoute les 4 prochaines musiques et on rajoute un texte 'File d'attente ...' avec la police bold et une taille de 60px et centré sur les coordonnées 590, 40
    if ( trackArray.length > 0 ){
        context.fillStyle = "#FFFFFF";
        context.font = "60px bold";
        context.textAlign = "center";
        context.fillText("File d'attente ...", 806, 89);

        //On rajoute 4 rectangles arrondi de 502x142 avec des bordures arrondies de 30px le premier est situé en 590 ,149 puis ensuite on rajoute 181px entre chaque rectangle on utiliseras une boucle for avec i < trackArray.length
        for (let i = 0; i < trackArray.length; i++) {
            context.beginPath();
            context.moveTo(590 + 30, 149 + i * 181);
            context.lineTo(590 + 502 - 30, 149 + i * 181);
            context.arcTo(590 + 502, 149 + i * 181, 590 + 502, 149 + i * 181 + 30, 30);
            context.lineTo(590 + 502, 149 + i * 181 + 142 - 30);
            context.arcTo(590 + 502, 149 + i * 181 + 142, 590 + 502 - 30, 149 + i * 181 + 142, 30);
            context.lineTo(590 + 30, 149 + i * 181 + 142);
            context.arcTo(590, 149 + i * 181 + 142, 590, 149 + i * 181 + 142 - 30, 30);
            context.lineTo(590, 149 + i * 181 + 30);
            context.arcTo(590, 149 + i * 181, 590 + 30, 149 + i * 181, 30);
            context.closePath();
            context.fillStyle = "#232323";
            context.fill();

            //On rajoute l'affichage de la cover qui est une image de 100x100 avec des bordures arrondies de 20px situé en 628, 164 + i * 181
            coverImage = await loadImage('./assets/placeholder.png');
            try {
                coverImage =  await loadImage(trackArray[i].thumbnail);
            } catch (e) {}

            context.drawImage(coverImage, 628, 164 + i * 181, 113, 113);

            //On rajoute l'affichage du titre qui est un text au format XX:XX/XX:XX centré sur les coordonnées 881, 197 + i * 181
            context.fillStyle = "#FFFFFF";
            context.font = "30px bold";
            context.textAlign = "center";
            context.fillText(trackArray[i].title.substring(0, 12 - 3) + "...", 881, 200 + i * 181);

            //On rajoute l'affichage de la durée qui est un text au format XX:XX/XX:XX centré sur les coordonnées 821, 248 + i * 181
            context.fillStyle = "#FFFFFF";
            context.font = "20px light";
            context.textAlign = "center";
            context.fillText(trackArray[i].duration, 821, 248 + i * 181);


            if (i === 3) {
                break;
            }

        }

        if (trackArray.length > 4) {
            for (let i = 4; i < trackArray.length; i++) {

                context.beginPath();
                context.moveTo(1134 + 30, 149 + (i - 4) * 181);
                context.lineTo(1134 + 502 - 30, 149 + (i - 4) * 181);
                context.arcTo(1134 + 502, 149 + (i - 4) * 181, 1134 + 502, 149 + (i - 4) * 181 + 30, 30);
                context.lineTo(1134 + 502, 149 + (i - 4) * 181 + 142 - 30);
                context.arcTo(1134 + 502, 149 + (i - 4) * 181 + 142, 1134 + 502 - 30, 149 + (i - 4) * 181 + 142, 30);
                context.lineTo(1134 + 30, 149 + (i - 4) * 181 + 142);
                context.arcTo(1134, 149 + (i - 4) * 181 + 142, 1134, 149 + (i - 4) * 181 + 142 - 30, 30);
                context.lineTo(1134, 149 + (i - 4) * 181 + 30);
                context.arcTo(1134, 149 + (i - 4) * 181, 1134 + 30, 149 + (i - 4) * 181, 30);
                context.closePath();
                context.fillStyle = "#232323";
                context.fill();

                //On rajoute l'affichage de la cover qui est une image de 100x100 avec des bordures arrondies de 20px situé en 1172, 164 + i * 181
                coverImage = await loadImage('./assets/placeholder.png');
                try {
                    coverImage =  await loadImage(trackArray[i].thumbnail);
                } catch (e) {}

                context.drawImage(coverImage, 1172, 164 + (i - 4) * 181, 113, 113);

                //On rajoute l'affichage du titre qui est un text au format XX:XX/XX:XX centré sur les coordonnées 1425, 197 + i * 181
                context.fillStyle = "#FFFFFF";
                context.font = "30px bold";
                context.textAlign = "center";
                context.fillText(trackArray[i].title.substring(0, 12 - 3) + "...", 1425, 200 + (i - 4) * 181);

                //On rajoute l'affichage de la durée qui est un text au format XX:XX/XX:XX centré sur les coordonnées 1365, 248 + i * 181
                context.fillStyle = "#FFFFFF";
                context.font = "20px light";
                context.textAlign = "center";
                context.fillText(trackArray[i].duration, 1365, 248 + (i - 4) * 181);

                if (i === 7) {
                    break;
                }
            }
        }

    }
    return canvas.toBuffer();
}

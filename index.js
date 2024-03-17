import { lerJSON } from "./assets/js/utils.js";
const { musics } = await lerJSON('./assets/json/music.json'); //informações sobre as músicas

let indexMusic = 0;

//music information
const audio = document.querySelector('[data-player="tag-audio"]'); //tag audio
const musicTitle = document.querySelector('[data-player="music-title"]');
const musicAuthor = document.querySelector('[data-player="music-author"]');
const musicImageAlbum = document.querySelector('[data-player="album-image"]');

//controls buttons
const playPauseButton = document.querySelector('[data-player="play-pause"]');
const previousMusicButton = document.querySelector('[data-player="previous-music"]');
const nextMusicButton = document.querySelector('[data-player="next-music"]');

//current time bar
const currentTimeMusic = document.querySelector('[data-player="current-time-music"]');
const durationMusic = document.querySelector('[data-player="duration-music"]');
const progressBar = document.querySelector('[data-player="progress-bar"]');

//comportamentos
window.onload = chargeMusic(indexMusic); //executa ao carregar a página
playPauseButton.onclick = () => playPauseMusic(); //ao clicar no botão play/pause
previousMusicButton.onclick = () => chargePreviousMusic(); //ao clicar no botão voltar
nextMusicButton.onclick = () => chargeNextMusic(); //ao clicar no botão avançar
audio.ontimeupdate = () => updateTime(); //executa o o movimento do play a cada segundo

/**
 * @description caso o valor seja menor que 10, acrescenta um um zero na frente. 
 * @param {number} n 
 * @returns {string}
 * @example 
 * const valor = formartZero(5);
 * console.log(valor);
 * //retorno: 05
 */
function formatZero(n){
    return (n < 10 ? "0" + n : n);
}

/**
 * @description controla os elementos do player quando a música é tocada. 
 * Gerencia a minutagem atual da música, o tempo total dela e a barra de progresso
 */
function updateTime(){
    //tratando minutos passados da música
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeMusic.textContent = `${currentMinutes}:${formatZero(currentSeconds)}`;

    //tratando total de tempo da música
    const durationFormatted = isNaN(audio.duration) ? 0: audio.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    durationMusic.textContent = `${durationMinutes}:${formatZero(durationSeconds)}`;

    //tratando o progresso da barra
    const progressWidth = durationFormatted ? (audio.currentTime / durationFormatted) * 100 : 0;
    progressBar.style.width = progressWidth + "%";

}

/**
 * @description controla o botão play/pause do player
 */
function playPauseMusic(){
    if(audio.paused){
        audio.play();
        playPauseButton.src = './assets/img/pause_fill.svg';
    }else{
        audio.pause();
        playPauseButton.src = './assets/img/Play_fill.svg';
    }
}

/**
 * @description altera a música a ser tocada de acordo com o indice do array de músicas 'musics'
 * @param {number} index 
 */
function chargeMusic(index){
    audio.src = musics[index].music_file;
    musicTitle.textContent = musics[index].title;
    musicAuthor.textContent = musics[index].author;
    musicImageAlbum.src = musics[index].image_file;
}

/**
 * @description controla botão voltar do player
 */
function chargePreviousMusic(){
    if(indexMusic - 1 >= 0){
        indexMusic--;
    }

    chargeMusic(indexMusic);
    audio.play();
}

/**
 * @description controla botão avançar do player
 */
function chargeNextMusic(){
    if(indexMusic + 1 < musics.length){
        indexMusic++;
    }

    chargeMusic(indexMusic);
    audio.play();
}

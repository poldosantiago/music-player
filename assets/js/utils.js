/**
 * @description lê um arquivo JSON por meio de uma URL e retona seu conteúdo
 * @param {String} url caminho URL do arquivo JSON
 * @returns {JSON[]} resultado da leitura do JSON 
 */
async function lerJSON(url){
	const promessa = await fetch(url);
	return await promessa.json();
}

export {
    lerJSON
}
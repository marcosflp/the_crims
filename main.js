// Geral
const obter_estamina = function(){
	return parseFloat($('#user-profile-stamina').text())
}


// Puteiro
const entra_tela_vida_noturna_btn = $('#menu-nightlife');
const entra_puteiro_btn = document.querySelector('#content_middle > div > div:nth-child(3) > div:nth-child(4) > table > tbody > tr > td:nth-child(5) > div > button');
const comer_puta_btn = document.querySelector('#content_middle > div > div:nth-child(3) > table.table.table-condensed.table-top-spacing > tbody > tr > td:nth-child(4) > button'); 


const foder = function() {
	entra_tela_vida_noturna_btn.click();
	setTimeout(function(){
		entra_puteiro_btn.click()
		setTimeout(function(){
			comer_puta_btn.click()
		}, 300)
	}, 300)

	total_estamina = parseFloat(estamina);
	roubar();
}


// Roubar
const entra_tela_roubar_btn = $('#menu-robbery')
const roubar_btn = document.querySelector('#content_middle > div > div:nth-child(3) > div:nth-child(5) > div > table > tr > td:nth-child(1) > button');

const roubar = function() {
	$('#content_middle > div > div:nth-child(3) > div:nth-child(5) > div > table > tr > td:nth-child(1) > select option').attr('selected', false);
	$('#content_middle > div > div:nth-child(3) > div:nth-child(5) > div > table > tr > td:nth-child(1) > select > option:nth-child(2)').attr('selected', true)

	total_estamina = obter_estamina()
	if (total_estamina < 5){
		foder();
	} else if (total_estamina < 20) {
		$('#content_middle > div > div:nth-child(3) > div:nth-child(5) > div > table > tr > td:nth-child(1) > select option').attr('selected', false);
		$('#content_middle > div > div:nth-child(3) > div:nth-child(5) > div > table > tr > td:nth-child(1) > select > option:nth-child(2)').attr('selected', true)
	}

	entra_tela_roubar_btn.click()
	
	setTimeout(function(){
		roubar_btn.click();
		roubar();
	})
}

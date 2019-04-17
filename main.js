TIMEOUT = 1000  // ms
PROBABILIDADE_SUCESSO = 100  // %
ROUBAR_EM_GRUPO = false


const wait = function(ms){
  return new Promise(function(resolve, reject){
    setTimeout(resolve, ms)
  });
};


let get_perfil = function() {
  class Perfil {
    estamina = null;
    respeito = null;
    vicio = null;
    tickets = null;

    constructor() {
      this.get_estamina();
      this.get_respeito();
      this.get_vicio();
      this.get_tickets();
    }

    get_estamina(){
      this.estamina = parseFloat($('#user-profile-stamina').text().match(/\d+/));
    }

    get_respeito(){
      self.respeito = parseInt($('#user-profile-info > div:nth-child(4) > span').text());
    }

    get_vicio(){
      this.vicio = parseInt($('#user-profile-addiction').text().match(/\d+/)[0]);
    }

    get_tickets(){
      this.tickets = parseInt($('#user-profile-info > div:nth-child(5) > span').text());
    }
  };

  return new Perfil();
}


// Hospital

const curar_vicio = async function(){
  await wait(TIMEOUT/200);
  window.location = 'https://www.thecrims.com/newspaper#/hospital';
  await wait(TIMEOUT);

  const desintoxicar_btn = $('#content_middle > div > div:nth-child(3) > table:nth-child(5) > tr > td:nth-child(2) > button.btn.btn-small.btn-inverse.pull-left');
  desintoxicar_btn.click();

  return true;
}


// Puteiro

const pegar_uma_puta = async function(){

  await wait(TIMEOUT*1.5);

  let perfil = get_perfil();

  if (perfil.tickets === 0) {
    console.log('Acabou Tickets');
    return null;
  }

  if (perfil.estamina < 10 && verifica_estamina() < 10) {
    let entra_puteiro_btn = $('#content_middle > div > div:nth-child(3) > div:nth-child(4) > table > tbody > tr:nth-child(1) > td:nth-child(5) > div > button');
    if (!entra_puteiro_btn.length) {
      entra_puteiro_btn = $('#content_middle > div > div:nth-child(3) > div:nth-child(5) > ul > li:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2) > div > button');
    }
    if (!entra_puteiro_btn.length) {
      throw 'Bot: Porra, não consegui achar o botão para entra no puteiro.';
    }
    entra_puteiro_btn[0].click();
    await wait(TIMEOUT);

    const pegar_puta_btn = $('#content_middle > div > div:nth-child(3) > table.table.table-condensed.table-top-spacing > tbody > tr > td:nth-child(4) > button');
    if (!pegar_puta_btn.length) {
      throw 'Bot: Porra, não consegui achar o botão para darumazinha.';
      window.location = 'https://www.thecrims.com/newspaper#/nightlife';
      await pegar_uma_puta();
    }
    pegar_puta_btn[0].click();
    await wait(TIMEOUT);

    return true;
  };
}

// Roubar

const roubar = async function() {
  // Entra página Roubar
  const entra_tela_roubar_btn = $('#menu-robbery');
  entra_tela_roubar_btn.click();
  await wait(TIMEOUT);

  // Seleciona o que roubar e rouba

  let perfil = get_perfil();
  const roubar_btn = $('#content_middle > div > div:nth-child(3) > div:nth-child(5) > div > table > tr > td:nth-child(1) > button');
  const roubo_opcoes = $('#content_middle > div > div:nth-child(3) > div:nth-child(5) > div > table > tr > td:nth-child(1) > select option');
  const roubo_opcoes_reversed = $('#content_middle > div > div:nth-child(3) > div:nth-child(5) > div > table > tr > td:nth-child(1) > select option').toArray().reverse();
  const select = $('#content_middle > div > div:nth-child(3) > div:nth-child(5) > div > table > tr > td:nth-child(1) > select');

  if (ROUBAR_EM_GRUPO && perfil.estamina >= 50) {
    const aceitar_convite_grupo_btn = $('#content_middle > div > div:nth-child(3) > div:nth-child(7) > div > div.text-center > button.btn.btn-success.btn-small');
    if (aceitar_convite_grupo_btn.css('display') != 'none') {
      aceitar_convite_grupo_btn.click();
    }

    const efetuar_roubro_grupo_btn = $('#content_middle > div > div:nth-child(3) > div:nth-child(7) > div > div.text-center > button.btn.btn-inverse.btn-small');
    const efetuar_roubo_solo_btn= $('#content_middle > div > div:nth-child(3) > div:nth-child(4) > div > table > tr > td:nth-child(1) > button');
    if (ROUBAR_EM_GRUPO && efetuar_roubro_grupo_btn.css('display') != 'none') {
      efetuar_roubro_grupo_btn.click();
    } else {
        efetuar_roubo_solo_btn.click();
    }
    await wait(TIMEOUT/2);
  }

  for (let i=0; i < roubo_opcoes_reversed.length; i++){
    const custo_estamina_regex = roubo_opcoes_reversed[i].innerText.match(/\d+%/g);
    let custo_estamina;
    if (custo_estamina_regex) {
      custo_estamina = parseInt(custo_estamina_regex[0].replace('%', ''))
    }

    const probabilidade_sucesso_regex = roubo_opcoes_reversed[i].innerText.match(/\d+%/g);
    let probabilidade_sucesso;
    if (probabilidade_sucesso_regex) {
      probabilidade_sucesso = parseInt(probabilidade_sucesso_regex[1].replace('%', ''));
    }

    if (custo_estamina && perfil.estamina >= custo_estamina && probabilidade_sucesso >= PROBABILIDADE_SUCESSO) {
      select.val($(roubo_opcoes_reversed[i]).val())
      select[0].dispatchEvent(new Event("change"));

      await wait(TIMEOUT);
      roubar_btn.click();
      return true;
    }
  }

  // sem estamina
  return false;
}


const roubar_e_pegar_putas_loop = async function() {
  const perfil = get_perfil();

  if (perfil.vicio >= 5){
    await curar_vicio();
  }

  roubo = await roubar();
  if (roubo) {
    return roubar_e_pegar_putas_loop();
  } else {
    window.location = 'https://www.thecrims.com/newspaper#/nightlife/whorehouses';
    await pegar_uma_puta();
    return roubar_e_pegar_putas_loop();
  }
}
roubar_e_pegar_putas_loop()

function verifica_estamina() {
    return parseFloat(document.querySelector('#stamina-progressbar').style.width)
}

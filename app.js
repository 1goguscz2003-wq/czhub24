(()=>{'use strict';
const CFG={
  analyticsEndpoint:'https://cishmtektnuvjxyuetvm.supabase.co/rest/v1/analytics_events',
  supabaseKey:'sb_publishable_F9lya4xhIKkXcpjhWXvaNg_l-nBZT8g',
  contestUrl:'https://t.me/czhub24',
  platforms:{telegram:'https://t.me/czhub24',whatsapp:'https://chat.whatsapp.com/G0YbngLJZs62JZ8QLef0mj',viber:'https://invite.viber.com/?g2=AQBEyu%2BkYLoW5lbe0flu%2BPnAUDrUZUpv64chJAs9SWpAFdDAF2TzTHJG0yqUd2xn'},
  routes:{},
  cities:[
    ['karlovy-vary',12.19,39.70],['usti-nad-labem',22.74,25.42],['plzen',21.31,60.85],['liberec',36.95,14.10],['praha',38.58,38.78],['ceske-budejovice',32.25,83.67],['jihlava',47.79,65.86],['pardubice',55.47,39.15],['hradec-kralove',61.42,27.09],['brno',64.88,66.98],['olomouc',74.86,52.32],['zlin',78.41,72.36],['ostrava',89.35,49.72]
  ],
  categories:[['work','▣','work'],['gigs','⚒','gigs'],['rent','⌂','rent'],['market','🛒','market'],['auto','▱','auto'],['services','⌕','services'],['more','▦','more']],
  extra:['documents','community','roommates','moving','repairs','beauty','education','legal','health','food','events','sport','lost-found','other']
};

const I18N={
ru:{
  tagline:'ВСЯ ЧЕХИЯ. ОДНА СЕТЬ.',navHome:'ГЛАВНАЯ',navHomeSub:'Добро пожаловать',navFind:'НАЙТИ НУЖНОЕ',navFindSub:'Город и категория',navCommunities:'СООБЩЕСТВА',navCommunitiesSub:'Все наши группы',navContest:'КОНКУРС',navContestSub:'Розыгрыш ноутбука',navAbout:'О ПРОЕКТЕ',navAboutSub:'О CZHUB24',giveTitle:'★ РОЗЫГРЫШ НОУТБУКА ★',giveSub:'ВСТУПАЙ В TELEGRAM!',participate:'УЧАСТВОВАТЬ',inviteFriends:'ПРИГЛАСИ 3–5 ДРУЗЕЙ',networkStatus:'СТАТУС СЕТИ',launch:'ЗАПУСК',chooseCity:'ВЫБЕРИ ГОРОД',findWhat:'и найди то, что нужно',allCzechia:'ВСЯ ЧЕХИЯ',oneNetworkAds:'Единая сеть объявлений',chooseCategory:'ВЫБЕРИ КАТЕГОРИЮ',whereOpen:'ГДЕ УДОБНЕЕ ОТКРЫТЬ?',recommendedContest:'РЕКОМЕНДУЕМ · КОНКУРС',inNumbers:'В ЦИФРАХ',cities:'ГОРОДОВ',categories:'КАТЕГОРИЙ',messengers:'МЕССЕНДЖЕРОВ',status:'СТАТУС',scanQr:'СКАНИРУЙ QR',shareFriends:'и делись с друзьями',footerText:'ВСЯ ЧЕХИЯ • ОДНА СЕТЬ • ЛЮДИ • ВОЗМОЖНОСТИ • БУДУЩЕЕ',mFind:'НАЙТИ',mGroups:'ГРУППЫ',mContest:'КОНКУРС',mAbout:'О НАС',
  citySelected:'{city} · теперь выбери категорию',chooseCityToast:'Сначала выбери город',chooseCategoryToast:'Выбери категорию',categorySelected:'{city} · {category} · выбери мессенджер',homeToast:'CZHUB24 Network · выбери город',findToast:'Нажми нужный город прямо на карте',allCzechiaName:'Вся Чехия',allCategories:'Все категории',contestTitle:'Розыгрыш ноутбука',contestLead:'Конкурс проходит в Telegram.',contest1:'Вступи в основную группу CZHUB24.',contest2:'Поставь реакцию под конкурсным постом.',contest3:'Получи индивидуальную реферальную ссылку.',contest4:'Пригласи 3–5 друзей.',contestCta:'УЧАСТВОВАТЬ В TELEGRAM →',aboutTitle:'О проекте CZHUB24',about1:'CZHUB24 — единая сеть русско- и украиноязычных сообществ по Чехии.',about2:'Выбери город, затем нужную категорию и удобный мессенджер. Сейчас все направления ведут в основные сообщества. По реальной статистике спроса мы будем создавать отдельные группы для самых востребованных сочетаний город + тема.',communitiesTitle:'Сообщества CZHUB24',tgDesc:'Telegram — основная группа + конкурс',waDesc:'WhatsApp — общий чат',vbDesc:'Viber — сообщество',qrTitle:'QR CZHUB24',qrText:'QR ведёт на сайт CZHUB24. Параметр ?src=... позволяет различать листовки и другие источники в аналитике.',menuTitle:'Навигация',menuHome:'Главная',menuFind:'Найти нужное',menuGroups:'Сообщества',menuContest:'Конкурс',menuAbout:'О проекте',
  cityNames:{'karlovy-vary':'Карловы Вары','usti-nad-labem':'Усти-над-Лабем','plzen':'Пльзень','liberec':'Либерец','praha':'Прага','ceske-budejovice':'Ческе-Будеёвице','jihlava':'Йиглава','pardubice':'Пардубице','hradec-kralove':'Градец-Кралове','brno':'Брно','olomouc':'Оломоуц','zlin':'Злин','ostrava':'Острава','czechia':'Вся Чехия'},
  catNames:{work:'Работа',gigs:'Фушки',rent:'Аренда',market:'Маркет',auto:'Авто',services:'Услуги',more:'Ещё категории',documents:'Документы',community:'Общение',roommates:'Подселение / сосед',moving:'Переезды / перевозки',repairs:'Ремонт / стройка',beauty:'Красота / барберы',education:'Обучение / языки',legal:'Юристы / бухгалтерия',health:'Здоровье / врачи',food:'Еда / заведения',events:'События / тусовки',sport:'Спорт / хобби','lost-found':'Потеряно / найдено',other:'Другое'}
},
cz:{
  tagline:'CELÉ ČESKO. JEDNA SÍŤ.',navHome:'DOMŮ',navHomeSub:'Vítejte',navFind:'NAJÍT',navFindSub:'Město a kategorie',navCommunities:'KOMUNITY',navCommunitiesSub:'Všechny naše skupiny',navContest:'SOUTĚŽ',navContestSub:'Soutěž o notebook',navAbout:'O PROJEKTU',navAboutSub:'O CZHUB24',giveTitle:'★ SOUTĚŽ O NOTEBOOK ★',giveSub:'PŘIDEJ SE NA TELEGRAM!',participate:'ZÚČASTNIT SE',inviteFriends:'POZVI 3–5 PŘÁTEL',networkStatus:'STAV SÍTĚ',launch:'SPUŠTĚNÍ',chooseCity:'VYBER MĚSTO',findWhat:'a najdi, co potřebuješ',allCzechia:'CELÉ ČESKO',oneNetworkAds:'Jedna síť inzerátů',chooseCategory:'VYBER KATEGORII',whereOpen:'KDE TO CHCEŠ OTEVŘÍT?',recommendedContest:'DOPORUČUJEME · SOUTĚŽ',inNumbers:'V ČÍSLECH',cities:'MĚST',categories:'KATEGORIÍ',messengers:'MESSENGERŮ',status:'STAV',scanQr:'NASKENUJ QR',shareFriends:'a sdílej s přáteli',footerText:'CELÉ ČESKO • JEDNA SÍŤ • LIDÉ • MOŽNOSTI • BUDOUCNOST',mFind:'NAJÍT',mGroups:'SKUPINY',mContest:'SOUTĚŽ',mAbout:'O NÁS',
  citySelected:'{city} · teď vyber kategorii',chooseCityToast:'Nejdřív vyber město',chooseCategoryToast:'Vyber kategorii',categorySelected:'{city} · {category} · vyber messenger',homeToast:'CZHUB24 Network · vyber město',findToast:'Klikni na město přímo na mapě',allCzechiaName:'Celé Česko',allCategories:'Všechny kategorie',contestTitle:'Soutěž o notebook',contestLead:'Soutěž probíhá na Telegramu.',contest1:'Přidej se do hlavní skupiny CZHUB24.',contest2:'Přidej reakci pod soutěžní příspěvek.',contest3:'Získej svůj individuální referral odkaz.',contest4:'Pozvi 3–5 přátel.',contestCta:'ZÚČASTNIT SE NA TELEGRAMU →',aboutTitle:'O projektu CZHUB24',about1:'CZHUB24 je jednotná síť komunit v Česku pro rusky a ukrajinsky mluvící lidi.',about2:'Vyber město, kategorii a messenger. Zatím všechny směry vedou do hlavních komunit. Podle skutečné poptávky a analytiky budeme vytvářet samostatné skupiny pro nejžádanější kombinace město + téma.',communitiesTitle:'Komunity CZHUB24',tgDesc:'Telegram — hlavní skupina + soutěž',waDesc:'WhatsApp — společný chat',vbDesc:'Viber — komunita',qrTitle:'QR CZHUB24',qrText:'QR vede na web CZHUB24. Parametr ?src=... umožní v analytice rozlišit letáky a další zdroje.',menuTitle:'Navigace',menuHome:'Domů',menuFind:'Najít',menuGroups:'Komunity',menuContest:'Soutěž',menuAbout:'O projektu',
  cityNames:{'karlovy-vary':'Karlovy Vary','usti-nad-labem':'Ústí nad Labem','plzen':'Plzeň','liberec':'Liberec','praha':'Praha','ceske-budejovice':'České Budějovice','jihlava':'Jihlava','pardubice':'Pardubice','hradec-kralove':'Hradec Králové','brno':'Brno','olomouc':'Olomouc','zlin':'Zlín','ostrava':'Ostrava','czechia':'Celé Česko'},
  catNames:{work:'Práce',gigs:'Brigády',rent:'Pronájem',market:'Marketplace',auto:'Auto',services:'Služby',more:'Další kategorie',documents:'Dokumenty',community:'Komunita',roommates:'Spolubydlení',moving:'Stěhování / doprava',repairs:'Opravy / stavba',beauty:'Krása / barber',education:'Vzdělávání / jazyky',legal:'Právo / účetnictví',health:'Zdraví / lékaři',food:'Jídlo / podniky',events:'Akce / zábava',sport:'Sport / hobby','lost-found':'Ztráty a nálezy',other:'Ostatní'}
},
ua:{
  tagline:'ВСЯ ЧЕХІЯ. ОДНА МЕРЕЖА.',navHome:'ГОЛОВНА',navHomeSub:'Ласкаво просимо',navFind:'ЗНАЙТИ ПОТРІБНЕ',navFindSub:'Місто і категорія',navCommunities:'СПІЛЬНОТИ',navCommunitiesSub:'Усі наші групи',navContest:'КОНКУРС',navContestSub:'Розіграш ноутбука',navAbout:'ПРО ПРОЄКТ',navAboutSub:'Про CZHUB24',giveTitle:'★ РОЗІГРАШ НОУТБУКА ★',giveSub:'ПРИЄДНУЙСЯ В TELEGRAM!',participate:'ВЗЯТИ УЧАСТЬ',inviteFriends:'ЗАПРОСИ 3–5 ДРУЗІВ',networkStatus:'СТАН МЕРЕЖІ',launch:'ЗАПУСК',chooseCity:'ОБЕРИ МІСТО',findWhat:'і знайди те, що потрібно',allCzechia:'ВСЯ ЧЕХІЯ',oneNetworkAds:'Єдина мережа оголошень',chooseCategory:'ОБЕРИ КАТЕГОРІЮ',whereOpen:'ДЕ ЗРУЧНІШЕ ВІДКРИТИ?',recommendedContest:'РЕКОМЕНДУЄМО · КОНКУРС',inNumbers:'У ЦИФРАХ',cities:'МІСТ',categories:'КАТЕГОРІЙ',messengers:'МЕСЕНДЖЕРІВ',status:'СТАН',scanQr:'СКАНУЙ QR',shareFriends:'і ділися з друзями',footerText:'ВСЯ ЧЕХІЯ • ОДНА МЕРЕЖА • ЛЮДИ • МОЖЛИВОСТІ • МАЙБУТНЄ',mFind:'ЗНАЙТИ',mGroups:'ГРУПИ',mContest:'КОНКУРС',mAbout:'ПРО НАС',
  citySelected:'{city} · тепер обери категорію',chooseCityToast:'Спочатку обери місто',chooseCategoryToast:'Обери категорію',categorySelected:'{city} · {category} · обери месенджер',homeToast:'CZHUB24 Network · обери місто',findToast:'Натисни потрібне місто прямо на мапі',allCzechiaName:'Вся Чехія',allCategories:'Усі категорії',contestTitle:'Розіграш ноутбука',contestLead:'Конкурс проходить у Telegram.',contest1:'Приєднайся до основної групи CZHUB24.',contest2:'Постав реакцію під конкурсним дописом.',contest3:'Отримай індивідуальне реферальне посилання.',contest4:'Запроси 3–5 друзів.',contestCta:'ВЗЯТИ УЧАСТЬ У TELEGRAM →',aboutTitle:'Про проєкт CZHUB24',about1:'CZHUB24 — єдина мережа російсько- та україномовних спільнот у Чехії.',about2:'Обери місто, потрібну категорію та зручний месенджер. Поки всі напрямки ведуть в основні спільноти. За реальною статистикою попиту ми створюватимемо окремі групи для найпопулярніших поєднань місто + тема.',communitiesTitle:'Спільноти CZHUB24',tgDesc:'Telegram — основна група + конкурс',waDesc:'WhatsApp — загальний чат',vbDesc:'Viber — спільнота',qrTitle:'QR CZHUB24',qrText:'QR веде на сайт CZHUB24. Параметр ?src=... дозволяє розрізняти листівки та інші джерела в аналітиці.',menuTitle:'Навігація',menuHome:'Головна',menuFind:'Знайти потрібне',menuGroups:'Спільноти',menuContest:'Конкурс',menuAbout:'Про проєкт',
  cityNames:{'karlovy-vary':'Карлові Вари','usti-nad-labem':'Усті-над-Лабем','plzen':'Пльзень','liberec':'Ліберець','praha':'Прага','ceske-budejovice':'Чеське-Будейовіце','jihlava':'Їглава','pardubice':'Пардубіце','hradec-kralove':'Градець-Кралове','brno':'Брно','olomouc':'Оломоуць','zlin':'Злін','ostrava':'Острава','czechia':'Вся Чехія'},
  catNames:{work:'Робота',gigs:'Підробітки',rent:'Оренда',market:'Маркет',auto:'Авто',services:'Послуги',more:'Ще категорії',documents:'Документи',community:'Спілкування',roommates:'Підселення / сусід',moving:'Переїзди / перевезення',repairs:'Ремонт / будівництво',beauty:'Краса / барбери',education:'Навчання / мови',legal:'Юристи / бухгалтерія',health:'Здоров’я / лікарі',food:'Їжа / заклади',events:'Події / тусовки',sport:'Спорт / хобі','lost-found':'Загублено / знайдено',other:'Інше'}
}};

const storageGet=(kind,key)=>{try{return window[kind].getItem(key)}catch{return null}},storageSet=(kind,key,val)=>{try{window[kind].setItem(key,val)}catch{}};
const state={city:null,category:null,lang:storageGet('localStorage','czh_lang')||'ru'};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const params=new URLSearchParams(location.search);
const source=params.get('src')||params.get('utm_source')||'direct';
const campaign=params.get('utm_campaign')||null;
const sid=storageGet('sessionStorage','czh_sid')||(crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random()); storageSet('sessionStorage','czh_sid',sid);
const t=(k)=>I18N[state.lang]?.[k]??I18N.ru[k]??k;
const fmt=(s,obj)=>Object.entries(obj).reduce((a,[k,v])=>a.replaceAll(`{${k}}`,v),s);
const cityName=(id)=>I18N[state.lang].cityNames[id]||id;
const catName=(id)=>I18N[state.lang].catNames[id]||id;

function track(type,data={}){
  const evt={version:'v10-supabase',type,ts:new Date().toISOString(),source,campaign,sessionId:sid,city:state.city?.id||null,category:state.category?.id||null,lang:state.lang,device:innerWidth<=600?'phone':innerWidth<=1024?'tablet':'desktop',viewport:`${innerWidth}x${innerHeight}`,...data};
  try{const k='czhub24_analytics',a=JSON.parse(localStorage.getItem(k)||'[]');a.push(evt);localStorage.setItem(k,JSON.stringify(a.slice(-3000)));renderDebug()}catch{}
  if(CFG.analyticsEndpoint&&CFG.supabaseKey){
    fetch(CFG.analyticsEndpoint,{method:'POST',headers:{'apikey':CFG.supabaseKey,'Authorization':`Bearer ${CFG.supabaseKey}`,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify({data:evt}),keepalive:true}).catch(()=>{});
  }
}
function toast(text){const e=$('#toast');e.textContent=text;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),1500)}
function modal(title,html){$('#modalTitle').textContent=title;$('#modalBody').innerHTML=html;$('#modal').hidden=false;track('panel_open',{panel:title})}
function close(){ $('#modal').hidden=true }
$('#closeModal').onclick=close; $('#modal').addEventListener('click',e=>{if(e.target.id==='modal')close()}); addEventListener('keydown',e=>{if(e.key==='Escape')close()});


function setStep(step){
  const app=$('#app');
  app.classList.remove('step-city','step-category','step-platform');
  app.classList.add(`step-${step}`);
  const cityBack=$('[data-flow-back="city"]'), catBack=$('[data-flow-back="category"]');
  if(cityBack) cityBack.disabled=step==='city';
  if(catBack) catBack.disabled=step!=='platform';
}
function focusMap(cityId){
  const panel=$('#mapPanel');
  if(!panel)return;
  if(cityId==='czechia'||!cityId){panel.style.setProperty('--pan-x','0px');panel.style.setProperty('--pan-y','0px');panel.style.setProperty('--map-scale','1');return}
  const c=CFG.cities.find(x=>x[0]===cityId); if(!c)return;
  const r=panel.getBoundingClientRect();
  const scale=innerWidth<=700?1.28:1.46;
  const dx=(50-c[1])/100*r.width*scale;
  const dy=(50-c[2])/100*r.height*scale;
  panel.style.setProperty('--pan-x',`${dx}px`);
  panel.style.setProperty('--pan-y',`${dy}px`);
  panel.style.setProperty('--map-scale',scale);
}
function resetFlow(){
  $('#mapPanel')?.style.setProperty('--pan-x','0px');$('#mapPanel')?.style.setProperty('--pan-y','0px');$('#mapPanel')?.style.setProperty('--map-scale','1');
  $('#categoryRow')?.removeAttribute('data-selected-label');
  setStep('city');
}
function buildCities(){
  const layer=$('#cityLayer'); layer.innerHTML='';
  CFG.cities.forEach(([id,x,y])=>{const b=document.createElement('button'); b.className='cityNode'+((id==='ostrava'||id==='zlin')?' labelLeft':''); b.style.setProperty('--x',x+'%'); b.style.setProperty('--y',y+'%'); b.dataset.city=id; b.innerHTML=`<span class="label">${cityName(id).toUpperCase()}</span>`; b.setAttribute('aria-label',cityName(id)); if(state.city?.id===id)b.classList.add('active'); b.onclick=()=>selectCity({id},b); layer.append(b)});
}
function buildCategories(){
  const row=$('#categoryRow'); row.innerHTML='';
  CFG.categories.forEach(([id,ico,cl])=>{const b=document.createElement('button'); b.className=`catBtn ${cl}`; b.dataset.category=id; b.innerHTML=`<span class="ico">${ico}</span><b>${catName(id).toUpperCase()}</b>`; if(state.category?.id===id)b.classList.add('active'); b.onclick=()=>id==='more'?showMore():selectCategory({id},b); row.append(b)});
}
function applyLanguage(lang,trackIt=true){
  if(!I18N[lang])return; state.lang=lang; storageSet('localStorage','czh_lang',lang); document.documentElement.lang=lang==='cz'?'cs':lang==='ua'?'uk':'ru';
  $$('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(t(key)!=null)el.textContent=t(key)}); $$('[data-lang]').forEach(x=>x.classList.toggle('active',x.dataset.lang===lang));
  buildCities(); buildCategories(); updateSelectionLabels(); tick(); if(trackIt)track('language_select',{language:lang});
}
function updateSelectionLabels(){
  if(state.city)state.city.name=cityName(state.city.id); if(state.category)state.category.name=catName(state.category.id);
}
function selectCity(c,el){
  state.city={id:c.id,name:cityName(c.id)}; state.category=null;
  $$('.cityNode').forEach(x=>x.classList.toggle('active',x===el)); $$('.catBtn').forEach(x=>x.classList.remove('active')); $$('.platform').forEach(x=>x.classList.remove('ready'));
  $('#categoryRow').removeAttribute('data-selected-label'); focusMap(c.id); setStep('category'); track('city_select',{city:c.id});
}
function selectAllCzechia(){
  state.city={id:'czechia',name:t('allCzechiaName')}; state.category=null; $$('.cityNode').forEach(x=>x.classList.remove('active')); $$('.catBtn').forEach(x=>x.classList.remove('active')); $$('.platform').forEach(x=>x.classList.remove('ready'));
  $('#categoryRow').removeAttribute('data-selected-label'); focusMap('czechia'); setStep('category'); track('city_select',{city:'czechia'});
}
function selectCategory(c,el){
  if(!state.city){toast(t('chooseCityToast'));setStep('city');return}
  state.category={id:c.id,name:catName(c.id)}; $$('.catBtn').forEach(x=>x.classList.toggle('active',x===el)); $$('.platform').forEach(x=>x.classList.add('ready'));
  $('#categoryRow').dataset.selectedLabel=state.category.name.toUpperCase(); setStep('platform'); track('category_select',{category:c.id});
}
function showMore(){if(!state.city){toast(t('chooseCityToast'));return}modal(t('allCategories'),`<div class="modalGrid">${CFG.extra.map(id=>`<button class="modalBtn" data-extra="${id}">${catName(id)}</button>`).join('')}</div>`); $$('[data-extra]',$('#modalBody')).forEach(b=>b.onclick=()=>{selectCategory({id:b.dataset.extra},null);close()})}
function route(p){const key=`${state.city?.id||'czechia'}.${state.category?.id||'all'}.${p}`;return CFG.routes[key]||CFG.platforms[p]}
function openPlatform(p){if(!state.city){toast(t('chooseCityToast'));return}if(!state.category){toast(t('chooseCategoryToast'));return}const url=route(p);track('platform_click',{platform:p,url});window.open(url,'_blank','noopener,noreferrer')}
$$('[data-platform]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();openPlatform(b.dataset.platform)}));

function contest(){modal(t('contestTitle'),`<div class="contestBox"><img src="./assets/logo.png" alt="CZHUB24"><div><p><b>${t('contestLead')}</b></p><ol><li>${t('contest1')}</li><li>${t('contest2')}</li><li>${t('contest3')}</li><li>${t('contest4')}</li></ol><a class="cta" href="${CFG.contestUrl}" target="_blank" rel="noopener">${t('contestCta')}</a></div></div>`)}
function about(){modal(t('aboutTitle'),`<p><b>${t('about1')}</b></p><p>${t('about2')}</p>`)}
function communities(){modal(t('communitiesTitle'),`<div class="modalGrid"><a class="modalLink" href="${CFG.platforms.telegram}" target="_blank">${t('tgDesc')}</a><a class="modalLink" href="${CFG.platforms.whatsapp}" target="_blank">${t('waDesc')}</a><a class="modalLink" href="${CFG.platforms.viber}" target="_blank">${t('vbDesc')}</a></div>`)}
function share(){modal(t('qrTitle'),`<p style="text-align:center"><img src="./assets/qr.png" style="width:220px;max-width:70%;background:white;padding:8px" alt="QR"></p><p style="text-align:center">${t('qrText')}</p>`)}
function home(){state.city=null;state.category=null;$$('.cityNode,.catBtn').forEach(x=>x.classList.remove('active'));$$('.platform').forEach(x=>x.classList.remove('ready'));resetFlow();track('flow_reset')}
function menu(){modal(t('menuTitle'),`<div class="modalGrid menuGrid"><button class="modalBtn" data-menu-action="home">⌂ ${t('menuHome')}</button><button class="modalBtn" data-menu-action="find">⌖ ${t('menuFind')}</button><button class="modalBtn" data-menu-action="communities">♙ ${t('menuGroups')}</button><button class="modalBtn" data-menu-action="contest">★ ${t('menuContest')}</button><button class="modalBtn" data-menu-action="about">ⓘ ${t('menuAbout')}</button></div>`); $$('[data-menu-action]',$('#modalBody')).forEach(b=>b.onclick=()=>{close();actions[b.dataset.menuAction]?.()})}
const actions={home,find:()=>{state.city=null;state.category=null;$$('.cityNode,.catBtn').forEach(x=>x.classList.remove('active'));resetFlow();track('find_open')},communities,contest,about,share,menu,allCzechia:selectAllCzechia};
$$('[data-action]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();actions[b.dataset.action]?.()}));
$$('[data-lang]').forEach(b=>b.addEventListener('click',()=>applyLanguage(b.dataset.lang)));


$$('[data-flow-back]').forEach(b=>b.addEventListener('click',()=>{
  const target=b.dataset.flowBack;
  if(target==='city'){state.city=null;state.category=null;$$('.cityNode,.catBtn').forEach(x=>x.classList.remove('active'));$$('.platform').forEach(x=>x.classList.remove('ready'));resetFlow();track('flow_back',{to:'city'})}
  if(target==='category'&&state.city){state.category=null;$$('.catBtn').forEach(x=>x.classList.remove('active'));$$('.platform').forEach(x=>x.classList.remove('ready'));$('#categoryRow').removeAttribute('data-selected-label');setStep('category');track('flow_back',{to:'category'})}
}));

function tick(){const d=new Date();const locale=state.lang==='cz'?'cs-CZ':state.lang==='ua'?'uk-UA':'ru-RU';$('#clock').textContent=d.toLocaleTimeString(locale,{hour12:false})+'   '+d.toLocaleDateString(locale)}
function renderDebug(){if(!params.has('debug'))return;const p=$('#debugPanel');p.hidden=false;let a=[];try{a=JSON.parse(localStorage.getItem('czhub24_analytics')||'[]').slice(-8).reverse()}catch{}p.innerHTML=`<b>ANALYTICS DEBUG</b><small>src=${source} · ${innerWidth}×${innerHeight}</small>${a.map(e=>`<div>${e.type} · ${e.city||'—'} · ${e.category||'—'} · ${e.lang}</div>`).join('')}`}

applyLanguage(state.lang,false); resetFlow(); tick(); setInterval(tick,1000); track('page_view',{referrer:document.referrer||null,utm_medium:params.get('utm_medium'),utm_content:params.get('utm_content')}); addEventListener('resize',()=>renderDebug(),{passive:true});
})();

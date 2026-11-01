'use strict';
// EDIT HERE: All personal content lives in this configuration.
// Empty optional values are hidden. Dates must use YYYY-MM-DD.
const FAMILY_CONFIG = {
  privacy: {
    showBirthDates: true, showAge: true, showBirthTimes: true,
    showBirthPlaces: true, showHospitals: false, showMeasurements: false
    // Display preferences only: values in this public file remain readable.
    // Remove sensitive values from the file itself before publishing.
  },
  children: [
    {
      id: 'daim', name: 'Daim Baseer Piracha', shortName: 'Daim',
      tabSubtitle: 'My Beloved Son', theme: 'blue',
      introduction: 'My dear Daim, you made me Papa and filled my world with a love I had never known.',
      birth: { date: '2024-01-20', time: '11:45', timezone: 'Asia/Karachi', timezoneLabel: 'PKT · UTC+05:00', city: 'Faisalabad', country: 'Pakistan', hospital: '', weight: '', length: '' },
      // City not supplied. Add the city above when ready.
      welcome: 'My dear Daim, you made me Papa and filled my world with a love I had never known.',
      imagePath: 'images/daim/', portrait: { file: 'photo1.jpg', alt: 'Daim, our beloved son', focal: '50% 50%' },
      photos: [
        'photo1.jpg','photo2.jpg','photo3.jpg','photo4.jpg','photo5.jpg','photo6.jpg','photo7.jpg','photo8.jpg','photo9.jpg','photo10.jpg','photo11.jpg','photo12.jpg','photo13.jpg','photo14.jpg','photo15.jpg','photo16.jpg','photo17.jpg','photo18.jpg','photo19.jpg','photo20.jpg','photo21.jpg','photo22.jpg','photo23.jpg','photo24.jpg','photo25.jpg','photo26.jpg','photo27.jpg','photo28.jpg','photo29.jpg','photo30.jpg','photo31.jpg',
        'IMG_0001.JPG','IMG_0003.JPG','IMG_0005.JPG','IMG_0043.JPG','IMG_0109.JPG','IMG_0118.JPG','IMG_0120.JPG','IMG_0125.JPG','IMG_0144.JPG','IMG_0249.JPG','IMG_0268.JPG','IMG_0270.JPG','IMG_0312.JPG','IMG_0411.JPG','IMG_0415.JPG','IMG_0474.JPG','IMG_0479.JPG','IMG_0508.JPG','IMG_0528.JPG','IMG_0529.JPG','IMG_0532.JPG','IMG_0537.JPG','IMG_9888.JPG','IMG_9920.JPG','IMG_9941.JPG','IMG_9967.JPG','IMG_9983.JPG','IMG_9994.JPG'
      ],
      // Replace a filename with { file: 'photo1.jpg', caption: 'Your caption', date: '2024-02-01', alt: 'Describe the photo', focal: '50% 35%' }.
      milestones: [], // Add only real memories: { date: 'YYYY-MM-DD', title: 'First smile', description: 'Your memory' }
      letter: `My beloved Daim,

You made me a father, and that will always be one of the greatest blessings of my life. Every smile, every little discovery, and every moment with you holds a special place in my heart.

May you grow with kindness, courage, and a curious mind. May Allah protect you, guide your steps, and fill your life with goodness.

No matter how big you grow, you will always be my little boy. Papa will always be here to love you, support you, and cheer for you.

With all my love,
Papa`
    },
    {
      id: 'hidayah', name: 'Hidayah Baseer Piracha', shortName: 'Hidayah',
      tabSubtitle: 'My Precious Daughter', theme: 'pink',
      introduction: 'My precious Hidayah, your arrival brought another beautiful light into our home and another forever love into my heart.',
      birth: { date: '2026-10-15', time: '10:57', timezone: 'Asia/Riyadh', timezoneLabel: 'AST · UTC+03:00', city: 'Jeddah', country: 'Saudi Arabia', hospital: '', weight: '', length: '' },
      welcome: 'My precious Hidayah, your arrival brought another beautiful light into our home and another forever love into my heart.',
      imagePath: 'images/hidayah/', portrait: { file: '', alt: 'Hidayah, our precious daughter', focal: '50% 50%' },
      photos: [], milestones: [],
      letter: `My precious Hidayah,

You arrived so small, yet brought so much love into our lives. You are a beautiful blessing, and I am grateful for every moment I get to watch you grow.

May Allah protect you, bless you with health and happiness, and guide you toward all that is good. May you always know how deeply you are loved.

As you discover the world, remember that Papa’s love will always be with you.

With all my love,
Papa`
    }
  ],
  siblings: { imagePath: 'images/siblings/', photos: [] }
};

// Rendering uses textContent for personal text; no HTML is interpreted.
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function calendarDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
  if (!match) return null;
  const [y,m,d] = match.slice(1).map(Number);
  const date = new Date(y,m-1,d,12);
  return date.getFullYear() === y && date.getMonth() === m-1 && date.getDate() === d ? date : null;
}
function dateLabel(value) {
  const date = calendarDate(value);
  return date ? new Intl.DateTimeFormat('en-GB', {day:'numeric',month:'long',year:'numeric'}).format(date) : '';
}
function ageLabel(value, timezone, now = new Date()) {
  const birth = calendarDate(value);
  if (!birth) return '';
  const parts = new Intl.DateTimeFormat('en-US', {timeZone:timezone || undefined,year:'numeric',month:'numeric',day:'numeric'}).formatToParts(now);
  const get = type => Number(parts.find(p => p.type === type).value);
  const today = new Date(get('year'), get('month')-1, get('day'), 12);
  if (today < birth) return '';
  // Calendar anniversaries clamp to the last day of shorter months.
  let months = (today.getFullYear()-birth.getFullYear())*12 + today.getMonth()-birth.getMonth();
  const anchor = n => {
    const first = new Date(birth.getFullYear(),birth.getMonth()+n,1,12);
    const last = new Date(first.getFullYear(),first.getMonth()+1,0).getDate();
    return new Date(first.getFullYear(),first.getMonth(),Math.min(birth.getDate(),last),12);
  };
  if (anchor(months) > today) months--;
  const anniversary = anchor(months);
  const days = Math.round((Date.UTC(today.getFullYear(),today.getMonth(),today.getDate())-Date.UTC(anniversary.getFullYear(),anniversary.getMonth(),anniversary.getDate()))/86400000);
  const result = [];
  const add = (n, unit) => { if(n) result.push(`${n} ${unit}${n===1?'':'s'}`); };
  add(Math.floor(months/12),'year');add(months%12,'month');add(days,'day');
  return result.length ? result.join(', ') + ' of love' : 'Born today · already so loved';
}
function timeLabel(time, zone) {
  if (!/^\d{2}:\d{2}$/.test(time || '')) return '';
  const [h,m] = time.split(':').map(Number);
  return `${h%12 || 12}:${String(m).padStart(2,'0')} ${h<12?'AM':'PM'}${zone?' · '+zone:''}`;
}
function photoData(item) { return typeof item === 'string' ? {file:item} : item; }
function photoSource(base, file) {
  // Photos are local project assets. External URLs and traversal are rejected.
  const path = base + file;
  if (!file || /(^\/|[\\:]|(^|\/)\.\.(\/|$))/.test(path)) return '';
  return path.split('/').map(encodeURIComponent).join('/');
}
function portrait(child, small = false) {
  const box = el('div',small?'mini':'portrait');
  const fallback = () => {
    box.replaceChildren();
    if (small) box.textContent = child.shortName[0];
    else { const p = el('div','portrait-placeholder');p.append(el('b','',child.shortName[0]),el('span','', 'A LITTLE LOVE, FOREVER'));box.append(p); }
  };
  fallback();
  const src = photoSource(child.imagePath,child.portrait.file);
  if (src) {
    const image = el('img');image.alt = small?'':child.portrait.alt;image.style.objectPosition = child.portrait.focal || '50% 50%';
    image.addEventListener('error',fallback,{once:true});box.replaceChildren(image);image.src=src;
  }
  return box;
}
function sectionHeading(title, eyebrow, number) {
  const head=el('div','section-head'),copy=el('div');
  copy.append(el('span','eyebrow',eyebrow),el('h2','',title));head.append(copy);
  if(number) head.append(el('span','section-number',number));return head;
}
function emptyState(title, text) {
  const box=el('div','empty');box.append(el('span','symbol','♡'),el('strong','',title),el('p','',text));return box;
}
function gallery(photos, base, name) {
  const grid=el('div','gallery');
  const entries=photos.map(photoData).filter(p=>p && photoSource(base,p.file));
  entries.forEach((photo,index)=>{
    const figure=el('figure','photo'),button=el('button'),image=el('img');
    button.type='button';button.setAttribute('aria-label',`Open photograph ${index+1} of ${name}${photo.caption?': '+photo.caption:''}`);
    image.alt=photo.alt || `${name} — memory ${index+1}`;image.loading='lazy';image.decoding='async';image.style.objectPosition=photo.focal || '50% 50%';
    image.addEventListener('error',()=>{
      const note=el('span','missing-photo','♡ Photograph coming soon');
      button.replaceChildren(note);button.disabled=true;
      button.setAttribute('aria-label',`Photograph ${index+1} unavailable`);
    },{once:true});
    button.append(image);image.src=photoSource(base,photo.file);
    button.addEventListener('click',()=>openViewer(entries,base,index,button,name));figure.append(button);
    if(photo.caption || dateLabel(photo.date)) {
      const caption=el('figcaption','',photo.caption || '');
      if(dateLabel(photo.date)){const time=el('time','',dateLabel(photo.date));time.dateTime=photo.date;caption.append(time);}figure.append(caption);
    }
    grid.append(figure);
  });return grid;
}
const tabs=document.getElementById('tabs'),panels=document.getElementById('panels');
FAMILY_CONFIG.children.forEach((child,index)=>{
  const tab=el('button','tab '+child.theme);tab.type='button';tab.id='tab-'+child.id;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','panel-'+child.id);tab.setAttribute('aria-selected',String(index===0));tab.tabIndex=index===0?0:-1;
  const names=el('span');names.append(el('span','tab-name',child.shortName),el('span','tab-sub',child.tabSubtitle));tab.append(portrait(child,true),names);tabs.append(tab);
  const panel=el('section','panel '+child.theme);panel.id='panel-'+child.id;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);panel.hidden=index!==0;panel.tabIndex=0;
  const wrap=el('div','wrap'),hero=el('div','hero'),frame=el('div','portrait-frame'),copy=el('div','hero-copy');
  frame.append(portrait(child),el('span','frame-note','so little, so loved ♡'));
  copy.append(el('span','eyebrow',child.tabSubtitle.toUpperCase()),el('h2','',child.name),el('p','intro',child.introduction));
  const age=FAMILY_CONFIG.privacy.showAge?ageLabel(child.birth.date,child.birth.timezone):'';
  if(age) copy.append(el('p','age',age));hero.append(frame,copy);wrap.append(hero);
  const birth=el('section','birth-section');birth.append(sectionHeading('The Day You Arrived','THE BEGINNING OF YOUR STORY','01'));
  const details=el('div','birth-grid'),p=FAMILY_CONFIG.privacy,b=child.birth;
  const add=(label,value,show)=>{if(!show || !value)return;const card=el('div','detail');card.append(el('small','',label),el('p','',value));details.append(card);};
  add('Date of birth',dateLabel(b.date),p.showBirthDates);
  add('Time of birth',timeLabel(b.time,b.timezoneLabel),p.showBirthTimes);
  add('Place of birth',b.country ? `${b.city || '[City to add]'}, ${b.country}` : b.city,p.showBirthPlaces);
  add('Hospital',b.hospital,p.showHospitals);add('Birth weight',b.weight,p.showMeasurements);add('Birth length',b.length,p.showMeasurements);
  birth.append(details);if(child.welcome)birth.append(el('p','welcome',child.welcome));wrap.append(birth);
  const memories=el('section','memories');memories.append(sectionHeading('A Collection of Little Wonders','YOUR LIFE, IN LITTLE FRAMES','02'));
  memories.append(child.photos.length?gallery(child.photos,child.imagePath,child.shortName):emptyState('A lifetime of memories ahead','Your beautiful story is just beginning. Precious memories coming soon.'));wrap.append(memories);
  if(child.milestones.length){
    const section=el('section','timeline-section');section.append(sectionHeading('Little Moments, Big Memories','ONE BEAUTIFUL FIRST AT A TIME','03'));
    const timeline=el('ol','timeline');child.milestones.forEach(m=>{const item=el('li');if(dateLabel(m.date)){const time=el('time','',dateLabel(m.date));time.dateTime=m.date;item.append(time);}item.append(el('h3','',m.title));if(m.description)item.append(el('p','',m.description));timeline.append(item);});section.append(timeline);wrap.append(section);
  }
  const letter=el('section','letter');letter.append(el('span','eyebrow','A LETTER TO KEEP, ALWAYS'),el('h2','','With Love, Papa'),el('span','letter-seal','♡'),el('p','letter-text',child.letter));wrap.append(letter);panel.append(wrap);panels.append(panel);
  tab.addEventListener('click',()=>activate(index));
});
function activate(index, focus=false) {
  [...tabs.children].forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;panels.children[i].hidden=i!==index;});
  if(focus)tabs.children[index].focus();
}
tabs.addEventListener('keydown',event=>{
  const index=[...tabs.children].indexOf(document.activeElement);let next;
  if(event.key==='ArrowRight')next=(index+1)%tabs.children.length;
  if(event.key==='ArrowLeft')next=(index+tabs.children.length-1)%tabs.children.length;
  if(event.key==='Home')next=0;if(event.key==='End')next=tabs.children.length-1;
  if(next!==undefined){event.preventDefault();activate(next,true);}
});
const siblings=FAMILY_CONFIG.siblings;
document.getElementById('siblings').append(siblings.photos.length?gallery(siblings.photos,siblings.imagePath,'Daim and Hidayah'):emptyState('Two little hearts, one beautiful story','A special place for your photographs together. Sibling memories coming soon.'));

const dialog=document.getElementById('lightbox'),lbImage=document.getElementById('lb-image'),lbError=document.getElementById('lb-error');
let viewer={entries:[],base:'',index:0,trigger:null,name:''};
function showPhoto() {
  const photo=viewer.entries[viewer.index];lbImage.hidden=false;lbError.hidden=true;
  lbImage.alt=photo.alt || `${viewer.name} — memory ${viewer.index+1}`;
  lbImage.src=photoSource(viewer.base,photo.file);
  document.getElementById('lb-caption').textContent=[photo.caption,dateLabel(photo.date)].filter(Boolean).join(' · ');
  document.getElementById('lb-counter').textContent=`${viewer.index+1} / ${viewer.entries.length}`;
  dialog.querySelector('.lb-prev').disabled=viewer.entries.length<2;dialog.querySelector('.lb-next').disabled=viewer.entries.length<2;
}
lbImage.addEventListener('error',()=>{lbImage.hidden=true;lbError.hidden=false;});
function openViewer(entries,base,index,trigger,name) {
  viewer={entries,base,index,trigger,name};showPhoto();dialog.showModal();document.body.classList.add('modal-open');dialog.querySelector('.lb-close').focus();
}
function movePhoto(delta){viewer.index=(viewer.index+delta+viewer.entries.length)%viewer.entries.length;showPhoto();}
dialog.querySelector('.lb-close').addEventListener('click',()=>dialog.close());
dialog.querySelector('.lb-prev').addEventListener('click',()=>movePhoto(-1));
dialog.querySelector('.lb-next').addEventListener('click',()=>movePhoto(1));
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lbImage.removeAttribute('src');viewer.trigger?.focus();});
dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'){event.preventDefault();movePhoto(-1);}
  if(event.key==='ArrowRight'){event.preventDefault();movePhoto(1);}
  // Native modal dialog supplies Escape handling and focus containment.
});
let touchStart=null;
dialog.addEventListener('touchstart',event=>{if(event.touches.length===1)touchStart={x:event.touches[0].clientX,y:event.touches[0].clientY};else touchStart=null;},{passive:true});
dialog.addEventListener('touchend',event=>{if(!touchStart)return;const touch=event.changedTouches[0],dx=touch.clientX-touchStart.x,dy=touch.clientY-touchStart.y;if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)*1.5)movePhoto(dx<0?1:-1);touchStart=null;},{passive:true});
dialog.addEventListener('touchcancel',()=>{touchStart=null;},{passive:true});

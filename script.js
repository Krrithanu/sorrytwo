const pages = [
  {image:"stars.jpg",eyebrow:"A little something, just for you",title:"Can I tell you<br><em>something?</em>",body:"I made this little page because I want to say something properly, honestly, and from my heart.",button:"Open my letter"},
  {image:"moonlight.jpg",eyebrow:"A little piece of our story",title:"Some things<br><em>became ours.</em>",body:"Growing up, I was taught not to call people by that word. Then I met you, and you wanted it to be something special between us. I wanted that closeness too. It became a little thing that meant something to us.",button:"Let me explain"},
  {image:"jasmine.jpg",eyebrow:"About yesterday",title:"I know why<br><em>it hurt you.</em>",body:"You were beside me while another girl was talking about boys teasing her. I was trying to answer her and you at almost the same time. My words got mixed up, and I accidentally said the word I used for you to her.",button:"I owe you an apology"},
  {image:"golden.jpg",eyebrow:"From the bottom of my heart",title:"I am truly<br><em>sorry.</em>",body:"I should not have called another girl by the word I shared with you as something special. Even though I didn’t mean to say it, I understand why hearing it hurt you. I’m sorry I made you question what you mean to me.",button:"One more thing"},
  {image:"sunset-hands.jpg",eyebrow:"I want to make this right",title:"You are not<br><em>just anyone.</em>",body:"I don’t want our relationship to end. You mean so much to me, and I want to work through this with you. I know I can’t fix it with one page or one promise, so I’ll be more careful and show you through my actions.",button:"Read my last words"},
  {image:"ocean-sunset.jpg",eyebrow:"Whenever you’re ready",title:"I’m here to<br><em>listen.</em>",body:"You don’t have to forgive me immediately or pretend you’re okay. Take the time you need. I care about you, I’m sorry I hurt you, and whenever you’re ready, I want to listen.",button:"Read my full letter"}
];
const memories = [
  {image:"pic1.jpg",caption:"A little moment I keep close."},
  {image:"pic2.jpg",caption:"Somewhere in our story."},
  {image:"pic3.jpg",caption:"The small things mean the most."},
  {image:"pic4.jpg",caption:"And many more moments to come."}
];
let current = 0;
let memoryIndex = 0;
let memoryTimer;
let memoryTransition = 0;
let endingTransitionTimer;
const $ = id => document.getElementById(id);
const art = $("art"), eyebrow = $("eyebrow"), heading = $("heading"), body = $("body-copy"), next = $("next"), back = $("back");
const dots = $("dots"), counter = $("counter"), fill = $("fill");
function buildDots(){
  dots.innerHTML = "";
  pages.forEach((p,i)=>{
    const b=document.createElement("button"); b.className="dot"; b.setAttribute("aria-label",`Go to page ${i+1}`);
    b.innerHTML="<span></span>"; b.addEventListener("click",()=>showPage(i)); dots.appendChild(b);
  });
}
function showPage(i){
  current = Math.max(0,Math.min(pages.length-1,i));
  const p = pages[current];
  $("content").classList.add("fading");
  art.style.opacity = "0";
  window.setTimeout(()=>{
    art.style.backgroundImage = `url("images/${p.image}")`;
    eyebrow.textContent=p.eyebrow; heading.innerHTML=p.title; body.textContent=p.body; next.innerHTML=`${p.button} <span aria-hidden="true">→</span>`;
    counter.innerHTML=`${String(current+1).padStart(2,"0")} <span>/</span> ${String(pages.length).padStart(2,"0")}`;
    fill.style.width=`${((current+1)/pages.length)*100}%`;
    [...dots.children].forEach((d,j)=>d.classList.toggle("active",j===current));
    back.hidden=current===0;
    art.style.opacity="1";
    $("content").classList.remove("fading");
  },230);
}
function showMemories(){
  const videoScreen = $("video-screen");
  if(videoScreen.hidden || videoScreen.classList.contains("is-leaving"))return;
  $("memory-video").pause();
  videoScreen.classList.add("is-leaving");
  window.setTimeout(()=>{
    videoScreen.hidden = true;
    videoScreen.classList.remove("is-leaving");
    $("memories-screen").hidden = false;
    $("memories-screen").classList.remove("is-entering");
    void $("memories-screen").offsetWidth;
    $("memories-screen").classList.add("is-entering");
    memoryIndex = 0;
    showMemory();
    startMemoryTimer();
  },520);
}
function showMemory(){
  const memory = memories[memoryIndex];
  const photo = $("memory-photo");
  const transition = ++memoryTransition;
  photo.classList.remove("memory-enter");
  photo.classList.add("memory-exit");
  $("memory-caption").classList.add("caption-exit");
  window.setTimeout(()=>{
    if(transition!==memoryTransition)return;
    photo.src = `images/${memory.image}`;
    photo.alt = memory.caption;
    $("memory-caption").textContent = memory.caption;
    $("memory-caption").classList.remove("caption-exit");
    $("memory-count").textContent = `${String(memoryIndex+1).padStart(2,"0")} / ${String(memories.length).padStart(2,"0")}`;
    $("memory-dots").replaceChildren(...memories.map((_,i)=>{
      const dot = document.createElement("span");
      if(i===memoryIndex) dot.className = "active";
      return dot;
    }));
    $("memory-next").textContent = memoryIndex === memories.length-1 ? "See them again" : "Next memory";
    photo.classList.remove("memory-exit");
    photo.classList.add("memory-enter");
  },300);
}
function startMemoryTimer(){
  window.clearInterval(memoryTimer);
  memoryTimer = window.setInterval(()=>{
    if(memoryIndex < memories.length-1){memoryIndex++;showMemory();}
    else window.clearInterval(memoryTimer);
  },4800);
}
function moveMemory(direction){
  memoryIndex = (memoryIndex + direction + memories.length) % memories.length;
  showMemory();
  startMemoryTimer();
}
function beginEnding(){
  const done = $("done");
  if(done.disabled)return;
  done.disabled = true;
  $("letter-modal").classList.add("is-leaving");
  window.clearTimeout(endingTransitionTimer);
  endingTransitionTimer = window.setTimeout(()=>{
    $("letter-modal").hidden = true;
    $("letter-modal").classList.remove("is-leaving");
    done.disabled = false;
    openVideoScreen();
  },620);
}
function openVideoScreen(){
  $("ending-screen").hidden = false;
  $("ending-screen").classList.remove("is-entering");
  void $("ending-screen").offsetWidth;
  $("ending-screen").classList.add("is-entering");
  $("video-screen").hidden = false;
  $("video-screen").classList.remove("is-leaving");
  $("video-screen").classList.remove("is-entering");
  void $("video-screen").offsetWidth;
  $("video-screen").classList.add("is-entering");
  $("memories-screen").hidden = true;
  $("video-fallback").hidden = true;
  const video = $("memory-video");
  video.currentTime = 0;
  video.load();
  const playback = video.play();
  if(video.error || video.networkState === 3)$("video-fallback").hidden = false;
  if(playback)playback.catch(()=>{$("video-fallback").hidden = false;});
}
next.addEventListener("click",()=>{
  if(current===pages.length-1){$("letter-modal").hidden=false;$("close").focus();}
  else showPage(current+1);
});
back.addEventListener("click",()=>showPage(current-1));
$("close").addEventListener("click",()=>{$("letter-modal").hidden=true;});
$("done").addEventListener("click",beginEnding);
$("letter-modal").addEventListener("click",e=>{if(e.target===$("letter-modal"))$("letter-modal").hidden=true;});
$("memory-video").addEventListener("ended",showMemories);
$("memory-video").addEventListener("error",()=>{$("video-fallback").hidden=false;});
$("skip-video").addEventListener("click",showMemories);
$("show-memories").addEventListener("click",showMemories);
$("ending-close").addEventListener("click",()=>{
  $("memory-video").pause();
  window.clearInterval(memoryTimer);
  $("ending-screen").hidden=true;
});
$("memory-next").addEventListener("click",()=>{
  if(memoryIndex===memories.length-1){memoryIndex=0;showMemory();startMemoryTimer();}
  else moveMemory(1);
});
$("memory-prev").addEventListener("click",()=>moveMemory(-1));
document.addEventListener("keydown",e=>{
  if(e.key==="Escape" && !$("ending-screen").hidden){
    $("memory-video").pause();
    window.clearInterval(memoryTimer);
    $("ending-screen").hidden=true;
    return;
  }
  if(e.key==="Escape")$("letter-modal").hidden=true;
  if($("ending-screen").hidden && $("letter-modal").hidden && e.key==="ArrowRight")showPage(current+1);
  if($("ending-screen").hidden && $("letter-modal").hidden && e.key==="ArrowLeft")showPage(current-1);
  if (!$("ending-screen").hidden && !$("memories-screen").hidden && e.key==="ArrowRight")moveMemory(1);
  if (!$("ending-screen").hidden && !$("memories-screen").hidden && e.key==="ArrowLeft")moveMemory(-1);
});
buildDots(); showPage(0);

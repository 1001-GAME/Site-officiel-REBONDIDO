(()=>{const buttons=[...document.querySelectorAll("[data-pro-select]")],email=document.querySelector("#pro-project-email"),label=document.querySelector("#pro-chosen-topic");if(!email)return;function choose(topic){label.textContent=topic,buttons.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.proSelect===topic)));const body=`Bonjour,

Je souhaite échanger avec REBONDIDO au sujet de : `+topic+`.

Ma structure :
Les publics accompagnés :
Le contexte et les objectifs :
Le lieu et les dates envisagées :

Merci !`;email.href="mailto:contact@rebondido.com?subject="+encodeURIComponent("Projet professionnel REBONDIDO — "+topic)+"&body="+encodeURIComponent(body)}buttons.forEach(b=>b.addEventListener("click",()=>choose(b.dataset.proSelect))),document.querySelectorAll("[data-pro-topic]").forEach(a=>a.addEventListener("click",()=>choose(a.dataset.proTopic))),document.querySelectorAll(".pro-audience-grid details").forEach(item=>item.addEventListener("toggle",()=>{item.open&&document.querySelectorAll(".pro-audience-grid details").forEach(other=>{other!==item&&(other.open=!1)})})),choose("Le coffret professionnel")})();

// Initialize Swiper

var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      slidesPerGroup: 1,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
});


// document.querySelector('button').addEventListener('click', getData)

document.addEventListener('DOMContentLoaded', getData);
function getData(){


    fetch(`https://www.scorebat.com/video-api/v3/feed/?token=[MTc5NzJfMTY1MDgwNDY2MV8zMDE4MjQxOTJlODllOGU1ZTE4MzE5MmJlM2U2NDdiNzkzOGVhODcw]`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      console.log(data.response);
      let availableMatchHighlights = data.response
      availableMatchHighlights.forEach((match, index) => {
        console.log(match);
        appendDiv(match)
      });
    })
    .catch(err => console.error(err));

}

function appendDiv(match){

  let div = document.createElement('div') 
  div.classList.add('card', 'swiper-slide')
  div.innerHTML = `
        <h2 class="match-title">${match.title}</h3>
        <img src="${match.thumbnail}" alt="image" class="cover-img">
        <h3 class="league">${match.competition}</h3>
        <h4 class="date">${match.date}</h4>
        <a target="_blank" class="watch-btn" href="${match.matchviewUrl}">Watch</a>
        
      ` 
  const competition = match.competition;
  switch (competition) {
    case 'ENGLAND: Premier League':
          document.querySelector('.epl-highlights').appendChild(div);
          break;

    case 'GERMANY: Bundesliga':
          document.querySelector('.bundesliga-highlights').appendChild(div)
          break;

    case 'FRANCE: Ligue 1':
          document.querySelector('.league-1-highlights').appendChild(div)
          break;

    case 'ITALY: Serie A':
          document.querySelector('.seria-A-highlights').appendChild(div)
          break;

    case 'SPAIN: La Liga':
          document.querySelector('.la-liga-highlights').appendChild(div)
          break;

    default:
          document.querySelector('.other-leagues').addEventListener('click', ()=>{
            document.querySelector('.other-leagues-highlights').appendChild(div)
          })
  }
} 
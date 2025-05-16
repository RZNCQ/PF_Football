//Store The API Key And The Custom HTTP Header Of The API 
const headers = {
    'x-rapidapi-key': '5b2f9a1189msh6167f7a56a19908p168f53jsna42dc93fdb51',
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
}
function getTeamLogo(){
    //To Fetch The Football League
    fetch("https://api-football-v1.p.rapidapi.com/v3/leagues",{
        //Api Header
        headers: headers
    })
    .then(response=>response.json())
    .then(data=>{
        //To Get The Img Element ID
        const englishPremierLeague = document.getElementById("englishPremierLeague");
        const laLiga = document.getElementById("laLiga");
        const serie_a = document.getElementById("serieA");
        const bundesliga = document.getElementById("bundesliga");
        const ligue1 = document.getElementById("ligue1");
        //To Assign The Img Src With The Respective Football League logo ffrom api
        ligue1.src = data.response[2].league.logo;
        bundesliga.src = data.response[6].league.logo;
        serie_a.src = data.response[7].league.logo;
        laLiga.src = data.response[10].league.logo;
        englishPremierLeague.src = data.response[5].league.logo;
    })

}
getTeamLogo();
const fixtureData = document.querySelector(".league-fixtures");
let htmlContent = "";
function getEplFixture() {
  fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2024`, {
    headers: headers
  })
    .then(response => response.json())
    .then(data=>{
      //To Retrieve The Fixture Teams,Match Status & Score And Store It In Variable
      data.response.forEach(fixture => {
        const homeTeam = fixture.teams.home.name;
        const awayTeam = fixture.teams.away.name;
        const matchStatus = fixture.fixture.status.long;
        const homeScore = fixture.goals.home;
        const awayScore = fixture.goals.away;
        const matchDate = fixture.fixture.date
        //Assign The Match Status If The Match Hasnt Been Played
        let matchDetail = `<span class="status">${matchStatus}</span>`;
        //To Check If The Match is Over If it is Over It will Retrive The Score Insted Of the Status
        if (matchStatus.toLowerCase().includes('finished')) {
          matchDetail = `<span class="score">${homeScore} - ${awayScore}</span>`;
        }
        //To append the fixture List WIth the current Fixture retrieve In The loop 
        htmlContent += `
          <li class="fixture-data">
            <span class="match-date">${matchDate}}</span>
            <span class="home-team">${homeTeam}</span>
            ${matchDetail}
            <span class="away-team">${awayTeam}</span>
          </li>
        `      
      });
      fixtureData.innerHTML = htmlContent;
    })
    .catch(error => {
      alert('Error fetching fixtures:', error);
      fixtureData.innerHTML = '<li class="error-warning">Failed to load fixtures.</li>';
    });
}
getEplFixture();
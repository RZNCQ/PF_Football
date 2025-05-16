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
      });
    })
    .catch(error => {
      console.error('Error fetching fixtures:', error);
    });
}
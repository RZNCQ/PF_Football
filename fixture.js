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
/*Check Which League User Pick Based On The Image Click*/
//Get All img element in the logo-container
const images = document.querySelectorAll(".logo-container img");
//add event listener to detect Which Image User Click
images.forEach(image=>{
    image.addEventListener("click",function(){
        //Get the ID Of the Image Element From HTML According TO User Click.
        const selectedImageId = this.id;
        /*If User Click On The Premier League etc... Logo 
        It Will Call The Functions WIth The League ID*/
        if(selectedImageId==="englishPremierLeague")
        {
            getFixture(39);
            getTopScorer(39);
        }
        else if(selectedImageId==="laLiga")
        {
            getFixture(140);
            getTopScorer(140);
        }
        else if(selectedImageId==="serieA")
        {
            getFixture(135);
            getTopScorer(135);
        }
        else if(selectedImageId==="bundesliga")
        {
            getFixture(78);
            getTopScorer(78);
        }
        else if(selectedImageId==="ligue1")
        {
            getFixture(61);
            getTopScorer(61);    
        }
    })
})

const fixtureData = document.querySelector(".league-fixtures");
function getFixture(id) {
    let htmlContentFixture = "";
    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${id}&season=2024`, {
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
            htmlContentFixture += `
            <li class="fixture-data">
                <span class="match-date">${matchDate}}</span>
                <span class="home-team">${homeTeam}</span>
                ${matchDetail}
                <span class="away-team">${awayTeam}</span>
            </li>
            `      
        });
        fixtureData.innerHTML = htmlContentFixture;
    })
    .catch(error => {
      alert('Error fetching fixtures:', error);
      fixtureData.innerHTML = '<li class="error-warning">Failed to load fixtures.</li>';
    });
}
const leagueStatsData = document.querySelector('.league-stats');
function getTopScorer(id){
    let htmlContentStats = "";
    fetch(`https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${id}&season=2024`,{
        headers:headers
    })
    .then(response=>response.json())
    .then(data=>{
        data.response.forEach(stats=>{
            const playerName = stats.player.name;
            const goalScored = stats.statistics[0].goals.total;
            const playerImage = stats.player.photo;
            htmlContentStats+= `
            <li>
                <img src="${playerImage}" alt="Player Image">
                <span>
                    ${playerName}
                    Goals: ${goalScored}
                </span>
            </li>`
        })
        leagueStatsData.innerHTML = htmlContentStats;
    })
    .catch(error=>{
        leagueStatsData.innerHTML = '<li class="error-warning">Failed to load Top Scorer.</li>'
    })
}
//Store The API Key And The API Host. 
const headers = {
    'x-rapidapi-key': '5b2f9a1189msh6167f7a56a19908p168f53jsna42dc93fdb51',
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
}
function getTeamLogo(){
    //To Fetch The Football League
    fetch("https://api-football-v1.p.rapidapi.com/v3/leagues",{
        headers//API Headers(APi Key And API Host)
    })
    .then(response=>response.json())
    .then(data=>{
        //The Image Element ID
        const imageElementId = ["englishPremierLeague","laLiga","serieA","bundesliga","ligue1"];
        const apiIndex = [5,10,7,6,2];//The API Response index
        /* Get Image Element According To The Id And Assign
        image src With Respective League Logo From The API*/
        for(let i=0;i<imageElementId.length;i++)
        {
            let imgElement = document.getElementById(imageElementId[i]);
            let apiLeagueLogoUrl = data.response[apiIndex[i]].league.logo;
            imgElement.src = apiLeagueLogoUrl;
        }
    })
}
getTeamLogo();
//Get All img element in the logo-container
const images = document.querySelectorAll(".logo-container img");
//add event listener to detect Which Image User Click
images.forEach(image=>{
    image.addEventListener("click",function(){
        /*If User Click On The Premier League etc... Logo It Will Call 
        The Fixture And Top Scorer Function WIth The League ID*/
        switch(image.id) {
            case "englishPremierLeague":
                getFixture(39);
                break;
            case "laLiga":
                getFixture(140);
                break;
            case "serieA":
                getFixture(135);
                break;
            case "bundesliga":
                getFixture(78);
                break;
            case "ligue1":
                getFixture(61);
                break;
            default:
                break;
        }
    })
})
//Get Ul Tag From Fixture div
const fixtureData = document.querySelector(".league-fixtures");
function getFixture(id) {
    let htmlContentFixture = "<p>Click To View Match Stats</p>";
    //Fetch The Fixture According To League
    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${id}&season=2024`, {
        headers
    })
    .then(response => response.json())
    .then(data=>{
        //To Loop The Fixture In Response
        data.response.reverse().forEach(fixture => {
            //Get The Match ID, Status & Date Information And Store It In Variables
            const matchStatus = fixture.fixture.status.long;
            const matchDate = new Date(fixture.fixture.date).toLocaleString('en-GB');
            const matchId = fixture.fixture.id;
            //Assign The Match Status If The Match Hasnt Been Played
            let matchDetail = `<div class="status">${matchStatus}</div>`;
            //To Check If The Match is Over If it is Over It will Retrive The Score Insted Of the Status
            if (matchStatus.toLowerCase().includes('finished')) {
            matchDetail = `<div class="score">${fixture.goals.home} - ${fixture.goals.away}</div>`;
            }
            //To append the fixture List WIth the current Fixture retrieve In The loop 
            htmlContentFixture += `
            <a href="match.html?data-id=${matchId}">
            <li class="fixture-data">
                <div class="match-date">${matchDate}</div>
                <div class="team">${fixture.teams.home.name}</div>
                ${matchDetail}
                <div class="team">${fixture.teams.away.name}</div>
            </li>
            </a>
            `      
        });
        fixtureData.innerHTML = htmlContentFixture;
        //To Call The Top Scorer function.
        getTopScorer(id);
    })
    //When There Is error fetching the fixture It Will Append Error
    .catch(error => {
      alert('Error fetching fixtures:', error);
      fixtureData.innerHTML = '<li class="error-warning">Failed to load fixtures.</li>';
    });
}
//Get The Ul Tag In The Stats Div
const leagueStatsData = document.querySelector('.league-stats');
function getTopScorer(id){
    let htmlTopScorer = "";
    //Fetch Top Scorer From Api According To The League
    fetch(`https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${id}&season=2024`,{
        headers:headers
    })
    .then(response=>response.json())
    .then(data=>{
        //Only Loop The First 10 Top Scorer In The Api Json
        data.response.slice(0,10).forEach(stats=>{
            //Get The Top Scorer Name,Goals Scored And Profile Image.
            const playerName = stats.player.name;
            const goalScored = stats.statistics[0].goals.total;
            const playerImage = stats.player.photo;
            //To Append The Player Profile In League Stats Div
            htmlTopScorer+= `
            <li>
                <img src="${playerImage}" alt="Player Image">
                <span>
                    ${playerName}
                    Goals: ${goalScored}
                </span>
            </li>`
        })
        leagueStatsData.innerHTML = htmlTopScorer;
        //To Call For The Top Assist Function.
        getTopAssists(id);
    })
    //If There is error fetching the top scorer Will Append Error Instead.
    .catch(error=>{
        console.log(`Error Getting Top Scorer: ${error}`)
        leagueStatsData.innerHTML = '<li class="error-warning">Failed to load Top Scorer.</li>'
    })
}
function getTopAssists(id)
{
    let htmlTopAssist = "<h2>Top Assists</h2>";
    //Fetch The Top Assists In the lkeague.
    fetch(`https://api-football-v1.p.rapidapi.com/v3/players/topassists?league=${id}&season=2024`,{
        headers
    })
    .then(response=>response.json())
    .then(data=>{
        //Loop Only the Top 10 Assists In the api json
        data.response.slice(0,10).forEach(stats=>{
            //Get The Player Name,Image And Assists.
            const playerName = stats.player.name;
            const playerAssist = stats.statistics[0].goals.assists;
            const playerImage = stats.player.photo;
            //Will Append The Player Profile In The League Stats Div After The Top Scorer
            htmlTopAssist+=`
            <li>
                <img src="${playerImage}" alt="Player Image">
                <span>
                    ${playerName}
                    Assist: ${playerAssist}
                </span>
            </li>`
        })
        leagueStatsData.innerHTML += htmlTopAssist;
    })
    //Will Append Error If It Fails to fetxch
    .catch(error=>{
        console.log(`Error Getting Top Scorer: ${error}`)
        leagueStatsData.innerHTML = '<li class="error-warning">Failed to load Top Assists.</li>'
    })

}
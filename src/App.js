/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import "./App.css";

const copyToClipboard = () => {
  const el = document.getElementById("stuffsOut");
  el.select();
  document.execCommand("copy");
};

function App() {
  const [stuffsIn, setStuffsIn] = useState();

  const clearIt = () => {
    document.getElementById("stuffsIn").value = "";
    setStuffsIn("");
  };

  const convertItAll = textString => {
    let workingDiv = document.getElementById("setStuffsHere");
    workingDiv.innerHTML = textString;
    if (!document.querySelectorAll("h3")[0]) {
      setStuffsIn("");
      return;
    }
    let numbers = workingDiv.querySelectorAll("td.alignRight");
    let teams = workingDiv.querySelectorAll(".oddsTeamWLink");
    let scores = workingDiv.querySelectorAll("div[id$='_final']");
    let odds = workingDiv.querySelectorAll("div[id^='_Div_Line_2']");

    let awayTeam = [];
    let homeTeam = [];
    let teamList = [];
    let scoreList = [];
    let oddsList = [];
    let teamGrid = "";
    teamGrid = `Team; Final; Odds; S/U Points; Odds Points\n\n`;
    numbers.forEach((number, index) => {
      let [one, two] = number.innerHTML.split("<br>");
      awayTeam[index] = one;
      homeTeam[index] = two;
    });

    teams.forEach(team => {
      teamList.push(team.textContent);
    });
    scores.forEach(score => {
      scoreList.push(score.textContent);
    });
    odds.forEach(odd => {
      oddsList.push(odd.textContent);
    });
    for (let i = 0; i < teamList.length; i++) {
      teamGrid += `${teamList[i]}; ${scoreList[i]}; ${oddsList[i]}\n`;
    }
    // setStuffsIn(teamGrid);
    console.log(numbersList);
  };

  return (
    <div
      className="App"
      css={css`
        font-family: Fresca;
        display: flex;
        max-width: 1400px;
        margin: 0 auto;
        padding: 20px 40px;
        @media (max-width: 800px) {
          flex-direction: column;
        }
      `}
    >
      <div
        css={css`
          flex: 1;
          padding: 10px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <h1
            css={css`
              flex: 1;
            `}
          >
            Stuffs In
          </h1>
          <button
            css={css`
              cursor: pointer;
              padding: 0.2em 0.8em;
              font-family: Fresca;
              background: limegreen;
              border: 0;
              color: white;
              font-size: 2em;
              transition: all 0.2s;
              &:hover {
                background: crimson;
              }
            `}
            onClick={clearIt}
          >
            Clear It
          </button>
        </div>
        <textarea
          css={css`
            font-family: Fresca;
            font-size: 1em;
            padding: 0.5em;
            text-align: left;
            width: 100%;
            min-height: 80vh;
            @media (max-width: 800px) {
              min-height: 35vh;
            }
          `}
          id="stuffsIn"
          onChange={event => convertItAll(event.target.value)}
        ></textarea>
      </div>
      <div
        css={css`
          flex: 1;
          padding: 10px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <button
            css={css`
              cursor: pointer;
              padding: 0.2em 0.8em;
              font-family: Fresca;
              background: limegreen;
              border: 0;
              color: white;
              font-size: 2em;
              transition: all 0.2s;
              &:hover {
                background: crimson;
              }
            `}
            onClick={copyToClipboard}
          >
            Copy It
          </button>
          <h1
            css={css`
              flex: 1;
            `}
          >
            Stuffs Out
          </h1>
        </div>
        <textarea
          css={css`
            width: 100%;
            padding: 0.5em;
            text-align: left;
            min-height: 80vh;
            background: lightgoldenrodyellow;
            @media (max-width: 800px) {
              min-height: 35vh;
            }
          `}
          readOnly
          id="stuffsOut"
          value={stuffsIn}
          // dangerouslySetInnerHTML={{ __html: stuffsIn }}
        ></textarea>
      </div>
      <div
        id="setStuffsHere"
        css={css`
          display: none;
        `}
      ></div>
    </div>
  );
}

export default App;

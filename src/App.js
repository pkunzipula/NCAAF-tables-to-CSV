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
    if (workingDiv.querySelectorAll("tr[class^='statistics_table_']")[0]) {
      itsDonBest(workingDiv);
    } else if (workingDiv.querySelectorAll("div.col-md-6")[0]) {
      itsCompughter(workingDiv);
    } else if (
      workingDiv.querySelectorAll("div[class^='picksheet-table']")[0]
    ) {
      itsSportsLine(workingDiv);
    }
    return;
  };

  const itsCompughter = workingDiv => {
    if (!document.querySelectorAll("h1")[0]) {
      setStuffsIn("");
      return;
    }
    let teams = workingDiv.querySelectorAll("div.col-md-6 td.col-md-2 a");
    let points = workingDiv.querySelectorAll(
      "div.col-md-6 tr:not(:last-child) td:last-child"
    );
    let teamGrid = "";
    for (let i = 0; i < teams.length; i++) {
      teamGrid += `${teams[i].textContent}, ${points[i].textContent}\n`;
    }
    setStuffsIn(teamGrid);
  };

  const itsSportsLine = workingDiv => {
    if (!document.querySelectorAll("div.header")[0]) {
      setStuffsIn("");
      return;
    }
    let teams = workingDiv.querySelectorAll("a.data-row > meta");
    let teamList = [];
    teams.forEach(team => {
      let metas = team.content;
      let [away, home] = metas.split(" at ");
      teamList.push(away, home);
    });
    let points = workingDiv.querySelectorAll("a.data-row .proj-score");
    let teamGrid = "";
    for (let i = 0; i < teams.length; i++) {
      teamGrid += `${teamList[i]}, ${points[i].textContent.trim()}\n`;
    }
    // console.log(teamList);
    setStuffsIn(teamGrid);
  };

  const itsDonBest = workingDiv => {
    if (!document.querySelectorAll("h3")[0]) {
      setStuffsIn("");
      return;
    }
    // let numbers = workingDiv.querySelectorAll(
    //   "tr[class^='statistics_table_'] td:first-of-type"
    // );

    // let odds = workingDiv.querySelectorAll("td.oddsOpener div");
    // let teams = workingDiv.querySelectorAll(".oddsTeamWLink");

    let numbers = workingDiv.querySelectorAll(
      "tr td[class^='statistics_table_']:first-child"
    );

    let odds = workingDiv.querySelectorAll(
      "tr td[class^='statistics_table_']:nth-child(10)"
    );
    let teams = workingDiv.querySelectorAll(
      "tr td[class^='statistics_table_']:nth-child(2) a"
    );

    let numberList = [];
    let oddList = [];
    let teamList = [];

    // let theDay = document.querySelectorAll("h3")[0].textContent;
    // let teamGrid = `${theDay}\nGame; Opener; Team\n\n`;
    let teamGrid = "";

    numbers.forEach(number => {
      let [away, home] = number.innerHTML.split("<br>");
      numberList.push(away, home);
    });
    teams.forEach(team => {
      let [away, home] = team.innerHTML.split;
    });
    // odds.forEach(odd => {
    //   let [away, home] = odd.innerHTML.split("<br>");
    //   oddList.push(away, home);
    // });
    // teams.forEach(team => {
    //   teamList.push(team.textContent);
    // });
    for (let i = 0; i < numberList.length; i++) {
      if (numberList[i] < 1000) {
        teamGrid += `${numberList[i]}, ${oddList[i]}, ${teamList[i]}\n`;
      }
    }
    setStuffsIn(teamGrid);
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
          /* display: none; */
        `}
      ></div>
    </div>
  );
}

export default App;

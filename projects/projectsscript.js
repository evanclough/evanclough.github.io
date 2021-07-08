const container = document.getElementById('container');

function createProjectDiv(title, description, imgURL, link){
    const cd = document.createElement("div");
    cd.style.margin = "auto";
    cd.style.width = "950px";
    cd.style.height = "300px";
    cd.style.backgroundColor = "#333333";
    cd.style.padding = "20px";
    cd.style.marginTop = "40px";
    cd.style.marginBottom = "40px";
    container.appendChild(cd);
    const textDiv = document.createElement("div");
    const imageDiv = document.createElement("div");
    const t = document.createElement("a");
    const d = document.createElement("span");
    
    imageDiv.style.float = "right";
    imageDiv.style.width = "40%";
    imageDiv.style.height = "100%";
    imageDiv.style.backgroundColor = "#333333";
    
    textDiv.style.float = "left";
    textDiv.style.width = "40%";
    textDiv.style.backgroundColor = "#333333";
    textDiv.style.verticalAlign = "100%";
    t.className = "div_text";
    d.className = "div_text";
    t.style.color = "white";
    t.style.fontFamily = "'Roboto'";
    
    t.style.textAlign = "left"
    t.style.marginLeft = "3%"
    t.style.float = "left";
    t.style.backgroundColor = "#333333";
    t.href = link
    d.style.color = "white";
    d.style.fontFamily = "'Open Sans'";
    
    d.style.textAlign = "left"
    d.style.marginLeft = "3%"
    d.style.float = "left";
    d.style.backgroundColor = "#333333";
    d.style.marginTop = "2%"
    d.style.fontSize = "15px";
    
    t.style.fontSize = "40px";
    t.innerHTML = title;
    
    d.innerHTML = description;
    const i = document.createElement("img");
    
    i.style.float = "right";
    i.style.width = "50%";
    
    
    
    i.src = imgURL;
    cd.appendChild(textDiv);
    
    textDiv.appendChild(t);
    textDiv.appendChild(d);
    cd.appendChild(i);
}
createProjectDiv("Spherio", "This is an aiming/strategy browser game that I solo-developed from scratch over the course of about two months using the Javascript visualization library p5.js. The source code can be found <a href = 'https://github.com/L-F-N/L-F-N.github.io'>here</a>. (It's also the first real project I made, so the code is a disaster. Still works though ¯\\_(ツ)_/¯ )", "spherio_thumbnail.JPG", "spherio/spherio.html");
createProjectDiv("2048", "This is a command prompt port of the popular mobile game 2048, which I made in C++. Play it in the browser with repl.it <a href = 'https://replit.com/@troyjava2004/2048#main.cpp'> here </a>.", "2048.jpg", "https://github.com/evanclough/2048" );
createProjectDiv("Aim Booster Clone", "This is a clone of the game Aim Booster written in p5.js. I made it because the original developer of the game doesn't support it anymore, and since the game is dependent on the Adobe Flash plug-in, it will be unplayable in Google Chrome after this year.", "aim_booster_thumbnail.jpg", "aim_booster_clone/index.html");
createProjectDiv("CLI Graphing Calculator", "This file will take a string math function input and convert it to an in-code function using std::function, and uses this to graph the function over whatever window you choose.", "calculator.jpg", "https://replit.com/@troyjava2004/big-CLI-graphing-calculator-file");



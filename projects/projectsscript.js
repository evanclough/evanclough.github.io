const container = document.getElementById('container');

function createProjectDiv(title, description, imgURL, link){
    const cd = document.createElement("div");
    cd.style.margin = "auto";
    cd.style.width = "950px";
    cd.style.height = "300px";
    cd.style.backgroundColor = "#333333";
    cd.style.padding = "20px";
    cd.style.marginTop = "1.5%";
    cd.style.marginBottom = "1.5%";
    container.appendChild(cd);
    const textDiv = document.createElement("div");
    const imageDiv = document.createElement("div");
    const t = document.createElement("a");
    const d = document.createElement("span");
    
    imageDiv.style.float = "right";
    imageDiv.style.width = "40%";
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
    d.style.fontSize = "10px";
    
    t.style.fontSize = "30px";
    t.innerHTML = title;
    d.style.fontSize = "15px";
    d.innerHTML = description;
    const i = document.createElement("img");
    
    i.style.float = "right";
    
    
    
    
    i.src = imgURL;
    cd.appendChild(textDiv);
    cd.appendChild(imageDiv);
    textDiv.appendChild(t);
    textDiv.appendChild(d);
    imageDiv.appendChild(i);
}
createProjectDiv("Spherio", "This is an aiming/strategy browser game that I solo-developed from scratch over the course of about two months using the Javascript visualization library p5.js. The source code can be found <a href = 'https://github.com/L-F-N/L-F-N.github.io'>here.</a> ", "spherio_thumbnail.JPG", "spherio/spherio.html")
createProjectDiv("2048.cpp", "This is a command prompt port of the popular mobile game 2048, which I made in C++. ", "2048.jpg", "https://github.com/evanclough/2048" )






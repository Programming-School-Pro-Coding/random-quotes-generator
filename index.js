const quoteContainer = document.querySelector(".quote-container");

function generateHexColor() {
  // Generate random values for red, green, and blue components
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Convert the values to hexadecimal and format the color string
  const hexColor = `#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

  return hexColor;
}

async function fetchQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  const quote = data.content;
  const author = data.author;
  const date = data.dateModified ? data.dateModified : data.dateAdded;
  const tagsContainer = document.createElement("div");
  tagsContainer.classList.add("tags");
  if (data.tags && data.tags.length > 0) {
    data.tags.forEach((tag) => {
      const tagElement = document.createElement("span");
      tagElement.classList.add("tag");
      tagElement.textContent = `#${tag}`;
      tagElement.style.backgroundColor = generateHexColor();
      tagsContainer.appendChild(tagElement);
    });
  }

  const content = `
        <div class="quote">
            <div class="info">
                <h3 class="author">${author}</h3>
                <h4 class="date">${date}</h4>
            </div>
            <p class="quote-text">${quote}</p>
            <div class="quote-footer">
                <div class="tags">
                    ${tagsContainer.outerHTML}
                </div>
                <button class="new-quote" onclick="fetchQuote()"><img src="./assets/refresh.png" alt="refresh" class="new-quote-img" /></button>
            </div>
        </div>
    `;

  quoteContainer.innerHTML = content;
}

fetchQuote();

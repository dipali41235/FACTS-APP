const apiUrl = "https://api.api-ninjas.com/v1/facts?limit=1";
const apiKey = "tmzQqPk8v0EuGfP1d7pWBw==sTExHT0IOuEvNul1";

async function getFact() {
  try {
    document.getElementById("fact-text").textContent = "Loading...";
    
    const response = await fetch(apiUrl, {
      headers: { "X-Api-Key": apiKey }
    });
    
    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    document.getElementById("fact-text").textContent = data[0].fact;

  } catch (error) {
    document.getElementById("fact-text").textContent = "Error fetching fact.";
    console.error(error);
  }
}

document.getElementById("fact-btn").addEventListener("click", getFact);

// Load the first fact when page opens
getFact();

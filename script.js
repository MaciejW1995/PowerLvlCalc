const weightValue = document.querySelector("#weight");
const repsValue = document.querySelector("#reps");
const results = document.querySelector(".calculationResult");
const btnCalc = document.querySelector("#calculate-btn");
const userWeight = document.querySelector("#userWeight");



const epleyEcuation = () => {
    results.textContent = ``
    results.style.color = "white";
    if (weightValue.value > 0 && repsValue.value > 0 && userWeight.value > 0) {
        let weight = weightValue.valueAsNumber;
        let reps = repsValue.valueAsNumber;
        let userWeightNumber = userWeight.valueAsNumber;
        let score = weight * (1 + reps / 30);
        let relativeStrength = score / userWeightNumber;
        if (relativeStrength >= 2.00) {
            results.textContent = `Twój max: ${score.toFixed(2)}kg. Stosunek: ${relativeStrength.toFixed(2)}. Niesamowita wręcz nadludzka siła, 0,1% populacji! Orzymujesz złoto!`;
            results.style.color = "#ffd700"; // Złoto
        } else if (relativeStrength >= 1.25) {
            results.textContent = `Twój max: ${score.toFixed(2)}kg. Stosunek: ${relativeStrength.toFixed(2)}. Klasyfikuje Cię to jako średnio zaawansowany. Brawo otrzymujesz srebro!`;
            results.style.color = "#c0c0c0"; // Srebro
        } else if (relativeStrength >= 0.75) {
            results.textContent = `Twój max: ${score.toFixed(2)}kg. Stosunek: ${relativeStrength.toFixed(2)}. Jesteś na poziomie przeciętnym. Dobra baza do dalszej pracy! Orzymujesz brąz.`;
            results.style.color = "#cd7f32";
        } else {
            // 4. POCZĄTKUJĄCY (Wszystko poniżej 0.75)
            results.textContent = `Twój max: ${score.toFixed(2)}kg. Stosunek: ${relativeStrength.toFixed(2)}. Klasyfikuje Cię to jako początkujący. Spokojnie, każdy kiedyś zaczynał!`;
            results.style.color = "#ffffff";
        }
    } else if (weightValue.value <= 0 || repsValue.value <= 0 || userWeight.value <= 0) {
        results.textContent = `Proszę uzupełnić wszystkie pola!`
        results.style.color = "red";
    }
}

btnCalc.addEventListener("click", epleyEcuation);
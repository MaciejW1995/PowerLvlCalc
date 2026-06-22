const weightValue = document.querySelector("#weight");
const repsValue = document.querySelector("#reps");
const results = document.querySelector(".calculationResult");
const btnCalc = document.querySelector("#calculate-btn");
const userWeight = document.querySelector("#userWeight");
const weightLabel = document.querySelector('label[for="weight"]');
const exerciseType = document.querySelector("#exerciseType");
const gender = document.querySelector("#gender");

// --- Standards for lifting ---
const standards = {
    male: {
        bench: { beginner: 0.75, intermediate: 1.25, advanced: 1.5, elite: 2.0 },
        squat: { beginner: 1.0, intermediate: 1.5, advanced: 2.0, elite: 2.5 },
        deadlift: { beginner: 1.25, intermediate: 1.75, advanced: 2.25, elite: 2.75 }
    },
    female: { 
        bench: { beginner: 0.5, intermediate: 0.75, advanced: 1.0, elite: 1.25 },
        squat: { beginner: 0.75, intermediate: 1.0, advanced: 1.5, elite: 2.0 },
        deadlift: { beginner: 1.0, intermediate: 1.25, advanced: 1.75, elite: 2.25 }
    }
};

const bodyweightStandards = {
    pullups: {
        male: {
            light: { weightLimit: 70, beginner: 4, intermediate: 11, advanced: 19, elite: 26 },
            medium: { weightLimit: 90, beginner: 2, intermediate: 9, advanced: 15, elite: 22 },
            heavy: { weightLimit: Infinity, beginner: 1, intermediate: 6, advanced: 12, elite: 18 }
        },
        female: {
            light: { weightLimit: 60, beginner: 1, intermediate: 5, advanced: 11, elite: 16 },
            medium: { weightLimit: 75, beginner: 0, intermediate: 3, advanced: 8, elite: 12 },
            heavy: { weightLimit: Infinity, beginner: 0, intermediate: 1, advanced: 4, elite: 8 }
        }
    },
    pushups: {
        male: {
            light: { weightLimit: 70, beginner: 15, intermediate: 35, advanced: 55, elite: 75 },
            medium: { weightLimit: 90, beginner: 10, intermediate: 30, advanced: 50, elite: 70 },
            heavy: { weightLimit: Infinity, beginner: 5, intermediate: 25, advanced: 40, elite: 60 },
        },
        female: {
            light: { weightLimit: 60, beginner: 5, intermediate: 15, advanced: 30, elite: 45 },
            medium: { weightLimit: 75, beginner: 2, intermediate: 10, advanced: 20, elite: 35 },
            heavy: { weightLimit: Infinity, beginner: 0, intermediate: 5, advanced: 15, elite: 25 },
        }
    }
};

// Hiding and showing weight input
const hideWeight = () => {
    const selectedExercise = exerciseType.value;
    if (selectedExercise === 'pushups' || selectedExercise === 'pullups') {
        weightValue.classList.add('hidden');
        weightLabel.classList.add('hidden');
        weightValue.value = ""; // Dobra praktyka: czyszczenie ukrytego pola
    } else {
        weightValue.classList.remove('hidden');
        weightLabel.classList.remove('hidden');
    }
};


const calculateScore = () => {
    // 1. Reseting results
    results.textContent = "";
    results.style.color = "white";

    // 2. Getting values form certain variables
    const selectedExercise = exerciseType.value;
    const selectedGender = gender.value;
    const reps = repsValue.valueAsNumber;
    const userWeightNumber = userWeight.valueAsNumber;

    // 3. Data validation
    if (isNaN(reps) || reps <= 0 || isNaN(userWeightNumber) || userWeightNumber <= 0) {
        results.textContent = "Please fill in all required fields with correct values!";
        results.style.color = "red";
        return;
    }

    // Variables to show results
    let finalMessage = "";
    let finalColor = "";

    // 4. Using weight of your body
    if (selectedExercise === 'pushups' || selectedExercise === 'pullups') {
        // --- Bodyweight ---
        const categoryData = bodyweightStandards[selectedExercise][selectedGender];
        let limits;

        if (userWeightNumber <= categoryData.light.weightLimit) {
            limits = categoryData.light;
        } else if (userWeightNumber <= categoryData.medium.weightLimit) {
            limits = categoryData.medium;
        } else {
            limits = categoryData.heavy;
        }

        if (reps >= limits.elite) {
            finalMessage = `Reps: ${reps}. Level: ELITE! (Gold Medal)`;
            finalColor = "#ffd700";
        } else if (reps >= limits.advanced) {
            finalMessage = `Reps: ${reps}. Level: Advanced! (Silver Medal)`;
            finalColor = "#c0c0c0";
        } else if (reps >= limits.intermediate) {
            finalMessage = `Reps: ${reps}. Level: Intermediate! (Bronze Medal)`;
            finalColor = "#cd7f32";
        } else {
            finalMessage = `Reps: ${reps}. Level: Beginner! Keep training!`;
            finalColor = "#ffffff";
        }

    } else {
        // Using weights
        const weight = weightValue.valueAsNumber;
        
        // Validation for barbell
        if (isNaN(weight) || weight <= 0) {
            results.textContent = "Please enter the barbell weight!";
            results.style.color = "red";
            return;
        }

        const limits = standards[selectedGender][selectedExercise];
        const score = weight * (1 + reps / 30);
        let relativeStrength = Math.round((score / userWeightNumber) * 100) / 100;

        let description = "";
        if (relativeStrength >= limits.elite) {
            description = "Incredible, almost superhuman strength, 0.1% of the population! Keep the gold!";
            finalColor = "#ffd700";
        } else if (relativeStrength >= limits.advanced) {
            description = "This puts you at advanced level. Congratulations, you've earned a silver medal!";
            finalColor = "#c0c0c0";
        } else if (relativeStrength >= limits.intermediate) {
            description = "You're at an intermediate level. A good foundation for further development! You receive a bronze medal.";
            finalColor = "#cd7f32";
        } else {
            description = "This classifies you as a beginner. Don't worry, everyone was a beginner at some point!";
            finalColor = "#ffffff";
        }
        
        finalMessage = `Max: ${score.toFixed(2)}kg. Ratio: ${relativeStrength.toFixed(2)}. ${description}`;
    }

    // 5. One-time assignment of results to the DOM
    results.textContent = finalMessage;
    results.style.color = finalColor;
}

// Listeners
exerciseType.addEventListener('change', hideWeight);
btnCalc.addEventListener("click", calculateScore);
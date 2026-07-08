const gameData = {
    "🌱 Personality & Daily Life": [
        "What do you think people usually misunderstand about you?",
        "What's something that always makes your day better?",
        "What kind of person do you naturally get along with?",
        "What's one habit you're trying to improve?",
        "What makes you feel genuinely at peace?"
    ],
    "💭 Values & Beliefs": [
        "What are three values you refuse to compromise on?",
        "What does a successful life look like to you?",
        "If you had to choose between happiness and success, which would you prioritize and why?",
        "What's one life lesson you learned the hard way?",
        "What kind of legacy do you hope to leave someday?"
    ],
    "❤️ Love & Relationships": [
        "What made you realize you were ready to date again?",
        "What makes someone stand out as a potential partner to you?",
        "How do you usually show that you care about someone?",
        "What makes you feel most appreciated in a relationship?",
        "What's something you never want to experience again in a relationship?"
    ],
    "🗣️ Communication & Conflict": [
        "When you're upset, do you prefer space or someone checking in on you?",
        "How do you usually handle misunderstandings?",
        "What's the best apology someone has ever given you?",
        "What would make you lose trust in someone?",
        "If we had a disagreement, how would you want us to solve it?"
    ],
    "👨‍👩‍👧 Family & Friends": [
        "Who has influenced your life the most?",
        "How close are you with your family?",
        "What kind of friendships do you value the most?",
        "What's something your family taught you that you'll always carry with you?",
        "If your friends described you in three words, what would they say?"
    ],
    "🌍 Dreams & Future": [
        "Where do you see yourself five years from now?",
        "Is there something you've always wanted to do but haven't yet?",
        "Would you rather settle in the city or somewhere peaceful? Why?",
        "What's one dream you're not willing to give up?",
        "What motivates you to keep going during difficult times?"
    ],
    "💌 Getting to Know": [
        "What was your first impression of me, and has it changed?",
        "What's something you'd like to know about me that you haven't asked yet?",
        "What's one thing you hope a future partner understands about you?",
        "What kind of memories do you hope to create with someone you love?",
        "If we continued getting to know each other, what would you want us to experience together?"
    ],
    "🌙 Deep Conversations": [
        "What's something you've never told many people about yourself?",
        "What scares you the most when it comes to relationships?",
        "What do you think love should feel like?",
        "What's one promise you'd make to your future partner?",
        "After everything we've talked about so far, do you think our values and goals align? Why or why not?"
    ]
};

// DOM Elements
const viewCategories = document.getElementById('view-categories');
const viewNumbers = document.getElementById('view-numbers');
const viewQuestion = document.getElementById('view-question');
const categoryGrid = document.getElementById('category-grid');
const numberGrid = document.getElementById('number-grid');
const backBtn = document.getElementById('back-btn');
const flipCardContainer = document.getElementById('card-container');
const flipCard = document.getElementById('flip-card');
const cardNumberDisplay = document.getElementById('card-number-display');
const questionText = document.getElementById('question-text');

let currentCategory = null;

// Initialize App
function init() {
    // Render Categories
    Object.keys(gameData).forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'btn-card';
        btn.textContent = category;
        btn.onclick = () => selectCategory(category);
        categoryGrid.appendChild(btn);
    });
}

function switchView(hideView, showView, showBackBtn = true) {
    hideView.classList.add('hidden');
    hideView.classList.remove('active');
    showView.classList.remove('hidden');
    showView.classList.add('active');
    
    if (showBackBtn) {
        backBtn.classList.remove('hidden');
    } else {
        backBtn.classList.add('hidden');
    }
}

function selectCategory(category) {
    currentCategory = category;
    numberGrid.innerHTML = ''; // Clear previous numbers
    
    // Generate numbers based on question count in that category
    gameData[category].forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn-card';
        btn.textContent = index + 1;
        btn.onclick = () => selectNumber(index);
        numberGrid.appendChild(btn);
    });

    switchView(viewCategories, viewNumbers);
}

function selectNumber(index) {
    const question = gameData[currentCategory][index];
    cardNumberDisplay.textContent = index + 1;
    questionText.textContent = question;
    
    // Reset flip state before showing
    flipCard.classList.remove('flipped');
    
    switchView(viewNumbers, viewQuestion);
}

// Handle Back Button
backBtn.onclick = () => {
    if (viewQuestion.classList.contains('active')) {
        switchView(viewQuestion, viewNumbers);
    } else if (viewNumbers.classList.contains('active')) {
        switchView(viewNumbers, viewCategories, false);
        currentCategory = null;
    }
};

// Handle Card Flip
flipCardContainer.onclick = () => {
    flipCard.classList.toggle('flipped');
};

// Run initialize
init();

// --- Floating Background Logic ---
const floatingBg = document.getElementById('floating-bg');
const emotes = ['☕', '🥐', '🍪'];

function createFloatingItem() {
    const item = document.createElement('div');
    item.classList.add('floating-item');
    
    // Pick a random emote
    item.textContent = emotes[Math.floor(Math.random() * emotes.length)];
    
    // Randomize position, size, and animation duration
    const randomLeft = Math.random() * 100; // 0 to 100vw
    const randomSize = Math.random() * 1.5 + 1; // 1rem to 2.5rem
    const randomDuration = Math.random() * 5 + 6; // 6s to 11s
    
    item.style.left = `${randomLeft}vw`;
    item.style.fontSize = `${randomSize}rem`;
    item.style.animationDuration = `${randomDuration}s`;
    
    floatingBg.appendChild(item);
    
    // Remove the element from the DOM after its animation finishes
    setTimeout(() => {
        item.remove();
    }, randomDuration * 1000);
}

// Spawn a new floating item every 800 milliseconds
setInterval(createFloatingItem, 100);
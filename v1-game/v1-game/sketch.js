// ========== DATA STRUCTURE ==========
// This is where ALL your questions live
const questions = [
    // Add questions here
  {
    id: 1,
    question: "What type of animal\nwould you like to foster?",
    buttons: [
      { text: "Dogs only", value: "dog" },
      { text: "Cats only", value: "cat" },
      { text: "Either one — I love them both!", value: "other" }
    ],
    whyMatters: "placeholder link or info here"
  },
  
 {
    id: 2,
    question: "What age range\ninterests you most?",
    buttons: [
      { text: "Neonatal / Young (0–6 months)", value: "young" },
      { text: "Adult (7 months-7 years)", value: "adult" },
      { text: "Senior (7+ years)", value: "senior" }
    ],
    whyMatters: "placeholder link or info here"
  },
  
  {
    id: 3,
    question: "What size animal\nworks for your space?",
    buttons: [
      { text: "Small (under 25 lbs)", value: "small" },
      { text: "Medium (25–50 lbs)", value: "medium" },
      { text: "Large (50+ lbs)", value: "large" },
      { text: "Any size", value: "any" }
    ],
    whyMatters: "placeholder link or info here"
  },
  
   {
    id: 4,
    question: "What activity level\nmatches your lifestyle?",
    buttons: [
      { text: "Low\n(calm, senior, or recovering)", value: "low" },
      { text: "Moderate\n(average activity, some playtime)", value: "moderate" },
      { text: "High\n(young, very active)", value: "high" },
      { text: "I can adapt to\nany energy level", value: "any" }
    ],
    whyMatters: "placeholder link or info here"
  },
  
   {
    id: 5,
    question: "How much time can you spend\nwith a foster pet each day?",
    buttons: [
      { text: "More than 4 hours", value: "4+" },
      { text: "1–3 hours", value: "1–3" },
      { text: "Less than 1 hour", value: "-1" },
      { text: "Not sure yet", value: "uncertain" }
    ],
    whyMatters: "placeholder link or info here"
  }   
];

// ========== GLOBAL VARIABLES ==========
let GAMESTATE = "MENU";  // Can be: "MENU", "QUESTIONS", "RESULTS"
let currentQuestionIndex = 0;  // Which question we're on (starts at 0)
let userAnswers = [];  // Stores all the user's answers
let infoBadgeImg;
let rotationAngle = 0;

// ========== PRELOAD & SETUP ==========
function preload() {
  infoBadgeImg = loadImage('badge-image.png');
}

function setup() {
  createCanvas(1440, 1024);
  textFont('Arial');
}

// ========== MAIN DRAW LOOP ==========
function draw() {
  background(235, 100, 36);
  
  // This is like a traffic controller - it decides which page to show
  if (GAMESTATE === "MENU") {
    drawMenu();
  } else if (GAMESTATE === "QUESTIONS") {
    drawQuestion();
  } else if (GAMESTATE === "RESULTS") {
    drawResults();
  }
  
  // Update cursor when hovering over info badge
  updateCursor();
}

// ========== DRAW FUNCTIONS ==========
// Each "page" of your game gets its own function

function drawMenu() {
  textAlign(CENTER, CENTER);
  textSize(125);
  fill(255, 201, 229);
  text("Ready to Foster?", 720, 240);
  
  textSize(40);
  fill(255);
  text("Ready to see what fostering's all about?", 720, 390);
  
  textSize(30);
  text("Step into real-life-inspired scenarios, make choices,", 720, 450);
  text("and discover how fostering could fit into your world.", 720, 492);
  
  // Draw START button
  drawStartButton();
  
  // Footnote
  fill(255);
  textSize(23);
  textStyle(ITALIC);
  text(
    "(These situations are realistic but not exact — every fostering story is unique!)",
    720, 815
  );
}

function drawQuestion() {
  background(255, 182, 193); // Pink background
  
  // Get the current question from our list
  let currentQ = questions[currentQuestionIndex];
  
  // Draw question text
  textAlign(CENTER, CENTER);
  textSize(90);
  fill(235, 100, 36);
  textStyle(NORMAL);
  
  let lines = currentQ.question.split('\n');
  let startY = 230;
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], 720, startY + (i * 100));
  }
  
  // Draw all the answer buttons for this question
  drawAnswerButtons(currentQ);
  
  // Draw the rotating "Why does this matter?" badge
  drawInfoBadge();
}

function drawResults() {
  // This is a placeholder - you'll build this later!
  background(255, 182, 193);
  textAlign(CENTER, CENTER);
  textSize(60);
  fill(235, 100, 36);
  text("Results Page - Coming Soon!", 720, 400);
  
  textSize(30);
  fill(0);
  text("Your answers: " + userAnswers.join(", "), 720, 500);
}

// ========== BUTTON DRAWING FUNCTIONS ==========

function drawStartButton() {
  let buttonX = 720;
  let buttonY = 630;
  let buttonWidth = 265;
  let buttonHeight = 80;
  
  // Check if mouse is hovering
  let isHovering = mouseX > buttonX - buttonWidth/2 &&
                   mouseX < buttonX + buttonWidth/2 &&
                   mouseY > buttonY - buttonHeight/2 &&
                   mouseY < buttonY + buttonHeight/2;
  
  // Change color based on hover
  if (isHovering) {
    fill(247, 194, 202);
  } else {
    fill(221, 223, 95);
  }
  
  noStroke();
  rectMode(CENTER);
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 40);
  
  // Button text
  fill(235, 100, 36);
  textSize(60);
  textStyle(BOLD);
  text("START", buttonX, buttonY + 5);
}

function drawAnswerButtons(question) {
  textSize(32);
  textStyle(NORMAL);
  rectMode(CENTER);
  
  // Position buttons based on how many there are
  let positions = getButtonPositions(question.buttons.length);
  
  for (let i = 0; i < question.buttons.length; i++) {
    let btn = question.buttons[i];
    let pos = positions[i];
    
    let buttonWidth = 430;
    let buttonHeight = 80;
    
    // Check if mouse is hovering over this button
    let isHovering = mouseX > pos.x - buttonWidth/2 &&
                     mouseX < pos.x + buttonWidth/2 &&
                     mouseY > pos.y - buttonHeight/2 &&
                     mouseY < pos.y + buttonHeight/2;
    
    // Change color on hover
    if (isHovering) {
      fill(80, 180, 180);
    } else {
      fill(110, 200, 195);
    }
    
    noStroke();
    rect(pos.x, pos.y, buttonWidth, buttonHeight, 40);
    
    // Button text
    fill(255);
    text(btn.text, pos.x, pos.y);
  }
}

function drawInfoBadge() {
  let badgeX = 1180;
  let badgeY = 115;
  let badgeSize = 140;
  
  push();
  translate(badgeX, badgeY);
  rotate(rotationAngle);
  imageMode(CENTER);
  image(infoBadgeImg, 0, 0, badgeSize, badgeSize);
  pop();
  
  rotationAngle += 0.02;
}

// ========== HELPER FUNCTIONS ==========

function getButtonPositions(numButtons) {
  // This function returns the x, y positions for buttons
  // For now, hardcoded for your 3-button layout
  // You can make this smarter later!
  if (numButtons === 3) {
    return [
      { x: 385, y: 512 },   // Left button
      { x: 915, y: 512 },   // Right button
      { x: 635, y: 626 }    // Bottom center button
    ];
  } else if (numButtons === 2) {
    return [
      { x: 520, y: 512 },   // Left button
      { x: 920, y: 512 }    // Right button
    ];
   } else if (numButtons === 4) {
    return [
      { x: 385, y: 512 },   // Top left
      { x: 915, y: 512 },   // Top right
      { x: 385, y: 626 },   // Bottom left
      { x: 915, y: 626 }    // Bottom right
    ];
  }   
  // Add more layouts as needed
}

function updateCursor() {
  if (GAMESTATE === "QUESTIONS") {
    let d = dist(mouseX, mouseY, 1180, 115);
    if (d < 70) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
  }
}

// ========== CLICK HANDLING ==========

function mousePressed() {
  if (GAMESTATE === "MENU") {
    handleMenuClick();
  } else if (GAMESTATE === "QUESTIONS") {
    handleQuestionClick();
  } else if (GAMESTATE === "RESULTS") {
    handleResultsClick();
  }
}

function handleMenuClick() {
  // Check if START button was clicked
  let buttonX = 720;
  let buttonY = 630;
  let buttonWidth = 265;
  let buttonHeight = 80;
  
  if (mouseX > buttonX - buttonWidth/2 &&
      mouseX < buttonX + buttonWidth/2 &&
      mouseY > buttonY - buttonHeight/2 &&
      mouseY < buttonY + buttonHeight/2) {
    GAMESTATE = "QUESTIONS";
    currentQuestionIndex = 0;
    userAnswers = [];
  }
}

function handleQuestionClick() {
  // Check if info badge was clicked
  let d = dist(mouseX, mouseY, 1180, 115);
  if (d < 70) {
    console.log("Info badge clicked - placeholder");
    return;
  }
  
  // Check which answer button was clicked
  let currentQ = questions[currentQuestionIndex];
  let positions = getButtonPositions(currentQ.buttons.length);
  
  for (let i = 0; i < currentQ.buttons.length; i++) {
    let btn = currentQ.buttons[i];
    let pos = positions[i];
    let buttonWidth = 430;
    let buttonHeight = 80;
    
    if (mouseX > pos.x - buttonWidth/2 &&
        mouseX < pos.x + buttonWidth/2 &&
        mouseY > pos.y - buttonHeight/2 &&
        mouseY < pos.y + buttonHeight/2) {
      
      // Save the answer
      userAnswers.push(btn.value);
      console.log("Clicked:", btn.text);
      
      // Move to next question or results
      currentQuestionIndex++;
      if (currentQuestionIndex >= questions.length) {
        GAMESTATE = "RESULTS";
      }
    }
  }
}

function handleResultsClick() {
  // Placeholder for results page interactions
}
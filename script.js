/* =========================================================
   SCENE SYSTEM
========================================================= */

const scenes = [
  ...document.querySelectorAll(".scene")
];

const progress =
  document.getElementById("progressBar");

let current = 1;


/* =========================================================
   GO TO SCENE
========================================================= */

function goTo(number) {

  const target =
    document.getElementById(`scene${number}`);

  if (!target) {
    console.error(
      `Scene ${number} tidak ditemukan!`
    );

    return;
  }


  scenes.forEach(scene => {
    scene.classList.remove("active");
  });


  target.classList.add("active");


  current = number;


  const sceneIndex =
    Array.from(scenes).indexOf(target) + 1;


  if (progress) {

    progress.style.width =
      `${(sceneIndex / scenes.length) * 100}%`;

  }


  /* =========================
     RESET GAME
  ========================= */

  if (String(number) === "5game") {

    if (typeof resetGame === "function") {
      resetGame();
    }

  }

}


/* =========================================================
   NEXT BUTTONS
========================================================= */

document
  .querySelectorAll("[data-next]")
  .forEach(button => {

    button.addEventListener("click", () => {

      const next =
        button.dataset.next;

      goTo(next);

    });

  });


/* =========================================================
   SCENE 1 — NO BUTTON
========================================================= */

const noBtn =
  document.getElementById("noBtn");


if (noBtn) {

  noBtn.addEventListener(
    "mouseenter",
    () => {

      const maxX = 120;
      const maxY = 60;


      const x =
        Math.random() * maxX * 2 - maxX;


      const y =
        Math.random() * maxY * 2 - maxY;


      noBtn.style.transform =
        `translate(${x}px, ${y}px)`;

    }
  );


  noBtn.addEventListener(
    "click",
    () => {

      noBtn.innerText =
        "hehe nope 😭";

    }
  );

}


/* =========================================================
   SCENE 1 — BUNNY HOVER
========================================================= */

const yesBtn =
  document.getElementById("yesBtn");

const bunny =
  document.getElementById("bunny");


if (yesBtn && bunny) {

  yesBtn.addEventListener(
    "mouseenter",
    () => {

      bunny.src =
        "stickers/ava2.png";

    }
  );


  yesBtn.addEventListener(
    "mouseleave",
    () => {

      bunny.src =
        "stickers/ava1.png";


      bunny.animate(
        [
          {
            transform: "translateY(0)"
          },

          {
            transform: "translateY(-8px)"
          },

          {
            transform: "translateY(0)"
          }

        ],
        {
          duration: 350,
          easing: "ease-out"
        }
      );

    }
  );

}


/* =========================================================
   SCENE 3 — MEMORY POLAROIDS
========================================================= */

const photos =
  document.querySelectorAll(".polaroid");


const photoHint =
  document.getElementById("photoHint");


const memoryNext =
  document.getElementById("memoryNext");


let openedPhotos = 0;


photos.forEach(photo => {

  photo.addEventListener(
    "click",
    () => {

      if (
        photo.classList.contains("opened")
      ) {

        return;

      }


      photo.classList.add("opened");


      openedPhotos++;


      const caption =
        photo.dataset.caption || "";


      const modal =
        document.getElementById("modal");


      const modalText =
        document.getElementById("modalText");


      if (modal && modalText) {

        modalText.innerText =
          caption;


        modal.classList.remove(
          "hidden"
        );

      }


      if (photoHint) {

        photoHint.innerText =
          `${openedPhotos} / ${photos.length} opened ♡`;

      }


      if (
        openedPhotos === photos.length
      ) {

        if (photoHint) {

          photoHint.innerText =
            "you found them all ♡";

        }


        if (memoryNext) {

          memoryNext.classList.remove(
            "hidden"
          );

        }

      }

    }
  );

});


/* =========================================================
   MODAL
========================================================= */

const modal =
  document.getElementById("modal");


const closeModal =
  document.getElementById("closeModal");


if (closeModal && modal) {

  closeModal.addEventListener(
    "click",
    () => {

      modal.classList.add(
        "hidden"
      );

    }
  );

}


if (modal) {

  modal.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        modal.classList.add(
          "hidden"
        );

      }

    }
  );

}


/* =========================================================
   SCENE 4 — NOTES
========================================================= */

const notes =
  document.querySelectorAll(".note");


const noteCount =
  document.getElementById("noteCount");


const notesNext =
  document.getElementById("notesNext");


let openedNotes = 0;


notes.forEach(note => {

  note.addEventListener(
    "click",
    () => {

      if (
        note.classList.contains("opened")
      ) {

        return;

      }


      note.classList.add("opened");


      openedNotes++;


      const message =
        note.dataset.message || "";


      const modal =
        document.getElementById("modal");


      const modalText =
        document.getElementById("modalText");


      if (modal && modalText) {

        modalText.innerText =
          message;


        modal.classList.remove(
          "hidden"
        );

      }


      if (noteCount) {

        noteCount.innerText =
          `${openedNotes} / ${notes.length} opened`;

      }


      if (
        openedNotes === notes.length
      ) {

        if (noteCount) {

          noteCount.innerText =
            "you opened everything ♡";

        }


        if (notesNext) {

          notesNext.classList.remove(
            "hidden"
          );

        }

      }

    }
  );

});


/* =========================================================
   SCENE 5 — LDR PLANE
========================================================= */

const plane =
  document.getElementById("plane");


if (plane) {

  plane.addEventListener(
    "animationiteration",
    () => {

      plane.style.transform =
        "translateX(-95px)";

    }
  );

}


/* =========================================================
   BUNNY DELIVERY GAME
========================================================= */

const gameScene =
  document.getElementById(
    "scene5game"
  );


const gameArea =
  gameScene?.querySelector(
    ".bunny-game"
  );


const gameBunny =
  document.getElementById(
    "gameBunny"
  );


const moveLeftBtn =
  document.getElementById(
    "moveLeft"
  );


const moveRightBtn =
  document.getElementById(
    "moveRight"
  );


const gameWin =
  document.getElementById(
    "gameWin"
  );


const gameNext =
  document.getElementById(
    "gameNext"
  );


const gameInstruction =
  document.getElementById(
    "gameInstruction"
  );


const gameHearts =
  document.getElementById(
    "gameHearts"
  );


/* =========================================================
   GAME VARIABLES
========================================================= */

let bunnyPosition = 35;

let bunnyBottom = 57;

let gameFinished = false;

let hearts = 3;


/* =========================================================
   MOVEMENT
========================================================= */

const bunnySpeed = 5;


/* =========================================================
   KEY STATES
========================================================= */

const keys = {
  left: false,
  right: false
};


/* =========================================================
   JUMP PHYSICS
========================================================= */

let isJumping = false;

let jumpVelocity = 0;

const gravity = 0.8;

const jumpPower = 14;

const groundBottom = 57;

let gameLoopId = null;


/* =========================================================
   OBSTACLES
========================================================= */

const obstacles =
  document.querySelectorAll(
    ".game-obstacle"
  );


/* =========================================================
   CREATE JUMP BUTTON
========================================================= */

let jumpBtn = null;


if (gameArea) {

  const controls =
    gameArea.querySelector(
      ".game-controls"
    );


  if (controls) {

    jumpBtn =
      document.createElement(
        "button"
      );


    jumpBtn.type =
      "button";


    jumpBtn.id =
      "jumpBtn";


    jumpBtn.className =
      "game-control jump-control";


    jumpBtn.innerText =
      "JUMP ↑";


    controls.appendChild(
      jumpBtn
    );

  }

}


/* =========================================================
   UPDATE BUNNY VISUAL
========================================================= */

function updateBunny() {

  if (!gameBunny) {
    return;
  }


  gameBunny.style.left =
    `${bunnyPosition}px`;


  gameBunny.style.bottom =
    `${bunnyBottom}px`;


  if (isJumping) {

    gameBunny.classList.add(
      "jumping"
    );

  } else {

    gameBunny.classList.remove(
      "jumping"
    );

  }


  checkCollisions();

}


/* =========================================================
   MOVE BUNNY
========================================================= */

function moveBunny(direction) {

  if (
    !gameBunny ||
    gameFinished
  ) {

    return;

  }


  const gameWidth =
    gameArea?.clientWidth || 900;


  const bunnyWidth =
    gameBunny.offsetWidth || 80;


  if (direction === "left") {

    bunnyPosition -=
      bunnySpeed;

  }


  if (direction === "right") {

    bunnyPosition +=
      bunnySpeed;

  }


  /* Jangan keluar arena */

  if (bunnyPosition < 0) {

    bunnyPosition = 0;

  }


  const maxPosition =
    gameWidth -
    bunnyWidth -
    8;


  if (
    bunnyPosition > maxPosition
  ) {

    bunnyPosition =
      maxPosition;

  }

}


/* =========================================================
   JUMP
========================================================= */

function jumpBunny() {

  if (
    !gameBunny ||
    gameFinished
  ) {

    return;

  }


  /* Tidak boleh double jump */

  if (isJumping) {

    return;

  }


  isJumping = true;

  jumpVelocity =
    jumpPower;

}


/* =========================================================
   GAME PHYSICS LOOP
========================================================= */

function gamePhysics() {

  if (
    !gameBunny ||
    gameFinished ||
    current !== "5game"
  ) {

    gameLoopId =
      requestAnimationFrame(
        gamePhysics
      );

    return;

  }


  /* =========================
     MOVEMENT
  ========================= */

  if (keys.left) {

    moveBunny(
      "left"
    );

  }


  if (keys.right) {

    moveBunny(
      "right"
    );

  }


  /* =========================
     JUMP PHYSICS
  ========================= */

  if (isJumping) {

    bunnyBottom +=
      jumpVelocity;


    jumpVelocity -=
      gravity;


    /* Kembali ke tanah */

    if (
      bunnyBottom <=
      groundBottom
    ) {

      bunnyBottom =
        groundBottom;


      jumpVelocity =
        0;


      isJumping =
        false;

    }

  }


  updateBunny();


  gameLoopId =
    requestAnimationFrame(
      gamePhysics
    );

}


/* =========================================================
   START GAME LOOP
========================================================= */

gameLoopId =
  requestAnimationFrame(
    gamePhysics
  );


/* =========================================================
   HOLD BUTTON CONTROL
========================================================= */

function addHoldControl(
  button,
  direction
) {

  if (!button) {
    return;
  }


  const start =
    event => {

      event.preventDefault();


      keys[direction] =
        true;


      if (
        button.setPointerCapture &&
        event.pointerId !== undefined
      ) {

        try {

          button.setPointerCapture(
            event.pointerId
          );

        } catch (error) {}

      }

    };


  const stop =
    event => {

      if (
        event &&
        event.preventDefault
      ) {

        event.preventDefault();

      }


      keys[direction] =
        false;

    };


  button.addEventListener(
    "pointerdown",
    start
  );


  button.addEventListener(
    "pointerup",
    stop
  );


  button.addEventListener(
    "pointercancel",
    stop
  );


  button.addEventListener(
    "lostpointercapture",
    stop
  );

}


/* =========================================================
   MOBILE MOVE BUTTONS
========================================================= */

addHoldControl(
  moveLeftBtn,
  "left"
);


addHoldControl(
  moveRightBtn,
  "right"
);


/* =========================================================
   JUMP BUTTON
========================================================= */

if (jumpBtn) {

  jumpBtn.addEventListener(
    "pointerdown",
    event => {

      event.preventDefault();

      jumpBunny();

    }
  );

}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      current !== "5game" ||
      gameFinished
    ) {

      return;

    }


    const key =
      event.key.toLowerCase();


    /* =========================
       RIGHT
    ========================= */

    if (
      event.key === "ArrowRight" ||
      key === "d"
    ) {

      event.preventDefault();

      keys.right =
        true;

    }


    /* =========================
       LEFT
    ========================= */

    if (
      event.key === "ArrowLeft" ||
      key === "a"
    ) {

      event.preventDefault();

      keys.left =
        true;

    }


    /* =========================
       JUMP
    ========================= */

    if (
      event.key === " " ||
      event.key === "ArrowUp" ||
      key === "w"
    ) {

      event.preventDefault();


      if (!event.repeat) {

        jumpBunny();

      }

    }

  }
);


/* =========================================================
   KEYBOARD RELEASE
========================================================= */

document.addEventListener(
  "keyup",
  event => {

    const key =
      event.key.toLowerCase();


    if (
      event.key === "ArrowRight" ||
      key === "d"
    ) {

      keys.right =
        false;

    }


    if (
      event.key === "ArrowLeft" ||
      key === "a"
    ) {

      keys.left =
        false;

    }

  }
);


/* =========================================================
   COLLISION DETECTION
========================================================= */

function isCollision(
  elementA,
  elementB
) {

  if (
    !elementA ||
    !elementB
  ) {

    return false;

  }


  const a =
    elementA.getBoundingClientRect();


  const b =
    elementB.getBoundingClientRect();


  const horizontalPadding =
    12;


  const verticalPadding =
    7;


  return !(
    a.right - horizontalPadding <
      b.left ||

    a.left + horizontalPadding >
      b.right ||

    a.bottom - verticalPadding <
      b.top ||

    a.top + verticalPadding >
      b.bottom
  );

}


/* =========================================================
   CHECK COLLISIONS
========================================================= */

function checkCollisions() {

  if (
    gameFinished ||
    !gameBunny
  ) {

    return;

  }


  /* =========================
     OBSTACLES
  ========================= */

  obstacles.forEach(
    obstacle => {

      if (
        obstacle.dataset.hit ===
        "true"
      ) {

        return;

      }


      if (
        isCollision(
          gameBunny,
          obstacle
        )
      ) {

        obstacle.dataset.hit =
          "true";


        loseHeart();


        setTimeout(
          () => {

            obstacle.dataset.hit =
              "false";

          },
          800
        );

      }

    }
  );


  /* =========================
     HOUSE
  ========================= */

  const house =
    document.querySelector(
      ".birthday-house"
    );


  if (
    house &&
    isCollision(
      gameBunny,
      house
    )
  ) {

    winGame();

  }

}


/* =========================================================
   LOSE HEART
========================================================= */

function loseHeart() {

  if (gameFinished) {
    return;
  }


  hearts--;

  updateHearts();


  if (gameBunny) {

    gameBunny.classList.remove(
      "bunny-hit"
    );


    void gameBunny.offsetWidth;


    gameBunny.classList.add(
      "bunny-hit"
    );

  }


  /* Mundur sedikit */

  bunnyPosition -=
    25;


  if (bunnyPosition < 0) {

    bunnyPosition = 0;

  }


  updateBunny();


  /* =========================
     GAME OVER
  ========================= */

  if (hearts <= 0) {

    gameFinished =
      true;


    keys.left =
      false;


    keys.right =
      false;


    setTimeout(
      () => {

        resetGame();


        if (gameInstruction) {

          gameInstruction.innerText =
            "oops! try again ♡";

        }

      },
      500
    );

  }

}


/* =========================================================
   UPDATE HEARTS
========================================================= */

function updateHearts() {

  if (!gameHearts) {
    return;
  }


  let output =
    "";


  for (
    let i = 0;
    i < 3;
    i++
  ) {

    if (i < hearts) {

      output +=
        "♡ ";

    } else {

      output +=
        "· ";

    }

  }


  gameHearts.innerText =
    output.trim();

}


/* =========================================================
   WIN GAME
========================================================= */

function winGame() {

  if (gameFinished) {
    return;
  }


  gameFinished =
    true;


  keys.left =
    false;


  keys.right =
    false;


  isJumping =
    false;


  bunnyBottom =
    groundBottom;


  if (gameInstruction) {

    gameInstruction.innerText =
      "delivery complete ♡";

  }


  if (gameWin) {

    gameWin.classList.remove(
      "hidden"
    );

  }

}


/* =========================================================
   RESET GAME
========================================================= */

function resetGame() {

  bunnyPosition =
    35;


  bunnyBottom =
    groundBottom;


  isJumping =
    false;


  jumpVelocity =
    0;


  hearts =
    3;


  gameFinished =
    false;


  /* Reset input */

  keys.left =
    false;


  keys.right =
    false;


  if (gameBunny) {

    gameBunny.style.left =
      `${bunnyPosition}px`;


    gameBunny.style.bottom =
      `${bunnyBottom}px`;


    gameBunny.classList.remove(
      "bunny-hit",
      "jumping"
    );

  }


  if (gameWin) {

    gameWin.classList.add(
      "hidden"
    );

  }


  if (gameInstruction) {

    gameInstruction.innerText =
      "← → move · JUMP to avoid obstacles";

  }


  updateHearts();


  obstacles.forEach(
    obstacle => {

      obstacle.dataset.hit =
        "false";

    }
  );


  updateBunny();

}

/* =========================================================
   GAME NEXT → GIFT
========================================================= */

if (gameNext) {

  gameNext.addEventListener(
    "click",
    () => {

      console.log(
        "GAME SELESAI → GIFT"
      );

      goTo(6);

    }
  );

}


/* =========================================================
   GIFT
========================================================= */

const giftBtn =
  document.getElementById(
    "giftBtn"
  );


if (giftBtn) {

  giftBtn.addEventListener(
    "click",
    () => {

      console.log(
        "KADO DIKLIK!"
      );


      /* buka kado */

      giftBtn.classList.add(
        "open"
      );


      /* pindah ke cake */

      setTimeout(
        () => {

          console.log(
            "PINDAH KE SCENE 7"
          );


          goTo(7);

        },
        900
      );

    }
  );

}

/* =========================================================
   MUSIC
========================================================= */

const musicBtn =
  document.getElementById(
    "musicBtn"
  );


const bgMusic =
  document.getElementById(
    "bgMusic"
  );


let musicPlaying =
  false;


if (
  musicBtn &&
  bgMusic
) {

  musicBtn.addEventListener(
    "click",
    async () => {

      /* =========================
         PAUSE
      ========================= */

      if (musicPlaying) {

        bgMusic.pause();


        musicPlaying =
          false;


        musicBtn.innerText =
          "♫";


      }

      /* =========================
         PLAY
      ========================= */

      else {

        try {

          await bgMusic.play();


          musicPlaying =
            true;


          musicBtn.innerText =
            "❚❚";


        }

        catch (error) {

          console.log(
            "Music belum bisa diputar:",
            error
          );

        }

      }

    }
  );

}
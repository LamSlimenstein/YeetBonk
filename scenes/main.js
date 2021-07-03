const PIPE_OPEN = 2;
const PIPE_MIN_HEIGHT = 20;
const JUMP_FORCE = 320;
const SPEED = 69;

gravity(1200);

layers([
	"ez",
	"obj",
	"ui",
], "obj");

add([
	sprite("ez"),
	scale(width() / 240, height() / 240),
	layer("ez"),
]);

const ape = add([
  sprite("GreatApev0"),
  scale(.3),
  pos(50, 0),
  body(),
]);

ape.action(() => {
	if (ape.pos.y >= height()) {
		// switch to "death" scene
		go("death", {
			score: score.value,
		});
	}
});

keyPress("space", () => {
  ape.jump(JUMP_FORCE);
  play("wooosh");
});

function spawnBonk() {

  const h1 = rand(PIPE_MIN_HEIGHT, height() - PIPE_MIN_HEIGHT - PIPE_OPEN);
  const h2 = h1 + PIPE_OPEN;

  add([
    sprite("bonk"),
    scale(.01),
    origin("botleft"),
    pos(width(), h1),
    "bonk",
  ]);

  add([
    sprite("bonk"),
    scale(.01),
    origin("botleft"),
    scale(1, -1),
    pos(width(), h2),
    "bonk",
    { passed: false, },
  ]);

}


ape.collides("bonk", () => {
  go("death", {
    score: score.value,
  });
  play("hit");
});

action("bonk", (p) => {
  p.move(-SPEED, 0);

  if (p.pos.x + p.width <= ape.pos.x && p.passed === false) {
    addScore();
    p.passed = true;
  }

  if (p.pos.x < -width() / 2) {
    destroy(p);
  }
});

loop(1, () => {
  spawnBonk();
});

const score = add([
  text("0", 16),
  layer("ui"),
  pos(9, 9),
  {
    value: 0,
  },
]);

function addScore() {
  score.value++;
  score.text = score.value;
  play("score");
}
const PIPE_MIN_HEIGHT = 4;
const JUMP_FORCE = 320;
const SPEED = 69420;

gravity(1200);

layers([
	"ez",
	"obj",
	"ui",
], "obj");

add([
	sprite("ez"),
  pos(width() / 2, height() / 2),
  origin("center"),
	layer("ez"),
]);

const ape = add([
  sprite("GreatApev0"),
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

  const h1 = rand(PIPE_MIN_HEIGHT, height() - PIPE_MIN_HEIGHT);
  const h2 = h1 * 2;

  add([
    sprite("bonk"),
    scale(.006),
    origin("botleft"),
    pos(width(), h1),
    "bonk",
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

  if (p.pos.x <= ape.pos.x) {
    score.value++;
    score.text = score.value;
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
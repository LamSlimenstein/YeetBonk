add([
  text(`${args.score}`, 64),
  pos(width() / 2, height() / 2),
  origin("center"),
]);
keyPress("space", () => {
  go("main");
});
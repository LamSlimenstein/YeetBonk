
 
add([
  sprite("bg"),
  text(`${args.score}`, 128),
  pos(width() / 2, height() / 2),
  origin("center"),
]);
keyPress("space", () => {
  go("ready");
});

add([
  text('rekt'),
  pos(width() - 181 , height() - 29 ),
  origin("topleft"),
])


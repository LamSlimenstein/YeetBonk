
 
add([
  sprite("bg"),
  text(`${args.score}`, 128),

]);
keyPress("space", () => {
  go("ready");
});

add([
  text('rekt'),
  pos(width() - 181 , height() - 29 ),
  origin("topleft"),
])


/* Changes the Social icons when you hover over them */
//Linked In
$("#linkedIn").on("mouseenter", function() {
    $(this).attr("src", "images/linkinHover.png");
})
$("#linkedIn").on("mouseleave", function() {
    $(this).attr("src", "images/linkedin.png");
})

//Steam
$("#steam").on("mouseenter", function() {
    $(this).attr("src", "images/steamHover.png");
})
$("#steam").on("mouseleave", function() {
    $(this).attr("src", "images/steam.png");
})

//Discord
$("#discord").on("mouseenter", function() {
    $(this).attr("src", "images/discordHover.png");
})
$("#discord").on("mouseleave", function() {
    $(this).attr("src", "images/discord.png");
})
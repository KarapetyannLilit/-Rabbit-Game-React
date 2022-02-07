export const gameOver = (WIN) => {
    document.onkeydown = null;
    document.getElementById("myModal").style.display = "block";
    if (WIN) {
        document.querySelector(".modal-content").innerHTML = "You Won!";
    } else {
        document.querySelector(".modal-content").innerHTML = "You Lose!";
    }
}
export class View {
    static gameOver() {
        document.body.innerHTML = '<div id="game-over" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; background-color: rgba(0,0,0,0.5)"><h1 style="font-size: 50px">GAME OVER</h1><a style="font-size: 40px" onclick="window.location.reload()">Retry</a></div>'
    }
}
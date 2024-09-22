export class gameDriver{

    constructor(containerId = "game-container") {
        this.container = document.getElementById(containerId);
        this.mode = null;
    }

    driverInit() {
        let chooseModeContainer = document.createElement("div");

        chooseModeContainer.id = "chooseMode";

        let conatiner1 = document.createElement("div");

        let container2 = document.createElement("div");

        let titleElement = document.createElement("h3") 
        titleElement.textContent = "Choose Mode"
        conatiner1.appendChild(titleElement)
        chooseModeContainer.appendChild(conatiner1)
        chooseModeContainer.appendChild(container2)

        container2.classList.add("mode-container-2")

        let playerVsPlayerModeBtn = document.createElement("button");

        let playerVsAiBtn = document.createElement("button");

        playerVsPlayerModeBtn.textContent = "2 Players";
        playerVsAiBtn.textContent = "1 Player";

        container2.appendChild(playerVsPlayerModeBtn);
        container2.appendChild(playerVsAiBtn);

        this.container.append(chooseModeContainer);

        container2.addEventListener("click", (e)=> {
            let target = e.target;
            
            if(target.tagName.toLowerCase() == "button") {
                this.setMode(target.textContent);
                this.emptyContainer();
            }
        })
    }

    setMode(mode) {
        if (mode == "1 Player") {
            this.mode = "single"
        } else {
            this.mode = "double"
        }
    }

    emptyContainer() {
        this.container.textContent = ""
    }

    singlePlayerModeStart() {
        
    }
}
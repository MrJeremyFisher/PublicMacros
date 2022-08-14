// Change these, start in the NE corner facing E
// Made by MrJeremyFisher
farmLength = 107;
farmWidth = 107;
crop = "Wheat";
cropSeeds = "Wheat Seeds";

// No touchy

const inv = Player.openInventory();
const player = Player.getPlayer();
startingX = player.getX();
startingZ = player.getZ();
trueStartingX = player.getX();
trueStartingZ = player.getZ();
currentX = player.getX();
currentZ = player.getZ();


Chat.log("§aStarted Farming!");
World.playSound("block.note_block.pling", 1, 2);
farm();

player.getRaw().method_5814(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);

function farm() {
    let farming = true;
    while (farming) {
        KeyBind.keyBind('key.sneak', false);
        KeyBind.key("key.mouse.right", true);
        
        while (currentX < startingX + farmLength) {
            KeyBind.keyBind('key.forward', true);
            currentX = player.getX();
            player.lookAt(270, 75);
            Client.waitTick(1); 


            if (currentX >= trueStartingX + farmLength && !inv.getSlot(9).isEmpty()) {
                player.getRaw().method_5814(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);
                Client.waitTick(6);
                KeyBind.keyBind('key.forward', false);
                KeyBind.key("key.mouse.right", false);
                for (i = 9; i < 27; i++) {
                    Client.waitTick(4);
                    if (inv.getSlot(i).getName().getString() == crop) {
                        player.lookAt(270, 45);
                        inv.click(i);
                        Client.waitTick(1);
                        inv.click(-999);
                    } else if (inv.getSlot(i).getName().getString() == cropSeeds) {
                        player.lookAt(35, 0);
                        inv.click(i);
                        Client.waitTick(1);
                        inv.click(-999);
                    }
                }
            }
            startingZ = player.getZ();
        }


        while (currentZ > startingZ - 0.8) {
            currentZ = player.getZ();
            if (currentZ <= trueStartingZ - (farmWidth - 1)) {
                endScript();
                return;
            }

            KeyBind.key("key.mouse.right", false);
            Client.waitTick(1); 
            KeyBind.keyBind('key.sneak', true);
            player.lookAt(180, 0);
            KeyBind.keyBind('key.forward', true);
            Client.waitTick(1);
            KeyBind.keyBind('key.forward', false);
            currentX = player.getX();
            startingX = player.getX();
        }

        player.getRaw().method_5814(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);

        KeyBind.keyBind('key.sneak', false);
        KeyBind.key("key.mouse.right", true);
        KeyBind.keyBind('key.forward', true);

        while (currentX > startingX - farmLength) {

            currentX = player.getX();
            player.lookAt(90, 75);
            Client.waitTick(1); 
            startingZ = player.getZ();
        }


        while (currentZ > startingZ - 0.8) {
            currentZ = player.getZ();
            if (currentZ <= trueStartingZ - (farmWidth - 1)) {
                endScript();
                return;
            }

            KeyBind.key("key.mouse.right", false);
            Client.waitTick(1);
            KeyBind.keyBind('key.sneak', true);
            player.lookAt(180, 0);
            KeyBind.keyBind('key.forward', true);
            Client.waitTick(1);
            KeyBind.keyBind('key.forward', false);
            currentX = player.getX();
            startingX = player.getX();
        }
        player.getRaw().method_5814(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);
    }
}



function endScript() {
    Chat.log("§aFinished Farming");
    KeyBind.keyBind('key.sneak', false);
    KeyBind.key("key.mouse.right", false);
    KeyBind.keyBind('key.forward', false);
    farming = false;

    for (i = 0; i < 3; i++) {
        World.playSound("block.note_block.pling", 1, 2);
        Client.waitTick(4);
    }
    return;
}

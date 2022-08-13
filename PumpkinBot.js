const farmLength = 81; // Num of pumpkins
const farmWidth = 80; // Total width (incl. water and stems)

const toolDamage = 200;
// No touchy ------------------------------------------
const player = Player.getPlayer();
const inv = Player.openInventory();
const trueStartX = player.getX();
const startY = player.getY();
let startX = player.getX();
let startZ = player.getZ();

// Look at the first pumpkin
player.lookAt(-180, 40);

// Centre the player
player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);

// Grab the mouse
function grabMouse() {
    // Client Class
    let minecraftClass = Reflection.getClass("net.minecraft.client.Minecraft");

    // Mouse Handler Field
    let mouseHandlerField = Reflection.getDeclaredField(minecraftClass, "f_91067_");
    mouseHandlerField.setAccessible(true);

    //Use reflection to grab mouse:
    let clientInstance = Client.getMinecraft();

    // Mouse Handler
    let mouseHandlerObj = mouseHandlerField.get(clientInstance);

    // Mouse Handelr Class
    let mouseClass = Reflection.getClass("net.minecraft.client.MouseHandler");

    // Lock Mouse / grab Mouse Boolean Field
    let lockMouse = Reflection.getDeclaredField(mouseClass, "f_91520_");
    lockMouse.setAccessible(true);

    // Grab mouse
    lockMouse.setBoolean(mouseHandlerObj, true);
}

Chat.log("§a Started Farming!");
World.playSound("block.note_block.pling", 1, 2);

while (player.getX() > trueStartX - farmWidth && player.getY() == startY) {
    KeyBind.keyBind('key.sneak', true);
    KeyBind.keyBind('key.forward', true);
    KeyBind.keyBind('key.attack', true);
    Chat.log("Going north");
    // Break row going NORTH
    while (player.getZ() > startZ - farmLength - 1 && player.getY() == startY) {
        player.lookAt(-180, 40);
        Client.waitTick(1);
    }

    KeyBind.keyBind('key.forward', false);
    KeyBind.keyBind('key.attack', false);
    KeyBind.keyBind('key.sneak', false);

    // Put pumpkins in chest
    Client.waitTick(20);
    player.lookAt(-180, 40);
    player.interact();
    JsMacros.waitForEvent('OpenScreen');
    Client.waitTick(20);
    let inv2 = Player.openInventory();
    try {
        for (i = 27; i < 62; i++) {
            if (inv2.getSlot(i).getName().getString() == "Pumpkin") {
                inv2.quick(i);
                Client.waitTick(1);
            }
        }
    } catch {
        Chat.log("No chest found, moving on");
    }
    Client.waitTick(5);
    inv2.closeAndDrop();
    Client.waitTick(5);
    grabMouse();

    Chat.log("Going west");
    // Shift over one row going WEST
    KeyBind.keyBind('key.sneak', true);
    startX = player.getX();
    while (player.getX() > startX - 3 && player.getY() == startY) {
        player.lookAt(90, 0);
        Client.waitTick(1);
        KeyBind.keyBind('key.forward', true);
    }

    KeyBind.keyBind('key.forward', false);

    // Centre the player
    player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);
    Chat.log("Going south");
    // Break row going SOUTH
    KeyBind.keyBind('key.attack', true);
    Client.waitTick(20);
    KeyBind.keyBind('key.attack', false);
    KeyBind.keyBind('key.attack', true);
    KeyBind.keyBind('key.forward', true);
    while (player.getZ() < startZ && player.getY() == startY) {
        player.lookAt(0, 40);
        Client.waitTick(1);
    }
    Chat.log("Going west 2");

    KeyBind.keyBind('key.forward', false);
    KeyBind.keyBind('key.attack', false);

    // Shift over one row going WEST
    startX = player.getX();
    while (player.getX() > startX - 2 && player.getY() == startY) {
        player.lookAt(90, 0);
        Client.waitTick(1);
        KeyBind.keyBind('key.forward', true);
    }

    KeyBind.keyBind('key.forward', false);

    // Centre the player
    player.getRaw().m_6034_(Math.floor(player.getX()) + 0.5, player.getY(), Math.floor(player.getZ()) + 0.5);
}
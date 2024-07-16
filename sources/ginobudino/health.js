import { system, world, Player, EntityHealthComponent } from "@minecraft/server";
const overworld = world.getDimension("overworld");

function checkPlayerHealth(player) {
  let health = parseInt(player.getComponent("health").currentValue)
  let healthmax = parseInt(player.getComponent("health").effectiveMax)
  let all_player_names = world.getAllPlayers().map(p => p.name).join(' ');
  overworld.runCommandAsync(`say "${player.name}" 的生命值为: ${health} 最大生命值${healthmax} allPlayers: ${all_player_names}`);
}
const playerHealthMap = new Map();

function updatePlayerHealth(player) {
  const health = parseInt(player.getComponent("health").currentValue);
  const healthmax = parseInt(player.getComponent("health").effectiveMax);
  const lastHealth = playerHealthMap.get(player.name);
  const lastHealthmax = playerHealthMap.get(player.name);
  if (lastHealth === undefined || lastHealth !== health) {
    overworld.runCommand(`execute as @e[type=player,name="${player.name}"] run scoreboard players set "${player.name}" health ${health}`);
    playerHealthMap.set(player.name, health);
  }
  if (lastHealthmax === undefined || lastHealthmax !== healthmax) {
    overworld.runCommand(`execute as @e[type=player,name="${player.name}"] run scoreboard players set "${player.name}" healthmax ${healthmax}`);
    playerHealthMap.set(player.name, healthmax);
  }
}
const updateInterval = 5; 
let lastUpdateTick = 0;
system.runInterval(() => {
  const currentTick = system.currentTick;
  if (currentTick - lastUpdateTick >= updateInterval) {
    lastUpdateTick = currentTick;

    const dimensions = ['overworld', 'nether', 'the_end'].map(name => world.getDimension(name));

    dimensions.forEach(dimension => {
        dimension.getPlayers().forEach(updatePlayerHealth);
  });
  }
  if (currentTick % 2400 === 0) {
    playerHealthMap.forEach((_, playerName) => {
      overworld.runCommand(`execute as @e[type=player,name="${playerName}"] unless entity @s run scoreboard players reset "${playerName}" health`);
      overworld.runCommand(`execute as @e[type=player,name="${playerName}"] unless entity @s run scoreboard players reset "${playerName}" healthmax`);
    });
    playerHealthMap.clear();
  }
});
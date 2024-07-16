/*
* dave.myQuestAPI.{..}
* getItemHand
* getItems
* getFormTitle
* getFromDesc
* getFromButton
*/

import {
    system,
    world
} from "@minecraft/server";
import {
    ActionFormData,
    ModalFormData
} from '@minecraft/server-ui'

// Used to import variables from config.js
import * as dave from './config3.js';

const {
  system: { enable: systemEnable, tag: systemTag, inactive: systemInactive },
  getIdentifier: { author: getAuthor, title: getTitle, description: getDescription },
  getQuest: { itemHand: getItemHand, items: getItems,reward1s: getReward1s, rewards: getRewards },
  getForm: {
    title: { enable: getTitleEnable, title: getTitleTitle },
    description: { description: getDescriptionDescription, complated: getDescriptionComplated, notComplated: getDescriptionNotComplated },
    icon: { enable: getIconEnable, confirm: getIconConfirm, items: getIconItems },
    button: { back: getButtonBack, check: getButtonCheck, about: getButtonAbout }
  }
} = dave.myQuestAPI;



const formMain3 = (player) => {
  const form = new ActionFormData().title(getTitle);
  const hastagrenwu = player.hasTag("hastagrenwu");

/*const renwu0 = world.scoreboard.getObjective('renwu0');
  const renwu1 = world.scoreboard.getObjective('renwu1');
  const renwu2 = world.scoreboard.getObjective('renwu2');
  const renwu3 = world.scoreboard.getObjective('renwu3');
  const renwu4 = world.scoreboard.getObjective('renwu4'); */
  let randomquest = [1,2,3,4,5];
  let renwu = [1,2,3,4,5];
  for (let i = 0; i < 5; i++) {
    renwu[i] = world.scoreboard.getObjective(`renwu${i}`);
  }
  const LIST = [];
  let COUNT = 0;
  if (!hastagrenwu) {
    for (let i = 0; i < 5; i++) {
      randomquest[i] = random(1, 40);
      renwu[i].setScore(player, randomquest[i])
    }
    player.addTag("hastagrenwu");
  }
  form.body(`任务每三小时会增加一次刷新次数。你的刷新次数：`)
  form.button('§c刷新任务',"textures/ui/t3")
  for (let i=0;i<5;i++) {
    let durenwu = [1,2,3,4,5];
    for (let i=0; i<5; i++) {
      durenwu[i] = world.scoreboard.getObjective(`renwu${i}`).getScore(player);
    }
    const title = getTitleTitle[durenwu[i]];
    const icon =`textures/${getIconItems[durenwu[i]]}`;
    const button = title;
    form.button(button, icon);
    LIST.push(COUNT);
    COUNT++;
  }
 
  form.show(player).then(response => {
    if (response.selection === 0) {
      formAbout(player);
    }
    if (response.selection) {
      formSelection(player, response.selection);
    }
  });
};

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

const formSelection = (player, string) => {
  const getItemName = getItems[string - 1].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  const getRewardName = getRewards[string - 1][0].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  const getIsComplate = player.hasTag(getItems[string - 1]);
  const form2 = new ActionFormData().title(getTitle);

  if (getIsComplate) {
    form2.body(`${getDescriptionDescription[durenwu[string - 1]]}\n\n§c提交奖励任务需要消耗物品\n§e进度: §a已完成`);
  } else {
    form2.body(`${getDescriptionDescription[(durenwu[string - 1])]}\n\n§a提交奖励任务需要消耗物品\n§e进度: §c未完成`);
  }

  form2.button(getButtonCheck).button(getButtonBack);
  form2.show(player).then(response2 => {
    if (!response2.isCanceled) {
      if (player.hasTag(`renwu${string}`)) {
        player.sendMessage('§c提交失败：请勿重复提交');
      }
          for (let i = 0; i < 36; i++) {
            const inventoryItem = player.getComponent("inventory").container.getItem(i);
            if (inventoryItem && inventoryItem.typeId === getItems[string - 1] && inventoryItem.amount >= getReward1s[string - 1]) {
              player.runCommandAsync(`give @s ${getRewards[string - 1][0]} ${getRewards[string - 1][1]}`);
              player.runCommandAsync(`playsound x.wancheng @s ~ ~ ~ 0.5`);
              player.sendMessage('§a任务提交成功！');
              player.addTag(`renwu${string}`);
              break;
            }
            if (i >= 35) {
              player.sendMessage('§c提交失败：目标物品数量不足');
              break;
            }
          }
      
    }
  });
};

const formAbout = (player) => {
  player.runCommandAsync(`tag @s remove hastagrenwu`);
  player.removeTag(`renwu0`);
  player.removeTag(`renwu1`);
  player.removeTag(`renwu2`);
  player.removeTag(`renwu3`);
  player.removeTag(`renwu4`);
  player.removeTag(`renwu5`);
  formMain3(player);
};
export {
  formMain3
};


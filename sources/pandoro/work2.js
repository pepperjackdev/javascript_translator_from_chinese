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
import * as dave from './config2.js';

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

world.beforeEvents.itemUse.subscribe((eventData) => {
  const { itemStack: item, source: player } = eventData;

  if (item.typeId === getItemHand) {
    if (systemEnable || player.hasTag(systemTag)) {
      system.run(() => {
        formMain1(player);
      });
    } else {
      const runCmd = player.runCommandAsync;
      runCmd(`tellraw @s {"rawtext":[{"text":"${systemInactive}\n\n "}]}`);
      runCmd(`tellraw @s {"rawtext":[{"text":"===== ${getTitle} =====\n§e已得到myQuestAPI使用许可: §r${systemEnable}\n§e版本: 1.0.0§r${systemVersion}\n§e模组作者:皓星辰 §r@${getAuthor}\n§e源代码参考自: §r@abcdave"}]}`);
    }
  }
});

const formMain1 = (player) => {
  const form = new ActionFormData().title(getTitle).button(getButtonAbout);
  const LIST = [];
  let COUNT = 0;
  
  for (const thisItems of getItems) {
    const getTitleAuto = thisItems.split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    const hasTag = player.hasTag(thisItems);
    

    const title = getTitleEnable ? getTitleAuto : getTitleTitle[COUNT];
    const icon = getIconEnable ? (hasTag ? getIconConfirm : `textures/${getIconItems[COUNT]}`) : undefined;
    const button = hasTag ? title + "\n §2任务完成！" :  title + "\n §8未完成";
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

const formSelection = (player, string) => {
  const getItemName = getItems[string - 1].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  const getRewardName = getRewards[string - 1][0].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  const getIsComplate = player.hasTag(getItems[string - 1]);
  const form2 = new ActionFormData().title(getTitle);

  if (getIsComplate) {
    form2.body(`${getDescriptionDescription[string - 1]}\n\n§a当你物品栏中拥有目标物品时，可提交任务\n§e提交任务不消耗物品\n§e进度: §a已完成`);
  } else {
    form2.body(`${getDescriptionDescription[string - 1]}\n\n§a当你物品栏中拥有目标物品时，可提交任务\n§e提交任务不消耗物品\n§e进度: §c未完成`);
  }

  form2.button(getButtonCheck).button(getButtonBack);
  form2.show(player).then(response2 => {
    if (!response2.isCanceled) {
      if (response2.selection === 0 && player.hasTag(getItems[string - 1])) {
        player.sendMessage('§c提交失败：请勿重复提交');
      }
      if ((response2.selection === 0 && getItems[string - 1]=="minecraft:iron_ingot")||(response2.selection === 0 && player.hasTag(getItems[string - 2]))) {
        if (response2.selection === 0 && !player.hasTag(getItems[string - 1])) {
          for (let i = 0; i < 36; i++) {
            const inventoryItem = player.getComponent("inventory").container.getItem(i);
            if (inventoryItem && inventoryItem.typeId === getItems[string - 1] && inventoryItem.amount >= getReward1s[string - 1]) {
              player.runCommandAsync(`give @s ${getRewards[string - 1][0]} ${getRewards[string - 1][1]}`);
              player.runCommandAsync(`playsound x.wancheng @s ~ ~ ~ 0.5`);
              player.sendMessage('§a任务提交成功！');
              player.runCommandAsync(`say 取得了成就 §d${getTitleTitle[string - 1]}`);
              player.addTag(getItems[string - 1]);
              break;
            }
            if (i >= 35) {
              player.sendMessage('§c提交失败：目标物品数量不足');
              break;
            }
          }
        }
      }
      else {
        if (response2.selection === 1) {
          formMain1(player);
        }
        if (response2.selection === 0) {
          player.sendMessage('§c提交失败：任务未解锁，需要完成前一个任务');
        }
      }

    }
  });
};

const formAbout = (player) => {
  const form = new ActionFormData().title(getTitle).body(`探索广袤的《星辰幻想2》的世界，追寻远古时期天朝战争的秘密！主线任务必须依次进行。\n§a任务书魔改自开源项目:myQuestAPI\n§c饰品系统魔改自开源项目:Pocket Baubles API\n§e模组作者: §rMinecraft皓星辰\n§d致谢名单：\n§b感谢暗帝Hehsosb，刘叔，HQ5715，Fireflies，FlyTax470301353，Xqh0316，daijia9542,domay1897的赞助\n感谢rice_awa提供的代码思路`).button(getButtonBack);

  form.show(player).then(response => {
    if (response.selection === 0) {
      formMain1(player);
    }
  });
};
export {
  formMain1
};


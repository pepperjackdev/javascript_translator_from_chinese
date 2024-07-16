const myQuestAPI = {
    system: {
        inactive: "myQuestAPI is inactive", // will be displayed if MyQuestAPI is not active
        enable: true, // Set to true to enable and false to disable
		tag: "op" // tag who can see quests when system[enable = false] || /tag @s add op
    },
    getIdentifier: {
        author: "§dMinecraft皓星辰", // Author Name
        title: "§l§a生存指南（支线任务）", // Title
        description: "§l§a这本书负责addon中的收集类任务！" // Description
    },
    getQuest: {
    	isNamespace: { 
			isDefault: false,  // Useless  for now. If true, will use default namespace
    							 	 // so you don't need to write namespace anymore
			namespace: "" // Only work if "isDefault: true"
		},
        itemHand: "x:renwubook",
        items: [
            "x:tongqian",
			"x:yinqian",
			"x:jinqian",
			"x:yu1",
			"x:yu10",
			"x:yu11",
			"x:yu12",
			"x:xingchenyu",
			"x:yaoshi5",
			"x:baoxiangh2",
			"x:kabaijiangbei1",
			"x:kabaijiangbei2",
			"x:kabaijiangbei3",
			"x:kabaijiangbei4",
			"x:kabaijiangbei5",
		
        ],
		reward1s: [
			10,
			10,
			10,
			10,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,

		
		],
        rewards: [
        	["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
			["x:jinbi", 1],
   
		]
    },
    getForm: {
    	title: {
    		enable: false, // Change to false to generate title automatically
    		title: [
    			// you don't need to fill this field if title[enable = true]
				"§a【第一桶金】",
				"§e【财源滚滚】",
				"§d【商业大亨】",
				"§a【悠然垂钓】",
				"§b【斑斓水母】",
				"§d【桃园三结义】",
				"§c【水火狐狸】",
				"§6【哇，金色传说！】",
				"§a【华丽的钥匙】",
				"§e【深海中的宝匣】",
				"§a【入门级卡牌收藏家】",
				"§b【精通级卡牌收藏家】",
				"§d【大师级卡牌收藏家】",
				"§6【传说级卡牌收藏家】",
				"§c【神话级卡牌收藏家】",

		
    		]
    	},
    	description: {
    		description: [
    			"§a收集10个铜币\n§6（完成条件：铜币*10 奖励星辰币*1）",
				"§a收集10个银币\n§6（完成条件：银币*10 奖励星辰币*1）",
				"§a收集10个金币\n§6（完成条件：金币*10 奖励星辰币*1）",
				"§a钓到10条鲈鱼\n§6（完成条件：鲈鱼*10 奖励星辰币*1）",
				"§a钓到1条海月水母\n§6（完成条件：海月水母*1 奖励星辰币*1）",
				"§a钓到1条海刘关张鱼\n§6（完成条件：刘关张鱼*1 奖励星辰币*1）",
				"§a钓到1条火狐狸\n§6（完成条件：火狐狸*1 奖励星辰币*1）",
				"§a钓到1条星辰鱼\n§6（完成条件：星辰鱼*1 奖励星辰币*1）",
				"§a钓到1个海洋宝匣钥匙\n§6（完成条件：海洋宝匣钥匙*1 奖励星辰币*1）",
				"§a钓到1个海洋宝匣\n§6（完成条件：海洋宝匣*1 奖励星辰币*1）",
				"§a集齐所有一星卡牌并合成纯金奖杯\n§6（完成条件：纯金奖杯：一星*1 奖励星辰币*1）",
				"§a集齐所有二星卡牌并合成纯金奖杯\n§6（完成条件：纯金奖杯：二星*1 奖励星辰币*1）",
				"§a集齐所有三星卡牌并合成纯金奖杯\n§6（完成条件：纯金奖杯：三星*1 奖励星辰币*1）",
				"§a集齐所有四星卡牌并合成纯金奖杯\n§6（完成条件：纯金奖杯：四星*1 奖励星辰币*1）",
				"§a集齐所有五星卡牌并合成纯金奖杯\n§6（完成条件：纯金奖杯：五星*1 奖励星辰币*1）",

    		
    		],
    		complated: "Complated",
    		notComplated: "In progress"
    	},
    	icon: {
    		enable: true, // Set to true to enable and false to disable
    		confirm: `textures/ui/confirm`,
    		items: [
    		
				"items/tongqian",
				"items/yinqian",
				"items/jinqian",
				"items/yu1",
				"items/yu10",
				"items/yu11",
				"items/yu12",
				"items/xingchenyu",
				"items/yaoshi5",
				"items/baoxiangh2",
				"items/kabaijiangbei",
				"items/kabaijiangbei",
				"items/kabaijiangbei",
				"items/kabaijiangbei",
				"items/kabaijiangbei",
			
				
			]
    	},
    	button: {
        	back: "§l§b返回上一页", // Button Back
        	check: "§l§c提交任务", // Button Check
			about: "§l§d简介&致谢"  // Button About
    	}
    }
}

export {myQuestAPI}

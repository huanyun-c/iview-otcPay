import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
	path: '/login',
	name: 'login',
	meta: {
		title: 'Login - 登录'
	},
	component: resolve => {
		require(['@/views/login.vue'], resolve);
	}
};

export const registerRouter = {
	path: '/register',
	name: 'register',
	meta: {
		title: 'register - 注册'
	},
	component: resolve => {
		require(['@/views/register.vue'], resolve);
	}
};

export const page404 = {
	path: '/*',
	name: 'error-404',
	meta: {
		title: '404-页面不存在'
	},
	component: resolve => {
		require(['@/views/error-page/404.vue'], resolve);
	}
};

export const page403 = {
	path: '/403',
	meta: {
		title: '403-权限不足'
	},
	name: 'error-403',
	component: resolve => {
		require(['@//views/error-page/403.vue'], resolve);
	}
};

export const page500 = {
	path: '/500',
	meta: {
		title: '500-服务端错误'
	},
	name: 'error-500',
	component: resolve => {
		require(['@/views/error-page/500.vue'], resolve);
	}
};


export const locking = {
	path: '/locking',
	name: 'locking',
	component: resolve => {
		require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve);
	}
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
	path: '/',
	name: 'otherRouter',
	redirect: '/home',
	component: Main,
	children: [{
			path: 'home',
			title: {
				i18n: 'home'
			},
			name: 'home_index',
			component: resolve => {
				require(['@/views/home/home.vue'], resolve);
			}
		},
		{
			path: 'ownspace',
			title: '个人中心',
			name: 'ownspace_index',
			component: resolve => {
				require(['@/views/own-space/own-space.vue'], resolve);
			}
		},
//		{
//			path: 'message',
//			title: '消息中心',
//			name: 'message_index',
//			component: resolve => {
//				require(['@/views/message/message.vue'], resolve);
//			}
//		}
	]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [

	{
		path: '/',
		icon: 'arrow-swap',
		name: 'tran_Management',
		title: '交易管理',
		access: 2,
		component: Main,
		children: [{
			path: 'tran_management',
			title: '交易管理',
			name: 'tran_Management_index',
			component: resolve => {
				require(['@/views/tran_Management/tran_Management.vue'], resolve);
			}
		}]
	},
	{
		path: '/',
		icon: 'social-yen',
		name: 'payWay',
		title: '收款方式',
		component: Main,
		access: 2,
		children: [{
			path: 'payWay',
			title: '收款方式',
			name: 'payWay_index',
			component: resolve => {
				require(['@/views/payWay/payWay.vue'], resolve);
			}
		}]
	},
	{
		path: '/',
		icon: 'ios-paper-outline',
		name: 'bill',
		title: '账单流水',
		component: Main,
		children: [{
			path: 'bill',
			title: '账单流水',
			name: 'bill_index',
			component: resolve => {
				require(['@/views/bill/bill.vue'], resolve);
			}
		}]
	},
	{
		path: '/',
		icon: 'ios-bookmarks',
		name: 'moneySite',
		title: '钱包地址',
		component: Main,
		children: [{
			path: 'moneySite',
			title: '钱包地址',
			name: 'moneySite_index',
			component: resolve => {
				require(['@/views/moneySite/moneySite.vue'], resolve);
			}
		}]
	},
	{
		path: '/',
		icon: 'shuffle',
		name: 'api',
		title: '商户接口',
		access: 1,
		component: Main,
		children: [{
			path: 'api',
			title: '商户接口',
			name: 'api_index',
			component: resolve => {
				require(['@/views/shuffle/shuffle.vue'], resolve);
			}
		}]
	},
	{
		path: '/',
		icon: 'ios-unlocked',
		name: 'apiAccess',
		title: '接口权限',
		access: 1,
		component: Main,
		children: [{
			path: 'apiAccess',
			title: '接口权限',
			name: 'apiAccess_index',
			component: resolve => {
				require(['@/views/apiAccess/apiAccess.vue'], resolve);
			}
		}]
	},
	{
		path: '/',
		icon: 'link',
		name: 'setUrl',
		title: '入金模拟',
		access: 1,
		component: Main,
		children: [{
			path: 'setUrl',
			title: '入金模拟',
			name: 'setUrl_index',
			component: resolve => {
				require(['@/views/setUrl/setUrl.vue'], resolve);
			}
		}]
	},
	{
		path: '/',
		icon: 'ios-reverse-camera',
		name: 'payShow',
		title: '支付演示',
		component: Main,
		children: [{
			path: 'payShow',
			title: '支付演示',
			name: 'payShow_index',
			component: resolve => {
				require(['@/views/payShow/payShow.vue'], resolve);
			}
		}]
	}
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
	loginRouter,
	registerRouter,
	otherRouter,
	locking,
	...appRouter,
	page500,
	page403,
	page404
];
<template>
    <div id="main" class="app-main">
    	<!--<Header></Header>-->
        <router-view v-if='isRouterAlive'></router-view>
    </div>
</template>

<script>
	
    export default {
    	components: {
    		
    	},
    	provide(){
    		return {
    			reload:this.reload
    		}
    	},
        data () {
            return {
                theme: this.$store.state.app.themeColor,
                isRouterAlive:true
            };
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {
			reload(){
				this.isRouterAlive = false;
				this.$nextTick(function(){
					this.isRouterAlive = true;
				})
			}
        }
    };
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
</style>

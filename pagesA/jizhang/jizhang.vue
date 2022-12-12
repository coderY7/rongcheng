<template>
	<view>
        <zxcheckbox @send="value" :list="checkboxData" ></zxcheckbox>
    </view>
</template>

<script>
    import zxcheckbox from './zxcheckbox/zxcheckbox.vue'
    export default {
        components: {
            zxcheckbox
        },
        onLoad() {

        },
        onShow() {
            
        },
		data() {
			return {
                checkboxData: [{
                        value: 0,
                        name: '海澜之家官网旗舰店',
                        img: '../../static/shop.png'
                    },
                    {
                        value: 1,
                        name: '鸿星尔克旗舰店',
                        img: '../../static/shop.png'
                    },
                    {
                        value: 2,
                        name: 'Apple store 旗舰店',
                        img: '../../static/shop.png'
                    },
                ],
			}
		},
		methods: {
            value(res) {
                console.log('内容：', res)
            },
            
		}
	}
</script>

<style>
    
</style>
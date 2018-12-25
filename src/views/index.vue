<template>
    <div class="wrapper">

    </div>
</template>

<script>
import { cellphone, refresh } from '../api/api.js'
export default {
name: "index",
methods: {
  login(){
		let params = {
			phone: 18011063206,
			password: 'mr.under1'
		}
	  cellphone(params).then(res => {
	  	if(res.status === 200){
			  console.log(res)
			  refresh().then(respon =>{
				  console.log(respon)
			  })
		  }
		})
	},
},
created(){
	this.login()
}
}
</script>

<style scoped lang="stylus">
.wrapper
	position: absolute
	top: 0
	right: 0
	bottom: 0
	left: 0
	background: gray
</style>

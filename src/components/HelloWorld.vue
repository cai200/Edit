<template>
  <div class="hello">
  <button @click="back_">后退</button>
   <button @click="go_">前进</button>
   <div contenteditable="true" id="edit" @input="startEdit($event)">

   </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    startEdit(e){
      caiEdit.addbackitems("edit")
    },
   back_(){
    caiEdit.backEdit("edit")
  },
    go_(){
    caiEdit.goEdit("edit")
    }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#edit{
  width:80%;
  height:200px;
  border:1px solid #ccc
}
</style>

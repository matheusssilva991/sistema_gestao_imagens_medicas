<template>
    <div class="input">
        <input class="input-control" :type=this.type :placeholder=this.name :name="this.name" 
            v-model="text" @input="changeFromChildren()"
        >
    </div>
</template>

<script>
export default {
    name: 'InputComp',
    props: {
        name: String,
        placeHolder: String,
        type: String,
        function: Function,
    },
    data() {
        return {
            text: ""
        }
    },
    methods: {
        changeFromChildren(){
            this.function(this.name, this.text)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.input-control {
    border: none;
    width: 100%;
    height: 35px;
    border-radius: 20px;
    background-color: #F2F2F2;
    padding-left: 10%;
    padding-right: 10%;
    -webkit-box-shadow: 0.5px 0.75px 1.5px 1px rgb(189, 181, 181); 
    box-shadow: 0.5px 0.75px 1.5px 1px rgb(189, 181, 181);
}

.input-control:focus{
    outline: none;
}

</style>

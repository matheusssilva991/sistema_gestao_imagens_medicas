<template>
    <div class="app">
        <header id="header">
            <h1 id="header-title">Imagens</h1>
            <div id="filtro">
                <InputComp class="filtro-item" name="pesquisar" type="pesquisar" placeHolder="Pesquisar"></InputComp>
                <InputComp class="filtro-item" name="filtro" type="filtro" placeHolder="Filtro" :function="changeValues"></InputComp>
            </div>
        </header>
        <section class="content">

        </section>
    </div>
</template>

<script>
import InputComp from '@/components/InputComp.vue';
export default {
    name: 'ImagesView',
    props: {
    },
    data () {
        return {
            pesquisar: "",
            filtro: ""
        }
    },
    methods: {
        changeValues(prop, text) {
            this[`${prop}`] = text
        },
    },
    components: {
        InputComp
    }
}

</script>

<style scoped>
.app{
    background-color: white;
    color: #459c63;
    margin: auto;
    width: 50%;
    border-radius: 20px;
}

#header {
    display: flex;
    justify-content: space-around;
    margin: auto;
    border: 1px solid black;
}

#header-title {
    width: 20%;
    border: 1px solid black;
}

#filtro {
    width: 40%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
}

.filtro-item {
    width: 100%;
    margin-bottom: 10px;
}

</style>

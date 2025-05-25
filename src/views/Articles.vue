<template>
    <div class="app-container">
        <div class="card">
            <div class="card-header pb-0 d-flex justify-content-between align-items-center">
                <h1>Articles</h1>
                <input v-model="search" type="text" class="form-control w-25" placeholder="Buscar..." />
            </div>
            <div class="card-body px-0 pt-0 pb-2 mt-4">
                <div class="p-3">
                    <vue-good-table :columns="fields" :rows="filteredArticles" :search-options="{ enabled: false }"
                        :pagination-options="{ enabled: true, perPage: 10 }">
                        <template v-slot:table-row="props">
                            <template v-if="props.column.field === 'foto'">
                                <div class="d-flex align-items-center">
                                    <img :src="props.row.foto" alt="Article Image" class="img-thumbnail me-2"
                                    height="50" width="50"
                                        />
                                </div>
                            </template>
                            <template v-else>
                                {{ props.formattedRow[props.column.field] }}
                            </template>
                        </template>
                    </vue-good-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axiosConn from "../api/axios";

export default {
    data() {
        return {
            articles: [],
            search: "",
            selectedStatus: "",
            fields: [
                { field: "id_article", label: "ID", sortable: true },
                { field: "foto", label: "Foto Article", sortable: true },
                { field: "nom_vendedor", label: "Venedor", sortable: true },
                { field: "nom", label: "Nom", sortable: true },
                { field: "descripcio", label: "Descripció", sortable: true },
                { field: "preu", label: "Preu", sortable: true },
                { field: "nom_categoria", label: "Categoria", sortable: true },
                { field: "estat", label: "Estat", sortable: true },
                { field: "data_publicacio", label: "Data Publicació", sortable: true },
            ],

        };
    },
    computed: {
        filteredArticles() {
            return this.articles.filter((article) => {
                const matchesSearch = Object.values(article).some((value) =>
                    String(value).toLowerCase().includes(this.search.toLowerCase())
                );
                const matchesStatus = this.selectedStatus ? article.Estat === this.selectedStatus : true;
                return matchesSearch && matchesStatus;
            });
        },
    },
    mounted() {
        this.getArticles();
    },
    methods: {
        async getArticles() {
            try {
                const response = await axiosConn.get("/getArticles");
                this.articles = response.data;
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
    },
};
</script>
<style>
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

img .img-thumbnail {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
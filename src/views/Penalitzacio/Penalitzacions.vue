<template>
    <div class="app-container">
        <div class="card">
            <div class="card-header pb-0 d-flex justify-content-between align-items-center">
                <h1>Penalitzacions</h1>
                <input v-model="search" type="text" class="form-control w-25" placeholder="Buscar..." />
            </div>
            <div class="card-body px-0 pt-0 pb-2 mt-4">
                <div class="p-3">
                    <vue-good-table :columns="columns" :rows="filteredBan" :search-options="{ enabled: false }"
                        :pagination-options="{ enabled: true, perPage: 5 }">
                        <template #table-row="props">
                            <!-- Ban pone si esta activo o baneado -->
                            <template v-if="props.column.field === 'ban'">
                                <span :class="props.row.ban ? 'text-danger' : 'text-success'">
                                    {{ props.row.ban ? 'Banejat' : 'Actiu' }}
                                </span>
                            </template>
                        </template>
                    </vue-good-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosConn from "../../api/axios";

export default {
    data() {
        return {
            ban: [],
            search: "",
            columns: [
                { label: "ID", field: "id_penalitzacio" },
                { label: "Usuari", field: "nom_usuari" },
                { label: "Data", field: "data_ban" },
                { label: "Raó", field: "rao" },
                { label: "Tipus", field: "tipus" },
                { label: "Data Fi", field: "data_fi" },
            ]

        };
    },
    computed: {
        filteredBan() {
            return this.ban.filter((b) =>
                Object.values(b).some((value) =>
                    String(value).toLowerCase().includes(this.search.toLowerCase())
                )
            );
        },
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                const response = await axiosConn.get("/getPenalitzacions");
                this.ban = response.data;
            } catch (error) {
                console.error("Error fetching ban:", error);
            }
        },
    },
};
</script>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>
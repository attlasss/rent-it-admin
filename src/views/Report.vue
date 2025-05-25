<template>
    <div class="app-container">
        <div class="card">
            <div class="card-header pb-0 d-flex justify-content-between align-items-center">
                <h1>Reports</h1>
                <input v-model="search" type="text" class="form-control w-25" placeholder="Buscar..." />
            </div>
            <div class="card-body px-0 pt-0 pb-2 mt-4">
                <div class="p-3">
                    <vue-good-table
                        :columns="columns"
                        :rows="filteredReports"
                        :search-options="{ enabled: false }"
                        :pagination-options="{ enabled: true, perPage: 5 }"
                        :html="true"
                    >
                        <template #table-row="props">
                            <!-- Ban pone si esta activo o baneado -->
                            <template v-if="props.column.field === 'ban'">
                                <span :class="props.row.ban ? 'text-danger' : 'text-success'">
                                    {{ props.row.ban ? 'Banejat' : 'Actiu' }}
                                </span>
                            </template>
                            <template v-if="props.column.field === 'actions' && props.row.ban !== 1">
                                <button class="btn btn-danger btn-sm mb-0" @click="addPenalitzacio(props.row.id_user_to)">
                                    Afegir Penalitzacio
                                </button>
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
            reports: [],
            search: "",
            columns: [
                { field: 'id_report', label: 'ID Report' },
                { field: 'user_from_username', label: 'Usuari Origen' },
                { field: 'user_to_username', label: 'Usuari Destí' },
                { field: 'motiu', label: 'Motiu' },
                { field: 'data', label: 'Data' },
                { field: 'ban', label: 'Estat User To' },
                { field: 'actions', label: 'Accions' }
            ]
        };
    },
    computed: {
        filteredReports() {
            return this.reports.filter((r) =>
                Object.values(r).some((value) =>
                    String(value).toLowerCase().includes(this.search.toLowerCase())
                )
            );
        },
    },
    mounted() {
        this.getReport();
    },
    methods: {
        async getReport() {
            try {
                const response = await axiosConn.get("/getReports");
                this.reports = response.data;
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        },
        addPenalitzacio(userId) {
            this.$router.push({ name: 'AddPenalitzacio', params: { id: userId } });
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

<template>
    <div class="q-pa-md">
        <q-table
            class="my-sticky-header-column-table"
            title="Personal Data"
            :rows="rows"
            :columns="columns"
            row-key="id"
        >
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn icon="mode_edit" @click="openEditDialog(props.row)"></q-btn>
                    <q-btn icon="delete" @click="openDeleteDialog(props.row)"></q-btn>
                </q-td>
            </template>
        </q-table>

        <q-dialog v-model="dialog.editDialog">
            <q-card>
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Edit Personal Data</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                    <q-input v-model="form.nim" type="text" label="NIM" readonly/>
                    <q-input v-model="form.fullname" type="text" label="Nama Lengkap" />
                    <q-input filled v-model="form.birthdate" mask="date" :rules="['date']" label="Tanggal Lahir">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form.birthdate">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="OK" color="primary" flat />
                                    </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                    <!-- <q-date v-model="form.birthdate" mask="YYYY-MM-DD" /> -->
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Edit" color="primary" @click="editDialogOnEdit(form)" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="dialog.deleteDialog">
            <q-card>
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Delete Personal Data</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                    Are you sure want to delete the following data?
                    <q-input v-model="form.nim" type="text" label="NIM" readonly/>
                    <q-input v-model="form.fullname" type="text" label="Nama Lengkap" readonly/>
                    
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Delete" color="primary" @click="deleteDialogOnDelete(form)" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
  
<script>
    import { date } from 'quasar'
    import axios from 'axios'
    import { ref } from 'vue';

    export default {
        methods: {
            fetchAllData() {
                axios.get(process.env.VUE_APP_API_URL)
                    .then((response) => {
                            if(response.data.error == false) {
                                this.rows = response.data.data
                            }
                        }
                    )
                    .catch((error) => {
                        if(error.response && error.response.data) {
                            this.$root.notify(error.response.data.message, error.response.data.error);
                        }
                    });
            },
            openEditDialog(row) {
                this.form.id = row.id;
                this.form.nim = row.nim;
                this.form.fullname = row.fullname;
                this.form.birthdate = row.birthdate;
                this.dialog.editDialog = true;
            },
            editDialogOnEdit(form) {
                var url = process.env.VUE_APP_API_URL + 'user/' + form.nim;
                axios.put(url, {
                        fullname: form.fullname,
                        birthdate: date.formatDate(form.birthdate, "YYYY-MM-DD")
                    })
                    .then((response) => {
                            if(response.data.error == false) {
                                this.$root.notify(response.data.message, response.data.error);
                                this.fetchAllData();
                            }
                        }
                    )
                    .catch((error) => {
                        if(error.response && error.response.data) {
                            this.$root.notify(error.response.data.message, error.response.data.error);
                        }
                    });
                this.dialog.editDialog = false;
            },
            openDeleteDialog(row) {
                this.form.id = row.id;
                this.form.nim = row.nim;
                this.form.fullname = row.fullname;
                this.form.birthdate = row.birthdate;
                this.dialog.deleteDialog = true;
            },
            deleteDialogOnDelete(form) {
                var url = process.env.VUE_APP_API_URL + 'user/' + form.nim;
                axios.delete(url)
                    .then((response) => {
                            if(response.data.error == false) {
                                this.$root.notify(response.data.message, response.data.error);
                                this.fetchAllData();
                            }
                        }
                    )
                    .catch((error) => {
                        if(error.response && error.response.data) {
                            this.$root.notify(error.response.data.message, error.response.data.error);
                        }
                    });
                this.dialog.deleteDialog = false;
            },
        },
        data() {
            return {
                dialog: {
                    editDialog: ref(false),
                    deleteDialog: ref(false)
                },
                form: {
                    id: null,
                    nim: null,
                    fullname: null,
                    birthdate: null
                },
                columns: [
                    {
                        name: 'id',
                        required: true,
                        label: 'ID',
                        align: 'left',
                        field: row => row.id,
                        format: val => `${val}`,
                        sortable: true
                    },
                    { name: 'nim', label: 'NIM', align: 'left', field: 'nim', sortable: true },
                    { name: 'fullname', align: 'left', label: 'Nama Lengkap', field: 'fullname' },
                    { name: 'birthdate', align: 'left', label: 'Tanggal Lahir', field: 'birthdate', format: val => date.formatDate(val, 'dddd, DD MMMM YYYY') },
                    { name: 'actions', align: 'center', label: 'Aksi' },
                ],
                rows: [
                ]
            }
        },
        mounted() {
            this.fetchAllData();
        },
        // setup () {
        //     return {
        //         editDialog: ref(false)
        //     }
        // }
    }
    
</script>
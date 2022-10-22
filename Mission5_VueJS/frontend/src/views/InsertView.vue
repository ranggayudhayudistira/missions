<template>
    <div class="q-pa-md">

        <q-card>
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Insert Personal Data</div>
                </q-card-section>

                <q-card-section>
                    <q-input v-model="form.nim" type="text" label="NIM" :rules="[val => !!val || 'NIM harus diisi!']"/>
                    <q-input v-model="form.fullname" type="text" label="Nama Lengkap" :rules="[val => !!val || 'Nama Lengkap harus diisi!']"/>
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
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Insert" color="primary" @click="formOnInsert(form)"/>
                </q-card-actions>
            </q-card>
    </div>
</template>
  
<script>
    import { date } from 'quasar'
    import axios from 'axios'
    // import { ref } from 'vue';

    export default {
        methods: {
            fetchAllData() {
                axios.get(process.env.VUE_APP_API_URL)
                    .then((response) => {
                            if(response.data.error == false) {
                                this.rows = response.data.data
                            }
                        }
                    );
            },
            formOnInsert(form) {
                var url = process.env.VUE_APP_API_URL + 'insert';
                axios.post(url, {
                        nim: form.nim,
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
            }
        },
        data() {
            return {
                form: {
                    id: null,
                    nim: null,
                    fullname: null,
                    birthdate: null
                }
            }
        }
    }
    
</script>
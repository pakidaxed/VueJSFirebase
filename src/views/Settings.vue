<template>
    <div class="settings">
        <h1>SETTINGS:</h1>
        <Notification :display="error" :type="type" :message="errorMessage" />
        <form @submit.prevent="changeName">
            <div class="field">
                <label class="label" id="label-name">Your name</label>
                <div class="control">
                    <input class="input" v-model="userName" type="text" :placeholder="user.name"/>
                </div>
            </div>
            <div class="control">
                <button class="button is-primary" @click="changeName">Change name</button>
            </div>
        </form>
    </div>
</template>

<script>
    import Notification from "../components/Notification";
    import firebase from 'firebase/app'
    import 'firebase/auth'
    import 'firebase/firestore'

    export default {
        name: "Settings",
        components: { Notification },
        data() {
            return {
                user: [],
                userName: "",
                type: "",
                error: false,
                errorMessage: ""
            }
        },
        methods: {
            changeName() {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .update({
                        age: 33,
                        name: this.userName
                    })

                .then(() => {
                    this.type = "is-primary"
                    this.error = true
                    this.errorMessage = "Jusu vardas sekmingai pakeistas i " + this.userName
                }, error => {
                    this.type = "is-danger"
                    this.error = true
                    this.errorMessage = "nu nepavyko"
                    console.log(error.message)
                })


            }

        },
        beforeMount() {
            firebase
                .firestore()
                .collection("users").doc(firebase.auth().currentUser.uid)
                .get()
                .then((doc) => this.user = doc.data())
        }
    }
</script>

<style scoped>

</style>
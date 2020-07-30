<template>
    <div class="settings">
        <h1>SETTINGS:</h1>
        <Notification v-on:closeNotification="error = false" v-if="error" :type="type" :message="errorMessage"/>
        <form @submit.prevent="changeName">
            <div class="field-body">
                <div class="field">
                    <label class="label" id="label-name">Your name</label>
                    <div class="control">
                        <input class="input" v-model="user.name" type="text" :placeholder="user.name"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label" id="age-name">Your age</label>
                    <div class="control">
                        <input class="input" v-model="user.age" type="number" :placeholder="user.age"/>
                    </div>
                </div>
            </div>

            <div class="control">
                <label class="radio">
                    <input type="radio" name="gender" v-model="user.gender" value="male">
                    Male
                </label>
                <label class="radio">
                    <input type="radio" name="gender" v-model="user.gender" value="female">
                    Female
                </label>
                <label class="radio">
                    <input type="radio" name="gender" v-model="user.gender" value="other">
                    Other
                </label>
            </div>
            <div class="control">
                <button class="button is-primary" :class="loading && 'is-loading'" @click="changeName">Change name</button>
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
        components: {Notification},
        data() {
            return {
                user: {},
                type: "",
                error: false,
                errorMessage: "",
                loading: false
            }
        },
        methods: {
            changeName() {
                this.loading = true
                firebase
                    .firestore()
                    .collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        age: this.user.age,
                        name: this.user.name,
                        gender: this.user.gender
                    })
                    .then(() => {
                        this.type = "is-primary"
                        this.error = true
                        this.errorMessage = `Jusu vardas sekmingai pakeistas i ${this.user.name}, amzius ${this.user.age}, lytis ${this.user.gender}.`
                        this.loading = false
                    }, error => {
                        this.type = "is-danger"
                        this.error = true
                        this.errorMessage = error.message
                        this.loading = false
                    })
            }
        },
        beforeMount() {
            firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then((doc) => doc.data() && (this.user = doc.data()),
                    (error) => {
                        this.error = true;
                        this.type = "is-danger";
                        this.errorMessage = error.message;
                    })

        }
    }
</script>

<style scoped>

</style>
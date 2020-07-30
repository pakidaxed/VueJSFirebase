<template>
    <div class="settings">
        <h1>SETTINGS:</h1>
        <Notification :display="error" :type="type" :message="errorMessage"/>
        <form @submit.prevent="changeName">
            <div class="field-body">
                <div class="field">
                    <label class="label" id="label-name">Your name</label>
                    <div class="control">
                        <input class="input" v-model="userName" type="text" :placeholder="user.name"/>
                    </div>
                </div>
                <div class="field">
                    <label class="label" id="age-name">Your age</label>
                    <div class="control">
                        <input class="input" v-model="userAge" type="number" :placeholder="user.age"/>
                    </div>
                </div>
            </div>

            <div class="control">
                <label class="radio">
                    <input type="radio" name="gender" v-model="userGender" value="Male">
                    Male
                </label>
                <label class="radio">
                    <input type="radio" name="gender" v-model="userGender" value="Female">
                    Female
                </label>
                <label class="radio">
                    <input type="radio" name="gender" v-model="userGender" value="Other">
                    Other
                </label>
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
        components: {Notification},
        data() {
            return {
                user: [],
                userName: "",
                userAge: "",
                userGender: "",
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
                        age: this.userAge,
                        name: this.userName,
                        gender: this.userGender
                    })

                    .then(() => {
                        this.type = "is-primary"
                        this.error = true
                        this.errorMessage = `Jusu vardas sekmingai pakeistas i ${this.userName}, amzius ${this.userAge}, lytis ${this.userGender}.`
                    }, error => {
                        this.type = "is-danger"
                        this.error = true
                        this.errorMessage = error.message
                    })


            }

        },
        beforeMount() {
            firebase
                .firestore()
                .collection("users").doc(firebase.auth().currentUser.uid)
                .get()
                .then((doc) => this.user = doc.data(),
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
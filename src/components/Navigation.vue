<template>
    <div class="navigation">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="../assets/logo.png" alt="Logotipas"/>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start" v-if="logedin">
                    <router-link v-for="link in links" :key="link.url" class="navbar-item" :to="link.url">
                        {{ link.name }}
                    </router-link>

                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons" v-if="!logedin">
                            <router-link v-for="link2 in links2" :key="link2.url" class="button is-primary"
                                         :to="link2.url">
                                <strong>{{ link2.name }}</strong>
                            </router-link>
                        </div>
                        <div class="user-details">
                        <button class="button is-danger" v-if="logedin" @click="logout">Logout ({{ username }})</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: "Navigation",
        data() {
            return {
                logedin: false,
                links: [
                    {name: 'Home', url: '/'},
                    {name: 'Workouts', url: '/workouts'},
                    {name: 'Settings', url: '/settings'},
                ],
                links2: [
                    {name: 'Register', url: '/register'},
                    {name: 'Login', url: '/login'},
                ],
                username: ""
            }
        },
        methods: {
            logout() {
                firebase
                    .auth().signOut()
                this.logedin = false
            }
        },
        beforeMount() {
            firebase
                .auth()
                .onAuthStateChanged((user) => {
                    if (user) {
                        this.logedin = true
                        this.username = firebase.auth().currentUser.email
                    }})
        }
    }
</script>

<style scoped>
    nav {
        border-bottom: 1px solid black;
    }

    nav img {
        min-height: 80px;
    }
    .navbar-start {
        padding-left: 40px;
    }
    .navbar-menu .navbar-start .navbar-item {
        font-size: 25px;
        font-weight: bold;
        transition: background-color 2s;
        padding: 0 60px;
    }
    .navbar-menu .navbar-start .navbar-item:hover {
        background-color: rgba(110, 191, 194, 0.3);
        color: #d25a46;

    }
</style>